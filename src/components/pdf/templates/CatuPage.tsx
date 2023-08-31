import { ReactNode } from 'react';
import { Page, StyleSheet } from '@react-pdf/renderer';
import { PageSize } from "@react-pdf/types";

const pageStyles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: '10mm'
  }
});

interface CatuPdfPageProps {
  children?: ReactNode;
  dpi?: number;
  pageSize?: PageSize | undefined;
}

const CatuPdfPage = ({ children = null, dpi = 300, pageSize = undefined }: CatuPdfPageProps) => {
  return (
    <Page size={pageSize} style={pageStyles.page} dpi={dpi}>
      {children}
    </Page>
  );
};

export default CatuPdfPage;
  