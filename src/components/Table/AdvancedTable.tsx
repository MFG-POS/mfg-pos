import styled from 'styled-components';
import TopBar from './TopBar';
import Content, { ContentProps } from './Content';
import Toolbar, { ToolbarProps } from './Toolbar';

const Styles = styled.div`
  margin: 2rem;
`;

export interface AdvancedTableProps<T extends object> extends ToolbarProps, ContentProps<T> {
  name: string;
  showTopBar?: boolean;
  showToolbar?: boolean;
}

function AdvancedTable<T extends object>(props: AdvancedTableProps<T>) {
  return (
    <Styles>
      {props.showTopBar && <TopBar name={props.name} length={props.data.length} />}
      {props.showToolbar && (
        <Toolbar
          showButton={props.showButton}
          showFilter={props.showFilter}
          showSearchBar={props.showSearchBar}
          onButtonClick={props.onButtonClick}
          onFilterClick={props.onFilterClick}
          onSearch={props.onSearch}
        />
      )}
      <Content columns={props.columns} data={props.data} />
    </Styles>
  );
}

export default AdvancedTable;
