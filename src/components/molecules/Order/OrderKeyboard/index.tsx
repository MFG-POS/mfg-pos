import { Grid } from '@chakra-ui/react';
import OrderKeyboardElement from 'components/atoms/OrderKeyboardElement';

type OrderKeyboardProps = {
  onKeyboardElementClick: (element: string) => void;
};

const OrderKeyboard = ({ onKeyboardElementClick }: OrderKeyboardProps) => {
  const topElements: string[] = ['50', '100'];
  const additionalElements: string[] = ['.', '0', 'X'];
  const elements: string[] = Array.from({ length: 9 }, (_, numericElement) => (numericElement + 1).toString()).concat(
    additionalElements,
  );

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" height="22%" mb="3%" gap="1">
        {topElements.map((element) => (
          <OrderKeyboardElement key={element} element={element} onClick={onKeyboardElementClick} />
        ))}
      </Grid>
      <Grid templateColumns="repeat(3, 1fr)" height="75%" gap="1">
        {elements.map((element) => (
          <OrderKeyboardElement key={element} element={element} onClick={onKeyboardElementClick} />
        ))}
      </Grid>
    </>
  );
};

export default OrderKeyboard;
