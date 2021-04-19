import { VStack, StackDivider, Box, Flex } from '@chakra-ui/react';
import AddSupplierTitle from 'components/Supplier/AddSupplierTitle';
import AddSupplierData from 'components/Supplier/AppSupplierData/AddSupplierData';
import styled from 'styled-components';

const Form = () => {
  const StyledDiv = styled.div`
    width: 100%;
    padding: 0.5rem 0 0 0;

    @media screen and (max-width: 650px) {
      width: 650px;
    }
  `;

  return (
    <StyledDiv>
      <Flex w="100%" p="1em">
        <Box w="22%" h="30em" bg="gray.200" />
        <Box w="1%" h="1em" bg="white" />
        <VStack w="77%" divider={<StackDivider borderColor="gray.200" />} spacing={3} align="stretch">
          <Box h="2em">
            <AddSupplierTitle />
          </Box>
          <Box h="26em" w="100%">
            <AddSupplierData />
          </Box>
        </VStack>
      </Flex>
    </StyledDiv>
  );
};

export default Form;
