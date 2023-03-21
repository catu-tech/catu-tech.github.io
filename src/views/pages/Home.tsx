import { WarningTwoTone } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";

const Home = (): JSX.Element => {
  return (
    <Paper>
      <Box sx={{ p: 2 }}>
        <Typography variant={"h4"} sx={{ fontFamily: "Monument Extended" }}>
          Home
        </Typography>

        <Typography sx={{ fontSize: "1.25rem", my: 2 }}>
          Bem vindo ao Catu Tools, um conjunto de ferramentas web-based para
          auxiliar em tarefas cotidianas e, também, na leitura de dados de
          hardware ao visitar clientes.
        </Typography>

        <Typography>
          Utilize o menu ao lado para navegar e selecionar uma ferramenta.
        </Typography>

        <Paper elevation={2} sx={{ mt: 4 }}>
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <WarningTwoTone color={"warning"} />
              <Typography
                variant={"h6"}
                sx={{ fontFamily: "Monument Extended", ml: 2 }}
                color={(theme: any) => {
                  return theme.palette.warning[400];
                }}>
                IMPORTANTE
              </Typography>
            </Box>
            <Typography color="warning.main" sx={{ mt: 2 }}>
              Este projeto utiliza{" "}
              <code style={{ padding: "0 .25rem", background: "#444" }}>
                Navigator.Serial
              </code>{" "}
              para comunicação com dispositivos USB e Seriais. Certifique-se de
              utilizar um navegador e sistema operacional compatíveis.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Paper>
  );
};

export default Home;
