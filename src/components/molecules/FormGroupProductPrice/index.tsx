import {
  FormControl,
  FormLabel,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  Text,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Path, UseFormRegister } from 'react-hook-form';

import { Tax } from 'model/documents/tax';
import { FormGroupProps } from 'others/form-group-type';

type FormGroupProductPriceProps<MenuForm> = FormGroupProps & {
  name: Path<MenuForm>;
  tax: Tax;
  register: UseFormRegister<MenuForm>;
};

function FormGroupProductPrice<MenuForm>({
  id,
  name,
  register,
  errors,
  validation,
  tax,
  label,
}: FormGroupProductPriceProps<MenuForm>) {
  return (
    <FormControl isInvalid={errors[name]}>
      <Text fontSize="lg" fontWeight="bold" pb="5" textAlign="center" color="gray.700">
        💰 {label}
      </Text>
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        alignItems={{ base: 'center', lg: 'flex-end' }}
        justifyContent="center"
      >
        <VStack>
          <FormLabel htmlFor={id} fontSize="sm" fontWeight="md" color="gray.700">
            Cena bez VAT (zł)
          </FormLabel>
          <NumberInput size="md" defaultValue={0} min={0} precision={2}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </VStack>
        <VStack>
          <FormLabel htmlFor={id} fontSize="sm" fontWeight="md" color="gray.700">
            Narzut / marża (%)
          </FormLabel>
          <NumberInput size="md" defaultValue={0} min={0}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </VStack>
        {tax && (
          <VStack>
            <FormLabel htmlFor={id} fontSize="sm" fontWeight="md" color="gray.700">
              Podatek (%)
            </FormLabel>
            <NumberInput size="md" disabled>
              <NumberInputField />
            </NumberInput>
          </VStack>
        )}
        <VStack>
          <FormLabel htmlFor={id} fontSize="sm" fontWeight="md" color="gray.700">
            Kwota całkowita (zł)
          </FormLabel>
          <NumberInput size="md" defaultValue={0} min={0} precision={2} isReadOnly>
            <NumberInputField />
          </NumberInput>
        </VStack>
      </Stack>
      <FormErrorMessage>{errors[name] ? errors[name].message : null}</FormErrorMessage>
    </FormControl>
  );
}

export default FormGroupProductPrice;
