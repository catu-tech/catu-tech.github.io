import SerialParser, { BAUD_RATES } from "@/lib/SerialParser";
import { formatNumber } from "@/utlis";
import { SpeedTwoTone } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Grid,
  LinearProgress,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";

const SerialDumperRoutine = (): JSX.Element => {
  const [currentBaudRate, setCurrentBaudRate] = useState<number>(-1);
  const [executing, setExecuting] = useState<boolean>(false);

  const [active, setActive] = useState<boolean>(false);
  const [reader, setReader] = useState<SerialParser | null>(null);
  const [values, setValues] = useState<Uint8Array>(new Uint8Array());
  const [dataBitsConfig, setDataBitsConfig] = useState<number>(8);
  const [stopBitConfig, setStopBitConfig] = useState<number>(1);
  const [parityConfig, setParityConfig] = useState<ParityType>("none")
  const [baudRate, setBaudRate] = useState<number>(0);

  const decoder = new TextDecoder();

  const { enqueueSnackbar } = useSnackbar();
  const ref = useRef<HTMLTextAreaElement>(null);

  function handleDataBitsConfigChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const value = (e?.target?.value || "").trim();

    if (!value) {
      setDataBitsConfig(8)
      return
    }

    const parsedValue = Math.abs(parseInt(value))

    if (isNaN(parsedValue)) return

    setDataBitsConfig(parsedValue);
  }

  function handleStopBitChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const value = e?.target?.value

    if (![1, 2, "1", "2"].includes(value)) {
      console.error("Out of scope value for Stop Bits")
      return
    }

    const parsedValue = parseInt(value)

    setStopBitConfig(parsedValue)
  }

  function handleParityChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const value = e?.target?.value as ParityType;

    if (!value) {
      setParityConfig("none")
      return
    }

    setParityConfig(value)
  }

  async function executeRoutine() {
    setExecuting(true);
    const valuesMap: any = {};

    for (let n = 0; n < BAUD_RATES.length; n++) {
      await setValues(new Uint8Array());

      const baudRateToUse = baudRate ? baudRate : BAUD_RATES[n];
      setCurrentBaudRate(baudRateToUse);

      if (reader) reader.data = [];
      await reader?.closePort();
      await reader?.selectPort(baudRateToUse, dataBitsConfig, parityConfig, stopBitConfig, true);

      const promised = new Promise((resolve) => {
        setTimeout(() => {
          valuesMap[baudRateToUse] = reader?.data || [];

          resolve(null);
        }, 20000);
      });

      await promised;
    }

    const date = new Date().getTime();
    let zip = new JSZip();
    Object.keys(valuesMap).forEach((key) => {
      const data = JSON.stringify(valuesMap[key]);
      const file = `${date}-dump_-_baud-${key}.json`;
      zip.file(file, data);
    });

    await zip.generateAsync({ type: "blob" }).then((content: any) => {
      saveAs(content, `${date}-dump.zip`);
    });

    setCurrentBaudRate(-1);

    await reader?.closePort();
    setExecuting(false);
  }

  useEffect(() => {
    if (reader) {
      reader.setCallback((values: Array<any>) => {
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
            <Stack direction="column" spacing={1}>
              <Stack direction="row" spacing={1}>
                <TextField
                  disabled={executing}
                  fullWidth
                  label="Data Bits"
                  size="small"
                  variant="standard"
                  onFocus={(e) => e?.target?.select()}
                  onChange={handleDataBitsConfigChange}
                  value={dataBitsConfig}
                />

                <TextField
                  disabled={executing}
                  select
                  fullWidth
                  label="Paridade"
                  size="small"
                  variant="standard"
                  value={parityConfig}
                  onChange={handleParityChange}
                >
                  <MenuItem value="none">-</MenuItem>
                  <MenuItem value="even">Par</MenuItem>
                  <MenuItem value="odd">Ímpar</MenuItem>
                </TextField>

                <TextField
                  disabled={executing}
                  select
                  fullWidth
                  label="Stop Bits"
                  size="small"
                  variant="standard"
                  value={stopBitConfig}
                  onChange={handleStopBitChange}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                </TextField>
              </Stack>


            <TextField
              label={"Baud Rate (kbps)"}
              size="small"
              variant="standard"
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

              <LoadingButton
                startIcon={<SpeedTwoTone />}
                loading={executing}
                fullWidth
                color="secondary"
                variant="contained"
                onClick={executeRoutine}>
                Iniciar Rotina
              </LoadingButton>
            </Stack>

            {currentBaudRate > 0 && (
              <Typography variant="h6" sx={{ my: 2 }}>
                Realizando leitura de dados em
                <br />
                <Typography
                  color={"#edd400"}
                  variant="h6"
                  sx={{ display: "inline" }}>
                  {currentBaudRate}
                </Typography>{" "}
                baud rates (
                <Typography
                  color={"#edd400"}
                  variant="h6"
                  sx={{ display: "inline" }}>
                  {currentBaudRate / 1000}kbps
                </Typography>
                ).
              </Typography>
            )}
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
              disabled
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default SerialDumperRoutine;
