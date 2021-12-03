import React from 'react';
import { Button, Icon, Text, Tooltip } from '@chakra-ui/react';
import { ChartPeriod } from 'model/enums/chart-period';
import DatePicker from 'components/molecules/DatePicker';
import ButtonGroupTemplate from 'components/templates/ButtonGroupTemplate';
import { v4 as uuidv4 } from 'uuid';
import { periodElements } from 'others/chart-constants';

type ChartPeriodChangerProps = {
  startDate: Date | null;
  chartPeriod: ChartPeriod;
  changeChartPeriod: (type: ChartPeriod) => void;
  onChange: (date: Date) => void;
};

const ChartPeriodChanger = ({ startDate, chartPeriod, changeChartPeriod, onChange }: ChartPeriodChangerProps) => (
  <ButtonGroupTemplate py="2">
    {periodElements.map(({ period, tooltip, icon }) => (
      <Tooltip key={uuidv4()} label={tooltip}>
        <Button type="submit" onClick={() => changeChartPeriod(period)}>
          <Icon as={icon} /> <Text ml="2">{period}</Text>
        </Button>
      </Tooltip>
    ))}
    <DatePicker
      selected={startDate}
      onChange={onChange}
      dateFormat={ChartPeriod.MONTHLY === chartPeriod ? 'MM/yyyy' : 'dd/MM/yyyy'}
      showMonthYearPicker={ChartPeriod.MONTHLY === chartPeriod}
    />
  </ButtonGroupTemplate>
);

export default ChartPeriodChanger;
