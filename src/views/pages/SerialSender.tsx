import SerialParser, { BAUD_RATES, SerialParserMode } from "@/lib/SerialParser";
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

const SerialSender = (): JSX.Element => {
  const [active, setActive] = useState<boolean>(false);
  const [baudRate, setBaudRate] = useState<number>(BAUD_RATES[6]);
  const [sender, setSender] = useState<SerialParser | null>(null);
  const [payload, setPayload] = useState("");
  const [values, setValues] = useState<Uint8Array>(new Uint8Array());

  const { enqueueSnackbar } = useSnackbar();
  const ref = useRef<HTMLTextAreaElement>(null);

  function connect() {
    sender?.selectPort(baudRate, 8, "none");
  }

  async function changeBaudRate() {
    await sender?.closePort();
    sender?.selectPort(baudRate, 8, "none");
  }

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

    setSender(
      new SerialParser(
        (values) => {
          const valueArray = new Uint8Array(values.length);
          valueArray.set(values);
          setValues(valueArray);
          setActive(true);
        },
        () => {
          setActive(false);
        },
        SerialParserMode.WRITE
      )
    );

    return () => {
      SerialParser.forceClose();
    };
  }, []);

  if (!sender) {
    return (
      <Paper>
        <LinearProgress />

        <Box sx={{ p: 2 }}>
          <Typography variant={"h4"} sx={{ fontFamily: "Monument Extended" }}>
            Serial Sender
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
          Serial Sender
        </Typography>

        <Typography>
          Utiliza <code>Navigator.Serial</code> para enviar dados para um
          dispositivo USB ou Serial (padrão RS232). Selecione um Baud Rate (em
          kbps) e clique em conectar para começar a receber os dados.
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <TextField
              sx={{ mb: 2 }}
              label={"Baud Rate"}
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
              disabled={!sender.active || sender.baud === baudRate}
              fullWidth
              color="secondary"
              variant="contained"
              onClick={changeBaudRate}>
              Trocar Baud Rate
            </Button>

            <Divider sx={{ my: 2 }} />

            <Button
              startIcon={<CableTwoTone />}
              disabled={sender.active}
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
              disabled={!sender.active}
              fullWidth
              color="error"
              variant="contained"
              onClick={() => {
                sender.closePort();
              }}>
              Desconectar
            </Button>

            <Divider sx={{ my: 2 }} />

            <Button
              startIcon={<SaveTwoTone />}
              fullWidth
              color="success"
              variant="contained"
              onClick={() => {
                sender.sendPortData(payload);
              }}>
              Enviar
            </Button>
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              label="Dados para Envio"
              InputProps={{
                style: {
                  fontSize: "1rem",
                  fontFamily: "'JetBrains Mono', Iosevka",
                },
              }}
              fullWidth
              inputProps={{ ref: ref }}
              value={payload}
              onChange={(event) => {
                setPayload(event.target.value);
              }}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  sender.sendPortData(payload).then(() => {
                    setPayload("");
                  });
                }
              }}
              multiline
              rows={16}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default SerialSender;
