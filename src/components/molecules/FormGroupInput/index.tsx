import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import { InputType } from 'others/input-types';
import { DeepMap, FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

type FormGroupInputProps<MenuForm> = {
  label: string;
  type?: InputType;
  id: string;
  name: Path<MenuForm>;
  register: UseFormRegister<MenuForm>;
  errors: DeepMap<FieldValues, FieldError>;
  validation: RegisterOptions;
};

function FormGroupInput<MenuForm>({
  label,
  id,
  type = 'text',
  name,
  register,
  errors,
  validation = {},
}: FormGroupInputProps<MenuForm>) {
  return (
    <FormControl isInvalid={errors[name]}>
      <FormLabel htmlFor={id} fontSize="sm" fontWeight="md" color="gray.700">
        {label}
      </FormLabel>
      <Input type={type} id={id} {...register(name, validation)} focusBorderColor="brand.400" rounded="md" />
      <FormErrorMessage>{errors[name] ? errors[name].message : null}</FormErrorMessage>
    </FormControl>
  );
}
export default FormGroupInput;
