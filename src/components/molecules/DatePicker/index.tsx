import React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { Box } from '@chakra-ui/react';

import 'react-datepicker/dist/react-datepicker.css';
import 'components/molecules/DatePicker/index.css';

import pl from 'date-fns/locale/pl';

const DatePicker = ({ ...props }: ReactDatePickerProps) => (
  <Box className="light-theme">
    <ReactDatePicker locale={pl} onChangeRaw={(event) => event.preventDefault()} {...props} />
  </Box>
);

export default DatePicker;
