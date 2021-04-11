import { WrapItem } from '@chakra-ui/react';
import styled from 'styled-components';

const StyledWrapItem = styled(WrapItem)`
  width: 49%;
  margin-top: 1em;

  @media screen and (max-width: 1206px) {
    width: 100%;
  }
`;

export default StyledWrapItem;
