import { Box, Button } from '@chakra-ui/react';
import { FilterColumn, FilterRuleDefinition } from 'model/table/table-filter-types';
import SearchBar from 'components/molecules/Table/SearchBar';
import Filter from 'components/molecules/Table/Filter';
import { Link as RouterLink } from 'react-router-dom';

export interface ToolbarProps {
  buttonRoutePath?: string;
  filterColumns?: FilterColumn[];
  onSearch?: (value: string) => void;
  onFilter?: (filterRules: FilterRuleDefinition[]) => void;
}

const Toolbar = ({ filterColumns, buttonRoutePath, onSearch, onFilter }: ToolbarProps) => (
  <Box mb="0.5rem" pb="0.5rem" display="flex" borderBottom="1px solid #e2e8f0" flexDirection="row">
    {buttonRoutePath && (
      <Button as={RouterLink} to={buttonRoutePath} mx="5px">
        Dodaj
      </Button>
    )}
    {filterColumns && onFilter && <Filter columns={filterColumns} onFilter={onFilter} />}
    {onSearch && <SearchBar onSearch={onSearch} placeholder="Szukaj" />}
  </Box>
);

export default Toolbar;
