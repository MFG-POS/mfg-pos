import { VStack, Box, Flex } from '@chakra-ui/react';
import AddDriverTitle from 'components/molecules/Employees/Driver/AddDriverTitle/index';
import AddDriverData from 'components/molecules/Employees/Driver/AddDriverData/index';

const Driver = () => (
  <Box w="100%" minWidth="30em">
    <Flex w="100%" p="1em">
      <VStack w="100%" spacing={3} align="stretch">
        <Box h="2em">
          <AddDriverTitle />
        </Box>
        <Box h="26em" w="100%">
          <AddDriverData />
        </Box>
      </VStack>
    </Flex>
  </Box>
);

export default Driver;
