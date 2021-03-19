import { Flex, Box } from '@chakra-ui/react';
import AddSupplierDataName from './AddSupplierDataName';
import AddSupplierDataAddress from './AddSupplierDataAddress';

const AddSupplierData = () => (
  <Flex>
    <Box w="80em" h="26em">
      <AddSupplierDataName />
    </Box>
    <Box w="6em" h="26em" />
    <Box w="100em" h="26em">
      <AddSupplierDataAddress />
    </Box>
  </Flex>
);

export default AddSupplierData;
