import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react';
import { DeepMap, FieldError, FieldPath, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

type FormGroupSelectProps = {
  label: string;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: FieldPath<any>;
  placeholder?: string;
  options: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  errors: DeepMap<FieldValues, FieldError>;
  validation: RegisterOptions;

  // name: FieldPath<CategoryFormValues>;
  // register: UseFormRegister<CategoryFormValues>;
};

const FormGroupSelect = ({
  label,
  id,
  name,
  placeholder,
  options,
  register,
  errors,
  validation,
}: FormGroupSelectProps) => (
  <FormControl isInvalid={errors[name]}>
    <FormLabel htmlFor={id} fontSize="sm" fontWeight="md" color="gray.700">
      {label}
    </FormLabel>
    <Select
      id={id}
      placeholder={placeholder}
      {...register(name, validation)}
      mt={1}
      focusBorderColor="brand.400"
      shadow="sm"
      size="sm"
      w="full"
      rounded="md"
    >
      {options.map((o) => (
        <option key={uuidv4()} value={o}>
          {o}
        </option>
      ))}
    </Select>
    <FormErrorMessage>{errors[name] ? errors[name].message : null}</FormErrorMessage>
  </FormControl>
);

FormGroupSelect.defaultProps = {
  placeholder: '',
};

export default FormGroupSelect;
