import { Box, Button } from '@chakra-ui/react';
import { FilterColumn, FilterRuleDefinition } from 'model/table/table-filter-types';
import SearchBar from 'components/molecules/Table/SearchBar';
import Filter from 'components/molecules/Table/Filter';
import { Link as RouterLink } from 'react-router-dom';

export interface ToolbarProps {
  showButton?: boolean;
  showFilter?: boolean;
  showSearchBar?: boolean;
  buttonText?: string;
  buttonRoutePath?: string;
  filterColumns?: FilterColumn[];
  onSearch?: (value: string) => void;
  onFilter?: (filterRules: FilterRuleDefinition[]) => void;
}

const Toolbar = ({
  showButton,
  showFilter,
  showSearchBar,
  buttonText,
  filterColumns,
  buttonRoutePath,
  onSearch,
  onFilter,
}: ToolbarProps) => (
  <Box mb="0.5rem" pb="0.5rem" display="flex" borderBottom="1px solid #e2e8f0" flexDirection="row">
    {showButton && buttonRoutePath && (
      <Button as={RouterLink} to={buttonRoutePath} mx="5px">
        {buttonText}
      </Button>
    )}
    {showFilter && filterColumns && onFilter && <Filter columns={filterColumns} onFilter={onFilter} />}
    {showSearchBar && onSearch && <SearchBar onSearch={onSearch} placeholder="Szukaj" />}
  </Box>
);

Toolbar.defaultProps = {
  showButton: true,
  buttonText: 'Dodaj',
  showFilter: true,
  showSearchBar: true,
};

export default Toolbar;
