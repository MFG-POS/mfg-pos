import styled from 'styled-components';

const Styles = styled.div`
  border-bottom: 1px solid #e2e8f0;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Name = styled.span`
  font-weight: bold;
`;

const Length = styled.span`
  margin-left: 1rem;
  color: slategrey;
`;

type TopBarProps = {
  name: string;
  length: number;
};

const TopBar = (props: TopBarProps) => (
  <Styles>
    <Name>{props.name}</Name>
    <Length>{props.length}</Length>
  </Styles>
);

export default TopBar;
