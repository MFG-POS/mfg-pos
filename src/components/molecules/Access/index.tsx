import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import { FormGroupProps } from 'others/form-group-type';
import { InputType } from 'others/input-types';
import { Path, UseFormRegister } from 'react-hook-form';

type FormInputProps<MenuForm> = FormGroupProps & {
  type?: InputType;
  name: Path<MenuForm>;
  register: UseFormRegister<MenuForm>;
};

function FormInput<MenuForm>({
  label,
  id,
  type = 'text',
  name,
  register,
  errors,
  validation = {},
}: FormInputProps<MenuForm>) {
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
export default FormInput;
