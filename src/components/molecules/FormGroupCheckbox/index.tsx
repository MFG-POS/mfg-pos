import { FormControl, FormLabel, Checkbox, FormErrorMessage } from '@chakra-ui/react';
import { FormGroupProps } from 'others/form-group-type';
import { Path, UseFormRegister } from 'react-hook-form';

type FormGroupCheckboxProps<MenuForm> = FormGroupProps & {
  name: Path<MenuForm>;
  register: UseFormRegister<MenuForm>;
};

function FormGroupCheckbox<MenuForm>({
  label,
  id,
  name,
  register,
  errors,
  validation = {},
}: FormGroupCheckboxProps<MenuForm>) {
  return (
    <FormControl isInvalid={errors[name]}>
      <FormLabel htmlFor={id} fontSize="sm" fontWeight="md" color="gray.700">
        {label}
      </FormLabel>
      <Checkbox
        isInvalid={errors[name]}
        value={name}
        htmlFor={id}
        {...register(name, validation)}
        fontSize="sm"
        fontWeight="md"
        color="gray.700"
      />
      <FormErrorMessage>{errors[name] ? errors[name].message : null}</FormErrorMessage>
    </FormControl>
  );
}
export default FormGroupCheckbox;
