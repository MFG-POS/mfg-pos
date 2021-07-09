import { Box, Flex, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import OrderKeyboard from 'components/molecules/Order/OrderKeyboard';
import OrderPayment, { ActiveInputType } from 'components/molecules/Order/OrderPayment';
import OrderButtonGroup from 'components/molecules/Order/OrderButtonGroup';
import { FaHandHoldingUsd, FaUndo } from 'react-icons/all';
import { OrderState } from 'model/order/order-state';
import { OrderStateProps } from 'views/Order/Order';

type OrderFinalizationProps = {
  sum: string;
  closeOrder: (total: number, cashValue: number, cardValue: number, withoutPayment: boolean) => void;
} & OrderStateProps;

const OrderFinalization = ({ sum, setOrderState, closeOrder }: OrderFinalizationProps) => {
  const initialValue = '0.00';

  const toast = useToast();
  const [cashValue, setCashValue] = useState<string>(initialValue);
  const [cardValue, setCardValue] = useState<string>(initialValue);
  const [withoutPayment, setWithoutPayment] = useState<boolean>(false);
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

  const onSubmit = (): void => {
    const total: number = parseFloat(sum);
    const cash: number = parseFloat(cashValue);
    const card: number = parseFloat(cardValue);
    const totalEntered: number = cash + card;
    if (!withoutPayment && totalEntered < total)
      toast({
        title: 'Wprowadzone wartości nie zgadzają się z kwotą rachunku',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    else closeOrder(total, cash, card, withoutPayment);
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
          withoutPayment={withoutPayment}
          setCashValue={setCashValue}
          setCardValue={setCardValue}
          setActiveInputType={setActiveInputType}
          setWithoutPayment={setWithoutPayment}
        />
        <OrderButtonGroup
          submitIcon={FaHandHoldingUsd}
          cancelIcon={FaUndo}
          submitText="ZAPŁAĆ"
          cancelText="WRÓĆ"
          onSubmitClick={onSubmit}
          onCancelClick={() => setOrderState(OrderState.TERMINAL)}
        />
      </Box>
    </Flex>
  );
};

export default OrderFinalization;
