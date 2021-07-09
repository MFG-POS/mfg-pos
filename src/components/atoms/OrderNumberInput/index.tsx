import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

type OrderNumberInputProps = {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  setFocus: () => void;
  setBlur: () => void;
  min: number;
  max: number;
};

const OrderNumberInput = ({ inputValue, setInputValue, setFocus, setBlur, min, max }: OrderNumberInputProps) => {
  const format = (value: string): string => `${value} zł`;
  const parse = (value: string): string => value.replace(/ zł$/, '');

  return (
    <NumberInput
      precision={2}
      onChange={(valueString) => setInputValue(parse(valueString))}
      onFocus={setFocus}
      onBlur={setBlur}
      value={format(inputValue)}
      min={min}
      max={max}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default OrderNumberInput;
