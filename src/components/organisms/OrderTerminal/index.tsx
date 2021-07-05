import { Dispatch, SetStateAction } from 'react';
import { isSummaryDocument, OrderDocument, OrderSummaryItem } from 'model/order/order-types';
import { Box, Flex } from '@chakra-ui/react';
import OrderSummary from 'components/organisms/OrderSummary';
import update from 'immutability-helper';
import OrderPanel from 'components/organisms/OrderPanel';
import { OrderStateProps } from 'views/Order/Order';

type OrderTerminalProps = {
  summaryItems: OrderSummaryItem[];
  setSummaryItems: Dispatch<SetStateAction<OrderSummaryItem[]>>;
} & OrderStateProps;

const OrderTerminal = ({ summaryItems, setSummaryItems, setOrderState }: OrderTerminalProps) => {
  const addSummaryItem = (document: OrderDocument) => {
    const itIsSummaryDocument = isSummaryDocument(document);
    const itemIndex = summaryItems.findIndex((item) => item.document.id === document.id);
    const indexFound = itemIndex !== -1;
    if (itIsSummaryDocument && !indexFound) addNewSummaryItem(document);
    else if (itIsSummaryDocument && indexFound) updateSummaryItem(summaryItems[itemIndex], false);
  };

  const addNewSummaryItem = (document: OrderDocument) =>
    isSummaryDocument(document)
      ? setSummaryItems((items) => [
          ...items,
          {
            document,
            count: 1,
            sum: document.grossPrice,
          },
        ])
      : null;

  const updateSummaryItem = (item: OrderSummaryItem, reduce: boolean) => {
    const price = item.document.grossPrice;
    const itemIndex = summaryItems.findIndex((summaryItem) => summaryItem.document.id === item.document.id);
    const itemToUpdate: OrderSummaryItem = {
      document: item.document,
      count: item.count + (reduce ? -1 : 1),
      sum: item.sum + (reduce ? -price : price),
    };
    setSummaryItems(
      update(summaryItems, {
        [itemIndex]: {
          $set: itemToUpdate,
        },
      }),
    );
  };

  const deleteSummaryItem = (item: OrderSummaryItem) =>
    setSummaryItems((items) => [...items.filter((anotherItem) => anotherItem.document.id !== item.document.id)]);

  return (
    <Flex direction="row">
      <Box minW="70vh" bg="gray.100" p="4" m="2">
        <OrderPanel addSummaryItem={addSummaryItem} />
      </Box>
      <Box minW="60vh">
        <OrderSummary
          items={summaryItems}
          onChange={updateSummaryItem}
          onDelete={deleteSummaryItem}
          setOrderState={setOrderState}
        />
      </Box>
    </Flex>
  );
};

export default OrderTerminal;
