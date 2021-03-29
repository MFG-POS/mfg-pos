import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/all';
import styled from 'styled-components';

const StyledInputGroup = styled(InputGroup)`
  max-width: 300px;
  @media screen and (max-width: 650px) {
    max-width: 100%;
  }
`;

type SearchBarProps = {
  placeholder?: string;
  onSearch?: (value: string) => void;
};

const SearchBar = (props: SearchBarProps) => (
  <StyledInputGroup>
    <InputLeftElement pointerEvents="none">
      <MdSearch color="gray.300" />
    </InputLeftElement>
    <Input
      onChange={(event) => props.onSearch && props.onSearch(event.target.value)}
      type="text"
      placeholder={props.placeholder}
    />
  </StyledInputGroup>
);

SearchBar.defaultProps = {
  placeholder: 'Szukaj',
  onSearch: () => null,
};

export default SearchBar;
