import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react';
import { Controller, DeepMap, FieldError, FieldValues, RegisterOptions } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

// TODO: Fix types below (no any and use generic type)
type FormGroupSelectProps<MenuForm> = {
  label: string;
  id: string;
  name: string;
  placeholder?: string;
  options: string[] | Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  errors: DeepMap<FieldValues, FieldError>;
  validation: RegisterOptions;
};

function FormGroupSelect<MenuForm>({
  label,
  id,
  name,
  placeholder,
  options,
  control,
  errors,
  validation,
}: FormGroupSelectProps<MenuForm>) {
  return (
    <FormControl isInvalid={errors[name]}>
      <FormLabel htmlFor={id} fontSize="sm" fontWeight="md" color="gray.700">
        {label}
      </FormLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select
            id={id}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            mt="1"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
          >
            {Array.isArray(options)
              ? options.map((o) => (
                  <option key={uuidv4()} value={o}>
                    {o}
                  </option>
                ))
              : Object.entries(options).map(([key, val]) => (
                  <option key={uuidv4()} value={key}>
                    {val}
                  </option>
                ))}
          </Select>
        )}
        name={name}
        control={control}
        rules={validation}
      />

      <FormErrorMessage>{errors[name] ? errors[name].message : null}</FormErrorMessage>
    </FormControl>
  );
}

FormGroupSelect.defaultProps = {
  placeholder: '',
};

export default FormGroupSelect;
