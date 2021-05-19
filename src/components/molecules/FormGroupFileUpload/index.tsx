import { Flex, FormControl, FormErrorMessage, FormLabel, Input, Stack, Text, VisuallyHidden } from '@chakra-ui/react';
import FileUploadIcon from 'components/atoms/FileUploadIcon';
import { DeepMap, FieldError, FieldPath, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

type FormGroupFileProps = {
  label: string;
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

const FormGroupFile = ({ label, id, name, register, errors, validation }: FormGroupFileProps) => (
  <FormControl isInvalid={errors[name]}>
    <FormLabel htmlFor={id} fontSize="sm" fontWeight="md" color="gray.700">
      {label}
    </FormLabel>
    <Flex
      justify="center"
      px="6"
      pt="5"
      pb="6"
      mt="1"
      borderWidth={2}
      borderColor={errors[name] ? 'red.400' : 'gray.300'}
      borderStyle="dashed"
      rounded="md"
    >
      <Stack spacing="1" textAlign="center">
        <FileUploadIcon />
        <Flex fontSize="sm" color="gray.600" alignItems="baseline">
          <FormLabel
            htmlFor={id}
            cursor="pointer"
            rounded="md"
            fontSize="md"
            color="brand.600"
            pos="relative"
            _hover={{
              color: 'brand.400',
            }}
          >
            <span>Prześlij plik</span>
            <VisuallyHidden>
              <Input id={id} type="file" {...register(name, validation)} />
            </VisuallyHidden>
          </FormLabel>
          <Text>lub przeciągnij i upuść</Text>
        </Flex>
        <Text fontSize="xs" color="gray.500">
          PNG, JPG, GIF, maksymalna wielkość: 1MB
        </Text>
      </Stack>
    </Flex>
    <FormErrorMessage>{errors[name] ? errors[name].message : null}</FormErrorMessage>
  </FormControl>
);

export default FormGroupFile;
