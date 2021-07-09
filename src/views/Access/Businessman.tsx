import { VStack, Box, Flex } from '@chakra-ui/react';
import AddBusinessmanTitle from 'components/molecules/Employees/Businessman/AddBusinessmanTitle/index';
import AddBusinessmanData from 'components/molecules/Employees/Businessman/AddBusinessmanData/index';

const Businessman = () => (
  <Box w="100%" minWidth="30em">
    <Flex w="100%" p="1em">
      <VStack w="100%" spacing={3} align="stretch">
        <Box h="2em">
          <AddBusinessmanTitle />
        </Box>
        <Box h="26em" w="100%">
          <AddBusinessmanData />
        </Box>
      </VStack>
    </Flex>
  </Box>
);

export default Businessman;
