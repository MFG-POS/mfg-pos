import { Table, TableCaption, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { isEmpty } from 'others/helper-functions';
import { AddIcon, DeleteIcon, MinusIcon } from '@chakra-ui/icons';
import { OrderSummaryItem } from 'model/order/order-types';
import { FaBan, FaCheckCircle } from 'react-icons/all';
import OrderButtonGroup from 'components/molecules/Order/OrderButtonGroup';
import { OrderState } from 'model/order/order-state';
import { OrderStateProps } from 'views/Order/Order';
import SimpleModal from 'components/atoms/SimpleModal';

type OrderSummaryProps = {
  items: OrderSummaryItem[];
  onDelete: (item: OrderSummaryItem) => void;
  onChange: (item: OrderSummaryItem, reduce: boolean) => void;
  cancelOrder: () => void;
} & OrderStateProps;

const OrderSummary = ({ items, onDelete, onChange, setOrderState, cancelOrder }: OrderSummaryProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>NAZWA</Th>
          <Th>CENA</Th>
          <Th>ILOŚĆ</Th>
          <Th>SUMA</Th>
          <Th>AKCJE</Th>
        </Tr>
      </Thead>
      <Tbody>
        {items.map((product) => (
          <Tr key={product.document.id}>
            <Td>{product.document.name}</Td>
            <Td>{product.document.grossPrice.toFixed(2)} zł</Td>
            <Td>{product.count}</Td>
            <Td>{product.sum.toFixed(2)} zł</Td>
            <Td pl="2">
              <AddIcon onClick={() => onChange(product, false)} mx="2" cursor="pointer" />
              {product.count > 1 && <MinusIcon onClick={() => onChange(product, true)} cursor="pointer" />}
              <DeleteIcon onClick={() => onDelete(product)} mx="2" cursor="pointer" />
            </Td>
          </Tr>
        ))}
      </Tbody>
      {!isEmpty(items) && (
        <Tfoot>
          <Tr>
            <Th>SUMA</Th>
            <Th />
            <Th />
            <Th />
            <Th>{items.reduce((actual, previous) => actual + previous.sum, 0).toFixed(2)} zł</Th>
          </Tr>
        </Tfoot>
      )}
      <TableCaption>
        <SimpleModal
          isOpen={isOpen}
          onClose={onClose}
          header="Anulowanie zamówienia"
          closeCallback={cancelOrder}
          content={
            <Text>
              Po wykonaniu tej akcji zamówienie zostanie bezpowrotnie usunięte z systemu. Czy na pewno chcesz
              kontynować?
            </Text>
          }
        />
        <OrderButtonGroup
          submitIcon={FaCheckCircle}
          cancelIcon={FaBan}
          submitText="ZAKOŃCZ"
          cancelText="ANULUJ"
          hideSubmit={isEmpty(items)}
          onSubmitClick={() => setOrderState(OrderState.FINALIZATION)}
          onCancelClick={onOpen}
        />
      </TableCaption>
    </Table>
  );
};

export default OrderSummary;
