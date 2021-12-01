import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import { FormGroupProps } from 'others/form-group-type';
import { InputType } from 'others/input-types';
import { Path, UseFormRegister } from 'react-hook-form';

type FormInputCheckAccessProps<MenuForm> = FormGroupProps & {
  type?: InputType;
  name: Path<MenuForm>;
  register: UseFormRegister<MenuForm>;
};

function FormInputCheckAccess<MenuForm>({
  label,
  id,
  type = 'text',
  name,
  register,
  errors,
  validation = {},
}: FormInputCheckAccessProps<MenuForm>) {
  return (
    <FormControl isInvalid={errors[name]} w="20em" margin="0 auto">
      <FormLabel htmlFor={id} fontSize="sm" fontWeight="md" color="gray.700" textAlign="center" padding="2em">
        {label}
      </FormLabel>
      <Input
        w="20em"
        maxLength={25}
        textAlign="center"
        type={type}
        id={id}
        {...register(name, validation)}
        border="2px solid black"
        rounded="md"
      />
      <FormErrorMessage w="20em" textAlign="center">
        {errors[name] ? errors[name].message : null}
      </FormErrorMessage>
    </FormControl>
  );
}
export default FormInputCheckAccess;
