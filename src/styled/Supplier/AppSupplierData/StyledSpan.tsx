import styled from 'styled-components';

const StyledSpan = styled.span`
  color: red;
  padding: 0.5rem 0 0 0;
  font-size: 90%;

  @media screen and (max-width: 1465px) {
    font-size: 80%;
  }

  @media screen and (max-width: 1340px) {
    font-size: 70%;
  }

  @media screen and (max-width: 1206px) {
    font-size: 90%;
  }

  @media screen and (max-width: 757px) {
    font-size: 80%;
  }

  @media screen and (max-width: 690px) {
    font-size: 70%;
  }
`;

export default StyledSpan;
