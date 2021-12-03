import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { formatDate } from 'others/date-functions';
import { commonChakraProps } from 'others/theme';

type ChartPeriodHeadingProps = {
  startDate: Date;
  endDate: Date;
};

const ChartPeriodHeading = ({ startDate, endDate }: ChartPeriodHeadingProps) => (
  <Box {...commonChakraProps} py="3">
    <Heading as="h5" size="md">
      Wyświetlanie zakresu od {formatDate(startDate)} do {formatDate(endDate)}
    </Heading>
  </Box>
);

export default ChartPeriodHeading;
