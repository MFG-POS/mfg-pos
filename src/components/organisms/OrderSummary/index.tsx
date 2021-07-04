import { Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { isEmpty } from 'others/helper-functions';
import { AddIcon, DeleteIcon, MinusIcon } from '@chakra-ui/icons';
import { OrderSummaryItem } from 'model/order/order-types';
import { FaBan, FaCheckCircle } from 'react-icons/all';
import OrderButtonGroup from 'components/molecules/Order/OrderButtonGroup';
import { OrderState } from 'model/order/order-state';
import { OrderStateProps } from 'views/Order/Order';

type OrderSummaryProps = {
  items: OrderSummaryItem[];
  onDelete: (item: OrderSummaryItem) => void;
  onChange: (item: OrderSummaryItem, reduce: boolean) => void;
} & OrderStateProps;

const OrderSummary = ({ items, onDelete, onChange, setOrderState }: OrderSummaryProps) => (
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
      {!isEmpty(items) && (
        <OrderButtonGroup
          submitIcon={FaCheckCircle}
          cancelIcon={FaBan}
          submitText="ZAKOŃCZ"
          cancelText="ANULUJ"
          onSubmitClick={() => setOrderState(OrderState.FINALIZATION)}
        />
      )}
    </TableCaption>
  </Table>
);

export default OrderSummary;
