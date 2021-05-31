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
import { DeepMap, FieldError, Path, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

type FormGroupNumberProps<MenuForm> = {
  label: string;
  id: string;
  name: Path<MenuForm>;
  register: UseFormRegister<MenuForm>;
  errors: DeepMap<FieldValues, FieldError>;
  validation: RegisterOptions;
};

function FormGroupNumber<MenuForm>({ label, id, name, register, errors, validation }: FormGroupNumberProps<MenuForm>) {
  return (
    <FormControl isInvalid={errors[name]}>
      <FormLabel htmlFor={id} fontSize="sm" fontWeight="md" color="gray.700">
        {label}
      </FormLabel>
      <NumberInput defaultValue={0} min={0} precision={2}>
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
