import { ReactNode } from "react";
import { Image } from "@react-pdf/renderer";
import PdfGrid from "@/components/pdf/primitives/PdfGrid";

export interface CatuPdfHeaderWrapperProps {
  avatar?: string | null | undefined;
  afterContent?: ReactNode | (() => ReactNode);
  barCode?: string | null | undefined;
  beforeContent?: ReactNode | (() => ReactNode);
  children?: ReactNode;
  fixed?: boolean;
  qrCode?: string | null | undefined;
}

const CatuPdfHeaderWrapper = ({
  avatar = null,
  afterContent = null,
  barCode = null,
  beforeContent = null,
  children = null,
  fixed = false,
  qrCode = null,
}: CatuPdfHeaderWrapperProps) => {
  return (
    <PdfGrid
      container
      fixed={fixed}
      style={{ border: "1px solid #000000", marginBottom: "2mm" }}>
      {avatar && (
        <PdfGrid
          size={0}
          style={{
            flex: 1,
            
            padding: "1mm",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Image
            src={avatar}
            style={{
              maxWidth: "40mm",
              width: "80mm",
              maxHeight: "80mm",
            }}
          />
        </PdfGrid>
      )}
      {beforeContent && (
        <PdfGrid size={0} style={{ flex: 2, borderLeft: "1px solid #000" }}>
          {beforeContent instanceof Function ? beforeContent() : beforeContent}
        </PdfGrid>
      )}
      {children && (
        <PdfGrid
          size={0}
          style={{
            flex: 6,
            borderLeft: "1px solid #000000",
            borderRight: "1px solid #000000",
          }}>
          {children}
        </PdfGrid>
      )}

      {afterContent && (
        <PdfGrid size={0} style={{ flex: 2, borderRight: "1px solid #000" }}>
          {afterContent instanceof Function ? afterContent() : afterContent}
        </PdfGrid>
      )}
      {barCode && (
        <PdfGrid
          size={2}
          style={{
            padding: "1mm",
            borderLeft: "1px solid #000",
            justifyContent: "flex-start",
            alignItems: "center",
            alignContent: "center",
          }}>
          <Image
            src={barCode}
            style={{
              maxWidth: "100%",
              width: "28mm",
              maxHeight: "14mm",
            }}
          />
        </PdfGrid>
      )}
      {qrCode && (
        <PdfGrid
          size={1}
          style={{ padding: "1mm", borderLeft: "1px solid #000" }}>
          <Image
            src={barCode as any}
            style={{
              maxWidth: "100%",
              width: "18mm",
              maxHeight: "18mm",
            }}
          />
        </PdfGrid>
      )}
    </PdfGrid>
  );
};

export default CatuPdfHeaderWrapper;
