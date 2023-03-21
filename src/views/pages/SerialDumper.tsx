import SerialParser, { BAUD_RATES } from "@/lib/SerialParser";
import { formatNumber } from "@/utlis";
import {
  CableTwoTone,
  CloseTwoTone,
  SaveTwoTone,
  SpeedTwoTone,
} from "@mui/icons-material";
import {
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

const SerialDumper = (): JSX.Element => {
  const [active, setActive] = useState<boolean>(false);
  const [baudRate, setBaudRate] = useState<number>(BAUD_RATES[6]);
  const [reader, setReader] = useState<SerialParser | null>(null);
  const [values, setValues] = useState<Uint8Array>(new Uint8Array());
  const decoder = new TextDecoder();

  const { enqueueSnackbar } = useSnackbar();
  const ref = useRef<HTMLTextAreaElement>(null);

  function connect() {
    reader?.selectPort(baudRate);
  }

  async function changeBaudRate() {
    await reader?.closePort();
    reader?.selectPort(baudRate);
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
          Serial Dumper
        </Typography>

        <Typography>
          Utiliza <code>Navigator.Serial</code> para ler dados de um dispositivo
          USB ou Serial (padrão RS232). Selecione um Baud Rate (em kbps) e
          clique em conectar para começar a receber os dados.
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <TextField
              sx={{ mb: 2 }}
              label={"Baud Rate (kbps)"}
              fullWidth
              select
              value={baudRate}
              onChange={(event) => {
                setBaudRate(event.target.value as any);
              }}>
              {BAUD_RATES.map((rate) => (
                <MenuItem key={rate} value={rate}>
                  {formatNumber(rate)} ({formatNumber(rate / 1000)} kbps)
                </MenuItem>
              ))}
            </TextField>

            <Button
              startIcon={<SpeedTwoTone />}
              disabled={!reader.active || reader.baud === baudRate}
              fullWidth
              color="secondary"
              variant="contained"
              onClick={changeBaudRate}>
              Trocar Baud Rate
            </Button>

            <Divider sx={{ my: 2 }} />

            <Button
              startIcon={<CableTwoTone />}
              disabled={reader.active}
              fullWidth
              color="primary"
              variant="contained"
              onClick={() => {
                connect();
              }}
              sx={{ mb: 2 }}>
              Conectar
            </Button>

            <Button
              startIcon={<CloseTwoTone />}
              disabled={!reader.active}
              fullWidth
              color="error"
              variant="contained"
              onClick={() => {
                reader.closePort();
              }}>
              Desconectar
            </Button>

            <Divider sx={{ my: 2 }} />

            <Button
              disabled={!values.length}
              startIcon={<SaveTwoTone />}
              fullWidth
              color="success"
              variant="contained"
              onClick={() => {
                downloadSerialDump();
              }}>
              Salvar Dados
            </Button>
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

export default SerialDumper;
