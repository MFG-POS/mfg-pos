import { Grid } from '@chakra-ui/react';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  width: 90%;

  @media screen and (max-width: 1206px) {
    width: 100%;
  }
`;

export default StyledGrid;
