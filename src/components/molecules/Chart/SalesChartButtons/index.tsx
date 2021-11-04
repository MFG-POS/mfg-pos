import { Button, Icon, Text } from '@chakra-ui/react';
import { ChartType } from 'model/enums/chart-type';
import ButtonGroupTemplate from 'components/templates/ButtonGroupTemplate';
import { v4 as uuidv4 } from 'uuid';
import { typeElements } from 'others/chart-constants';

type SalesChartButtonsProps = {
  changeChartType: (type: ChartType) => void;
};

const SalesChartButtons = ({ changeChartType }: SalesChartButtonsProps) => (
  <ButtonGroupTemplate py="3">
    {typeElements.map(({ type, icon }) => (
      <Button key={uuidv4()} type="submit" onClick={() => changeChartType(type)}>
        <Icon as={icon} /> <Text ml="2">{type}</Text>
      </Button>
    ))}
  </ButtonGroupTemplate>
);

export default SalesChartButtons;
