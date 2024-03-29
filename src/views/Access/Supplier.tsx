import { VStack, Box, Flex } from '@chakra-ui/react';
import AddSupplierTitle from 'components/molecules/Employees/Supplier/AddSupplierTitle/index';
import AddSupplierData from 'components/molecules/Employees/Supplier/AddSupplierData/index';

const Supplier = () => (
  <Box w="100%" minWidth="30em">
    <Flex w="100%" p="1em">
      <VStack w="100%" spacing={3} align="stretch">
        <Box h="2em">
          <AddSupplierTitle />
        </Box>
        <Box h="26em" w="100%">
          <AddSupplierData />
        </Box>
      </VStack>
    </Flex>
  </Box>
);

export default Supplier;
