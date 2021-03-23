import { VStack, StackDivider, Box, Flex } from '@chakra-ui/react';
import AddSupplierTitle from 'components/Supplier/AddSupplierTitle';
import AddSupplierButtons from 'components/Supplier/AddSupplierButtons';
import AddSupplierData from 'components/Supplier/AppSupplierData/AddSupplierData';

const Form = () => (
  <Flex w="96rem" p="1em">
    <Box w="22em" h="30em" bg="gray.200" />
    <Box w="1em" h="1em" bg="white" />
    <VStack w="72em" divider={<StackDivider borderColor="gray.200" />} spacing={3} align="stretch">
      <Box h="2em">
        <AddSupplierTitle />
      </Box>
      <Box h="26em" w="70em">
        <AddSupplierData />
      </Box>
      <AddSupplierButtons />
    </VStack>
  </Flex>
);

export default Form;
