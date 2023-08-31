import { StyleSheet, View } from '@react-pdf/renderer';
import { ReactNode } from 'react';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    flex: 'auto'
  }
});

interface PdfGridProps {
  children?: ReactNode;
  container?: boolean;
  fixed?: boolean;
  style?: Record<string, any>;
  size?: number;
}

const PdfGrid = ({
  children = null,
  container = false,
  fixed = false,
  style = {},
  size = 0
}: PdfGridProps) => {
  const columnWidth = `${(size / 12) * 100}%`;

  return (
    <View
      style={Object.assign(
        {},
        container ? styles.container : styles.item,
        !container && size > 0
          ? {
              width: columnWidth,
              maxWidth: columnWidth
            }
          : {},
        style
      )}
      fixed={fixed}
    >
      {children}
    </View>
  );
};

export default PdfGrid;
