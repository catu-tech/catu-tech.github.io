import { Box, Grid, Paper, Typography } from "@mui/material";

const SerialDumper = (): JSX.Element => {
  return (
    <Paper>
      <Box sx={{ p: 2 }}>
        <Typography variant={"h4"} sx={{ fontFamily: "Monument Extended" }}>
          Map Viewer
        </Typography>

        <Typography>Visualizador de mapas de armazéns.</Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Typography>WIP</Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default SerialDumper;
