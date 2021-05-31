import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react';
import { DeepMap, FieldError, FieldPath, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

type FormGroupSelectProps<MenuForm> = {
  label: string;
  id: string;
  name: FieldPath<MenuForm>;
  placeholder?: string;
  options: string[];
  register: UseFormRegister<MenuForm>;
  errors: DeepMap<FieldValues, FieldError>;
  validation: RegisterOptions;
};

function FormGroupSelect<MenuForm>({
  label,
  id,
  name,
  placeholder,
  options,
  register,
  errors,
  validation,
}: FormGroupSelectProps<MenuForm>) {
  return (
    <FormControl isInvalid={errors[name]}>
      <FormLabel htmlFor={id} fontSize="sm" fontWeight="md" color="gray.700">
        {label}
      </FormLabel>
      <Select
        id={id}
        placeholder={placeholder}
        {...register(name, validation)}
        mt="1"
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
}

FormGroupSelect.defaultProps = {
  placeholder: '',
};

export default FormGroupSelect;
