import CatuTestInvoice from "@/components/pdf/tests/CatuTestInvoice";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { PDFViewer } from "@react-pdf/renderer";

const PdfPrintTest = (): JSX.Element => {
  return (
    <Paper>
      <Box sx={{ p: 2 }}>
        <Typography variant={"h4"} sx={{ fontFamily: "Monument Extended" }}>
          PDF Print Test
        </Typography>

        <Typography>Realize testes de geração de PDF.</Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <PDFViewer style={{ width: "100%", height: "900px" }}>
              <CatuTestInvoice />
            </PDFViewer>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default PdfPrintTest;
