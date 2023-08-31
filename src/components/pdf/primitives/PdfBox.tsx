import ReactPDF, { View } from '@react-pdf/renderer';
import { ReactNode } from 'react';

interface PdfBoxProps {
  children?: ReactNode;
  style?: Record<string, any>;
}

const PdfBox = ({ children = null, style = {} }: PdfBoxProps) => {
  return <View style={Object.assign({}, style)}>{children}</View>;
};

export default PdfBox;
