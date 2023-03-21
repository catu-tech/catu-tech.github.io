import SerialParser, { BAUD_RATES } from "@/lib/SerialParser";
import { formatNumber } from "@/utlis";
import {
  CableTwoTone,
  CloseTwoTone,
  SaveTwoTone,
  SpeedTwoTone,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const SerialDumperRoutine = (): JSX.Element => {
  const [currentBaudRate, setCurrentBaudRate] = useState<number>(-1);
  const [executing, setExecuting] = useState<boolean>(false);

  const [active, setActive] = useState<boolean>(false);
  const [baudRate, setBaudRate] = useState<number>(BAUD_RATES[6]);
  const [reader, setReader] = useState<SerialParser | null>(null);
  const [values, setValues] = useState<Uint8Array>(new Uint8Array());
  const [textValues, setTextValues] = useState<Record<string, any>>({});
  const decoder = new TextDecoder();

  const { enqueueSnackbar } = useSnackbar();
  const ref = useRef<HTMLTextAreaElement>(null);

  async function executeRoutine() {
    setExecuting(true);
    const valuesMap: any = {};

    for (let n = 0; n < BAUD_RATES.length; n++) {
      await setValues(new Uint8Array());

      const baudRate = BAUD_RATES[n];

      await reader?.closePort();
      await reader?.selectPort(baudRate, true);
      if (reader) reader.data = [];

      const promised = new Promise((resolve) => {
        setTimeout(() => {
          valuesMap[baudRate] = reader?.data || [];

          resolve(null);
        }, 5000);
      });

      await promised;
    }

    console.log(valuesMap);
    const date = new Date().getTime();
    let zip = new JSZip();
    Object.keys(valuesMap).forEach((key) => {
      const data = JSON.stringify(valuesMap[key]);
      const file = `${date}-dump_-_baud-${key}.json`;
      zip.file(file, data);
    });

    await zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, `${date}-dump.zip`);
    });

    await reader?.closePort();
    setExecuting(false);
  }

  function connect() {
    reader?.selectPort(baudRate, true);
  }

  async function changeBaudRate() {
    await reader?.closePort();
    reader?.selectPort(baudRate, true);
  }

  function downloadSerialDump() {
    const linkElement = document.createElement("a");
    const fileContent = new Blob([values.join("")], { type: "text/plain" });
    linkElement.href = URL.createObjectURL(fileContent);
    linkElement.download = `serial-dump-${new Date().getTime()}.txt`;
    linkElement.click();
    URL.revokeObjectURL(linkElement.href);
  }

  useEffect(() => {
    if (reader) {
      reader.setCallback((values) => {
        const valueArray = new Uint8Array(values.length);
        valueArray.set(values);
        setValues(valueArray);
        setActive(true);
      });

      reader.setCloseCallback(() => {
        setActive(false);
      });
    }
  }, [reader]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [values]);

  useEffect(() => {
    if (typeof navigator === "undefined") {
      throw new Error(
        "Certifique-se de estar executando este projeto dentro de um navegador!"
      );
    }

    if (typeof navigator?.serial === "undefined") {
      enqueueSnackbar(
        "Este navegador não oferece suporte a `Navigator.Serial`.",
        {
          variant: "error",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        }
      );
    }

    setReader(
      new SerialParser(
        (values) => {
          const valueArray = new Uint8Array(values.length);
          valueArray.set(values);
          setValues(valueArray);
          setActive(true);
        },
        () => {
          setActive(false);
        }
      )
    );

    return () => {
      SerialParser.forceClose();
    };
  }, []);

  if (!reader) {
    return (
      <Paper>
        <LinearProgress />

        <Box sx={{ p: 2 }}>
          <Typography variant={"h4"} sx={{ fontFamily: "Monument Extended" }}>
            Serial Dumper
          </Typography>

          <Typography
            sx={{ fontSize: "1.25rem", my: 2 }}
            color={"warning.main"}>
            <code>SerialParser</code> não carregado.
          </Typography>

          <Typography>
            Verifique se o navegador suporta <code>Navigator.Serial</code> e se
            o dispositivo está conectado.
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper>
      <Box sx={{ p: 2 }}>
        <Typography variant={"h4"} sx={{ fontFamily: "Monument Extended" }}>
          Serial Dumper Routine
        </Typography>

        <Typography>
          Utiliza <code>Navigator.Serial</code> e uma lista predefinida de Baud
          Rates para ler dados de um dispositivo USB ou Serial (padrão RS232),
          gerando um dump de dados.
        </Typography>

        <Alert severity={"warning"}>
          <Typography>
            IMPORTANTE: aguarde alguns minutos para finalizar a leitura e
            efetuar o download do dump.
          </Typography>
        </Alert>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <LoadingButton
              startIcon={<SpeedTwoTone />}
              loading={executing}
              fullWidth
              color="secondary"
              variant="contained"
              onClick={executeRoutine}>
              Iniciar Rotina
            </LoadingButton>
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              label="Output"
              InputProps={{
                style: {
                  fontSize: "1rem",
                  fontFamily: "'JetBrains Mono', Iosevka",
                },
              }}
              fullWidth
              inputProps={{ ref: ref }}
              value={decoder.decode(values)}
              multiline
              rows={16}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default SerialDumperRoutine;
