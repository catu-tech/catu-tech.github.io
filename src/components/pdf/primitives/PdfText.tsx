import { StyleSheet, Text } from '@react-pdf/renderer';
import { ReactNode } from 'react';

const styles = StyleSheet.create({
  h1: {
    fontSize: 17,
    fontWeight: 700
  },
  h2: {
    fontSize: 15,
    fontWeight: 700
  },
  h3: {
    fontSize: 13,
    fontWeight: 700
  },
  h4: {
    fontSize: 12,
    fontWeight: 700
  },
  h5: {
    fontSize: 11,
    fontWeight: 700
  },
  h6: {
    fontSize: 10,
    fontWeight: 700
  },
  p: {
    fontSize: 10
  },
  caption: {
    fontSize: 8,
    fontWeight: 800
  }
});

interface PdfTextProps {
  children?: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'caption';
  style?: Record<string, any>;
}

const PdfText = ({
  children = '',
  variant = 'p',
  style = {}
}: PdfTextProps) => {
  return (
    <Text
      style={Object.assign(
        {},
        variant && styles[variant] ? styles[variant] : styles.p,
        style
      )}
    >
      {children}
    </Text>
  );
};

export default PdfText;
