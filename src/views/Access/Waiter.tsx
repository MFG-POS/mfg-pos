import { VStack, Box, Flex } from '@chakra-ui/react';
import AddWaiterTitle from 'components/molecules/Employees/Waiter/AddWaiterTitle/index';
import AddWaiterData from 'components/molecules/Employees/Waiter/AddWaiterData/index';

const Waiter = () => (
  <Box w="100%" minWidth="30em">
    <Flex w="100%" p="1em">
      <VStack w="100%" spacing={3} align="stretch">
        <Box h="2em">
          <AddWaiterTitle />
        </Box>
        <Box h="26em" w="100%">
          <AddWaiterData />
        </Box>
      </VStack>
    </Flex>
  </Box>
);

export default Waiter;
