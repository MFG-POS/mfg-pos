import React from 'react';
import { Button, Flex, Table, TableCaption, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { isEmpty } from 'others/helper-functions';
import { AddIcon, CheckCircleIcon, DeleteIcon, MinusIcon } from '@chakra-ui/icons';
import { OrderSummaryItem } from 'model/order/order-types';

type OrderSummaryProps = {
  items: OrderSummaryItem[];
  onDelete: (item: OrderSummaryItem) => void;
  onChange: (item: OrderSummaryItem, reduce: boolean) => void;
};

const OrderSummary = ({ items, onDelete, onChange }: OrderSummaryProps) => (
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
      <Flex direction="row" justifyContent="space-around">
        <Button type="submit" colorScheme="red">
          <DeleteIcon /> <Text ml="2">ANULUJ</Text>
        </Button>
        <Button type="submit" colorScheme="green">
          <CheckCircleIcon /> <Text ml="2">ZAMKNIJ</Text>
        </Button>
      </Flex>
    </TableCaption>
  </Table>
);

export default OrderSummary;
