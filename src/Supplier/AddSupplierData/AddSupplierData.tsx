import { Flex, Box } from '@chakra-ui/react';
import AddSupplierDataName from './AddSupplierDataName';
import AddSupplierDataAddress from './AddSupplierDataAddress';

function AddSupplierData() {
  return (
    <Flex>
      <Box w="80%" h="400">
        <AddSupplierDataName />
      </Box>
      <Box w="8%" h="400" />
      <Box w="100%" h="400">
        <AddSupplierDataAddress />
      </Box>
    </Flex>
  );
}

export default AddSupplierData;
