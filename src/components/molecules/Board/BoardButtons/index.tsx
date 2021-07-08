import { Button, ButtonGroup } from '@chakra-ui/react';

type BoardButtonsProps = {
  addNewTable: () => void;
  saveTables: () => void;
  clearBoard: () => void;
};

const BoardButtons = ({ addNewTable, saveTables, clearBoard }: BoardButtonsProps) => (
  <>
    <ButtonGroup
      h="100%"
      colorScheme="green"
      variant="solid"
      display="flex"
      justifyContent="space-around"
      alignItems="center"
    >
      <Button onClick={saveTables}>ZAPISZ POŁOŻENIE STOLIKÓW</Button>
      <Button onClick={addNewTable}>DODAJ STOLIK</Button>
      <Button onClick={clearBoard}>WYCZYŚĆ PLANSZĘ</Button>
    </ButtonGroup>
  </>
);

export default BoardButtons;
