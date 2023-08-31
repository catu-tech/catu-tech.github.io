import { ReactNode } from 'react';
import { Document } from '@react-pdf/renderer';

interface CatuPdfProps {
  children?: ReactNode;
}

const CatuPdf = ({ children = null }: CatuPdfProps) => {
  return <Document>{children}</Document>;
};

export default CatuPdf;
