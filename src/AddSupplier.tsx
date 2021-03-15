import { VStack, StackDivider, Box, Flex } from '@chakra-ui/react';
import AddSupplierTittle from './Supplier/AddSupplierTittle';
import AddSupplierButtons from './Supplier/AddSupplierButtons';
import AddSupplierData from './Supplier/AddSupplierData/AddSupplierData';

function Form() {
  return (
    <Flex w="100%" p="4">
      <Box w="26%" h="520" bg="gray.200" />
      <Box w="2%" h="10" bg="white" />
      <VStack w="72%" divider={<StackDivider borderColor="gray.200" />} spacing={3} align="stretch">
        <Box h="40px">
          <AddSupplierTittle />
        </Box>
        <Box h="400px" w="100%">
          <AddSupplierData />
        </Box>
        <AddSupplierButtons />
      </VStack>
    </Flex>
  );
}

export default Form;
