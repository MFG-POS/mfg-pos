import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { FormGroupProps } from 'others/form-group-type';
import { Path, UseFormRegister } from 'react-hook-form';

type FormGroupNumberProps<MenuForm> = FormGroupProps & {
  name: Path<MenuForm>;
  register: UseFormRegister<MenuForm>;
  defaultValue?: number;
};

function FormGroupNumber<MenuForm>({
  label,
  id,
  name,
  register,
  errors,
  validation,
  defaultValue = 0,
}: FormGroupNumberProps<MenuForm>) {
  return (
    <FormControl isInvalid={errors[name]}>
      <FormLabel htmlFor={id} fontSize="sm" fontWeight="md" color="gray.700">
        {label}
      </FormLabel>
      <NumberInput defaultValue={defaultValue} min={0} precision={2}>
        <NumberInputField id={id} {...register(name, validation)} focusBorderColor="brand.400" rounded="md" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <FormErrorMessage>{errors[name] ? errors[name].message : null}</FormErrorMessage>
    </FormControl>
  );
}

export default FormGroupNumber;
