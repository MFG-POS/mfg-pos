import { isEmpty } from 'others/helper-functions';
import { Divider, Grid } from '@chakra-ui/react';
import OrderDocumentTile from 'components/atoms/OrderDocumentTile';
import { OrderDocument } from 'model/order/order-types';

type OrderTilesGroupProps = {
  showDivider: boolean;
  documents: OrderDocument[];
  onDocumentClick: (document: OrderDocument) => void;
};

const OrderTilesGroup = ({ showDivider, documents, onDocumentClick }: OrderTilesGroupProps) => (
  <>
    {showDivider && <Divider my="3" orientation="horizontal" />}
    {!isEmpty(documents) && (
      <Grid bg="gray.100" gap={6} templateColumns="repeat(4, 1fr)">
        {documents.map((document) => (
          <OrderDocumentTile key={document.id} document={document} onClick={onDocumentClick} />
        ))}
      </Grid>
    )}
  </>
);

export default OrderTilesGroup;
