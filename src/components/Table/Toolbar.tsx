import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { ROUTE_MENU_FORMS } from 'routing';

import Filter from './Filter';
import SearchBar from './SearchBar';

const Styles = styled.div`
  border-bottom: 1px solid #e2e8f0;
  padding: 0.5rem 0.5rem 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 650px) {
    flex-direction: column;
  }

  & > * {
    margin: 0 5px;

    @media screen and (max-width: 650px) {
      margin: 5px 0;
    }
  }
`;

export interface ToolbarProps {
  showButton?: boolean;
  buttonText?: string;
  showFilter?: boolean;
  filterText?: string;
  showSearchBar?: boolean;
  onButtonClick?: () => void;
  onFilterClick?: () => void;
  onSearch?: (value: string) => void;
}

const Toolbar = (props: ToolbarProps) => (
  <Styles>
    {props.showButton && (
      <Button as={RouterLink} to={ROUTE_MENU_FORMS.CATEGORY.path} size="md" onClick={props.onButtonClick}>
        {props.buttonText && props.buttonText.toUpperCase()}
      </Button>
    )}
    {props.showFilter && <Filter onFilterClick={props.onFilterClick} filterText={props.filterText} />}
    {props.showSearchBar && <SearchBar onSearch={props.onSearch} />}
  </Styles>
);

Toolbar.defaultProps = {
  showButton: true,
  buttonText: 'DODAJ',
  showFilter: true,
};

export default Toolbar;
