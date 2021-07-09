import { VStack, Box, Flex } from '@chakra-ui/react';
import AddChefTitle from 'components/molecules/Employees/Chef/AddChefTitle/index';
import AddChefData from 'components/molecules/Employees/Chef/AddChefData/index';

const Chef = () => (
  <Box w="100%" minWidth="30em">
    <Flex w="100%" p="1em">
      <VStack w="100%" spacing={3} align="stretch">
        <Box h="2em">
          <AddChefTitle />
        </Box>
        <Box h="26em" w="100%">
          <AddChefData />
        </Box>
      </VStack>
    </Flex>
  </Box>
);

export default Chef;
