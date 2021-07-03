import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import OrderKeyboard from 'components/molecules/Order/OrderKeyboard';
import OrderPayment, { ActiveInputType } from 'components/molecules/Order/OrderPayment';
import OrderButtonGroup from 'components/molecules/Order/OrderButtonGroup';
import { FaBan, FaHandHoldingUsd } from 'react-icons/all';
import { OrderState } from 'model/order/order-state';
import { OrderStateProps } from 'views/Order/Order';

type OrderFinalizationProps = {
  sum: string;
} & OrderStateProps;

const OrderFinalization = ({ sum, setOrderState }: OrderFinalizationProps) => {
  const initialValue = '0.00';

  const [cashValue, setCashValue] = useState<string>(initialValue);
  const [cardValue, setCardValue] = useState<string>(initialValue);
  const [activeInputType, setActiveInputType] = useState<ActiveInputType | null>(null);

  const onKeyboardElementClick = (element: string): void => {
    if (activeInputType != null) {
      const setInputValue = activeInputType === 'card' ? setCardValue : setCashValue;
      const isNotBackspace = !isNaN(Number(element)) || element === '.';
      if (isNotBackspace)
        setInputValue((previousState) =>
          previousState === initialValue
            ? (Number(previousState) + Number(element)).toString()
            : previousState + element,
        );
      else setInputValue((previousState) => previousState.slice(0, -1));
    }
  };

  return (
    <Flex direction="row">
      <Box minW="40vh" borderColor="gray.100" borderRadius="12px" borderWidth="1px" p="4" m="2">
        <OrderKeyboard onKeyboardElementClick={onKeyboardElementClick} />
      </Box>
      <Box minW="70vh">
        <OrderPayment
          sum={sum}
          cashValue={cashValue}
          cardValue={cardValue}
          setCashValue={setCashValue}
          setCardValue={setCardValue}
          setActiveInputType={setActiveInputType}
        />
        <OrderButtonGroup
          submitIcon={FaHandHoldingUsd}
          cancelIcon={FaBan}
          submitText="ZAPŁAĆ"
          cancelText="ANULUJ"
          onCancelClick={() => setOrderState(OrderState.TERMINAL)}
        />
      </Box>
    </Flex>
  );
};

export default OrderFinalization;
