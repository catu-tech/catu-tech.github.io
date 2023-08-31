import PdfBox from "../primitives/PdfBox";
import PdfGrid from "../primitives/PdfGrid";
import PdfText from "../primitives/PdfText";
import CatuPdfPage from "../templates/CatuPage";
import CatuPdf from "../templates/CatuPdf";
import CatuPdfHeaderWrapper from "../templates/CatuPdfHeaderWrapper";
import TestAvatars from "@/assets/data/TestAvatars.json";

interface CatuTestInvoiceProps {}

const CatuTestInvoice = ({}: CatuTestInvoiceProps) => {
  return (
    <CatuPdf>
      <CatuPdfPage pageSize={[540, 1200]} dpi={32}>
        <CatuPdfHeaderWrapper avatar={TestAvatars[0]} />

        <PdfText variant={"h1"}>Print Test Page</PdfText>
        <PdfText variant={"h2"}>Print Test Page</PdfText>
        <PdfText variant={"h3"}>Print Test Page</PdfText>
        <PdfText variant={"h4"}>Print Test Page</PdfText>
        <PdfText variant={"h5"}>Print Test Page</PdfText>
        <PdfText variant={"h6"}>Print Test Page</PdfText>
        <PdfText>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
          pariatur, soluta maxime accusantium odit quo possimus labore veniam in
          minima veritatis! A quidem odit, et aperiam ratione voluptatum? Est,
          et.
        </PdfText>
        <PdfText variant={"caption"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
          pariatur, soluta maxime accusantium odit quo possimus labore veniam in
          minima veritatis! A quidem odit, et aperiam ratione voluptatum? Est,
          et.
        </PdfText>

        <PdfGrid container>
          <PdfGrid size={4}>
            <PdfBox style={{ padding: "1mm", border: "1px solid #000" }}>
              <PdfText>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                pariatur, soluta maxime accusantium odit quo possimus labore
                veniam in minima veritatis! A quidem odit, et aperiam ratione
                voluptatum? Est, et.
              </PdfText>
            </PdfBox>
          </PdfGrid>
          <PdfGrid size={4}>
            <PdfBox style={{ padding: "1mm", border: "1px solid #000" }}>
              <PdfText>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                pariatur, soluta maxime accusantium odit quo possimus labore
                veniam in minima veritatis! A quidem odit, et aperiam ratione
                voluptatum? Est, et.
              </PdfText>
            </PdfBox>
          </PdfGrid>
          <PdfGrid size={4}>
            <PdfBox style={{ padding: "1mm", border: "1px solid #000" }}>
              <PdfText>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                pariatur, soluta maxime accusantium odit quo possimus labore
                veniam in minima veritatis! A quidem odit, et aperiam ratione
                voluptatum? Est, et.
              </PdfText>
            </PdfBox>
          </PdfGrid>
        </PdfGrid>
      </CatuPdfPage>
    </CatuPdf>
  );
};

export default CatuTestInvoice;
