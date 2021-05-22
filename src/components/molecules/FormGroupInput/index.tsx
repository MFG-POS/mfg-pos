import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import { InputType } from 'others/input-types';
import { DeepMap, FieldError, FieldPath, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
// import { CategoryFormValues } from 'views/Menu/CategoryForm';

type FormGroupInputProps = {
  label: string;
  type?: InputType;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: FieldPath<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  errors: DeepMap<FieldValues, FieldError>;
  validation: RegisterOptions;

  // name: FieldPath<CategoryFormValues>;
  // register: UseFormRegister<CategoryFormValues>;
};

const FormGroupInput = ({ label, id, type = 'text', name, register, errors, validation }: FormGroupInputProps) => (
  <FormControl isInvalid={errors[name]}>
    <FormLabel htmlFor={id} fontSize="sm" fontWeight="md" color="gray.700">
      {label}
    </FormLabel>
    <Input type={type} id={id} {...register(name, validation)} focusBorderColor="brand.400" rounded="md" />
    <FormErrorMessage>{errors[name] ? errors[name].message : null}</FormErrorMessage>
  </FormControl>
);

export default FormGroupInput;
