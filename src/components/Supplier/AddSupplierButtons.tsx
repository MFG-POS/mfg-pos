import { Button, ButtonGroup, Box } from '@chakra-ui/react';
import styled from 'styled-components';

const AddSupplierButtons = () => {
  const StyledBox = styled(Box)`
    min-width: 10%;

    @media screen and (max-width: 900px) {
      min-width: 10%;
    }
  `;

  return (
    <ButtonGroup h="4em" w="100%" variant="outline" spacing="6" marginTop="1em">
      <StyledBox>
        <Button type="submit" bg="#33D268" h="2em" color="white" colorScheme="#33D268">
          Dodaj
        </Button>
      </StyledBox>
      <StyledBox>
        <Button type="submit" h="2em" bg="white" colorScheme="gray">
          Anuluj
        </Button>
      </StyledBox>
    </ButtonGroup>
  );
};

export default AddSupplierButtons;
