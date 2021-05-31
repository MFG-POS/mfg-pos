import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

type SearchBarProps = {
  placeholder?: string;
  onSearch?: (value: string) => void;
};

const SearchBar = ({ placeholder, onSearch }: SearchBarProps) => (
  <InputGroup maxW="60" mx="5px">
    <InputLeftElement pointerEvents="none">
      <SearchIcon color="gray.300" />
    </InputLeftElement>
    <Input onChange={(event) => onSearch && onSearch(event.target.value)} type="text" placeholder={placeholder} />
  </InputGroup>
);

export default SearchBar;
