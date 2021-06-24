import React from 'react';
import { Box, Flex, Image, Text, Tooltip } from '@chakra-ui/react';
import { isSummaryDocument, OrderDocument } from 'model/order/order-types';

type OrderDocumentTileProps = {
  document: OrderDocument;
  onClick: (document: OrderDocument) => void;
};

const OrderDocumentTile = ({ document, onClick }: OrderDocumentTileProps) => (
  <Flex
    direction="column"
    justifyContent="space-between"
    width="140px"
    boxShadow="xl"
    borderRadius="md"
    backgroundColor="white"
    _hover={{ boxShadow: '2xl', cursor: 'pointer' }}
    onClick={() => onClick(document)}
  >
    <Image src={document.image as string} alt="Document image" width="100%" height="100px" objectFit="cover" />
    <Flex direction="row" justifyContent="space-between" maxHeight="40px" textOverflow="ellipsis" px="1" py="2" ml="2">
      <Tooltip label={document.name} aria-label="Name tooltip">
        <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
          {document.name}
        </Text>
      </Tooltip>
      {isSummaryDocument(document) && <Box whiteSpace="nowrap" ml="1" mr="2">{`${document.grossPrice} zł`}</Box>}
    </Flex>
  </Flex>
);

export default OrderDocumentTile;
