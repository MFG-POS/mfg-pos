import { Button } from '@chakra-ui/react';

type FilterProps = {
  filterText?: string;
  onFilterClick?: () => void;
};

const Filter = (props: FilterProps) => (
  <Button onClick={props.onFilterClick} size="md" variant="outline">
    {props.filterText && props.filterText.toUpperCase()}
  </Button>
);

Filter.defaultProps = {
  filterText: 'FILTRUJ',
  onFilterClick: () => null,
};

export default Filter;
