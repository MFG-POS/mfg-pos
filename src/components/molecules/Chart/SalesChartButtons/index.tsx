import { Button, ButtonGroup, Icon, Text } from '@chakra-ui/react';
import { ChartType } from 'model/enums/chart-type';
import { FaHandHoldingUsd, FaReceipt, FaUsers } from 'react-icons/all';

type SalesChartButtonsProps = {
  changeChartType: (type: ChartType) => void;
};

const SalesChartButtons = ({ changeChartType }: SalesChartButtonsProps) => (
  <ButtonGroup
    display="flex"
    colorScheme="blue"
    flexDirection="row"
    justifyContent="space-around"
    variant="solid"
    borderColor="gray.100"
    borderRadius="12px"
    borderWidth="1px"
    py="3"
    my="2"
  >
    <Button type="submit" onClick={() => changeChartType(ChartType.SALES_TRANSACTIONS)}>
      <Icon as={FaHandHoldingUsd} /> <Text ml="2">{ChartType.SALES_TRANSACTIONS}</Text>
    </Button>
    <Button type="submit" onClick={() => changeChartType(ChartType.SALES_CLIENTS)}>
      <Icon as={FaUsers} /> <Text ml="2">{ChartType.SALES_CLIENTS}</Text>
    </Button>
    <Button type="submit" onClick={() => changeChartType(ChartType.SALES_AVERAGE_BILL)}>
      <Icon as={FaReceipt} /> <Text ml="2">{ChartType.SALES_AVERAGE_BILL}</Text>
    </Button>
  </ButtonGroup>
);

export default SalesChartButtons;
