import { Dispatch, SetStateAction } from 'react';
import { Checkbox, Text, VStack } from '@chakra-ui/react';
import OrderPaymentGroup from 'components/atoms/OrderPaymentGroup';
import OrderNumberInput from 'components/atoms/OrderNumberInput';

export type ActiveInputType = 'cash' | 'card';

type OrderPaymentProps = {
  sum: string;
  cashValue: string;
  cardValue: string;
  withoutPayment: boolean;
  setCashValue: Dispatch<SetStateAction<string>>;
  setCardValue: Dispatch<SetStateAction<string>>;
  setWithoutPayment: Dispatch<SetStateAction<boolean>>;
  setActiveInputType: Dispatch<SetStateAction<ActiveInputType | null>>;
};

const OrderPayment = ({
  sum,
  cashValue,
  cardValue,
  withoutPayment,
  setCashValue,
  setCardValue,
  setActiveInputType,
  setWithoutPayment,
}: OrderPaymentProps) => (
  <VStack py="4" spacing="8" borderColor="gray.100" borderRadius="12px" borderWidth="1px">
    <OrderPaymentGroup
      text="SUMA"
      component={
        <Text fontWeight="bold" fontSize="1.8rem">
          {sum} zł
        </Text>
      }
    />
    <VStack spacing="5" w="100%">
      <OrderPaymentGroup
        text="GOTÓWKA"
        component={
          <OrderNumberInput
            setBlur={() => setActiveInputType(null)}
            setFocus={() => setActiveInputType('cash')}
            inputValue={cashValue}
            setInputValue={setCashValue}
            max={Number(sum) - Number(cardValue)}
            min={0}
          />
        }
      />
      <OrderPaymentGroup
        text="KARTA"
        component={
          <OrderNumberInput
            setBlur={() => setActiveInputType(null)}
            setFocus={() => setActiveInputType('card')}
            inputValue={cardValue}
            setInputValue={setCardValue}
            max={Number(sum) - Number(cashValue)}
            min={0}
          />
        }
      />
    </VStack>
    <VStack spacing="5" w="100%">
      <OrderPaymentGroup text="DRUKUJ PARAGON" component={<Checkbox colorScheme="green" defaultIsChecked />} />
      <OrderPaymentGroup
        text="ZAMKNIJ BEZ OPŁATY"
        component={
          <Checkbox
            colorScheme="green"
            isChecked={withoutPayment}
            onChange={(event) => setWithoutPayment(event.target.checked)}
          />
        }
      />
    </VStack>
  </VStack>
);

export default OrderPayment;
