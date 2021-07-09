import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  Text,
  VisuallyHidden,
  Image,
} from '@chakra-ui/react';
import FileUploadIcon from 'components/atoms/FileUploadIcon';
import { FormGroupProps } from 'others/form-group-type';
import { Path, UseFormRegister } from 'react-hook-form';

type FormGroupFileProps<MenuForm> = FormGroupProps & {
  name: Path<MenuForm>;
  register: UseFormRegister<MenuForm>;
  imagePreview: string;
};

function FormGroupFile<MenuForm>({
  label,
  id,
  name,
  register,
  errors,
  validation,
  imagePreview,
}: FormGroupFileProps<MenuForm>) {
  return (
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
        <VStack spacing="1" textAlign="center">
          {!imagePreview && <FileUploadIcon />}
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
          {imagePreview && <Image boxSize="150px" objectFit="contain" src={imagePreview} alt="" textAlign="center" />}
          {!imagePreview && (
            <Text fontSize="xs" color="gray.500">
              PNG, JPG, GIF, maksymalna wielkość: 1MB
            </Text>
          )}
        </VStack>
      </Flex>
      <FormErrorMessage>{errors[name] ? errors[name].message : null}</FormErrorMessage>
    </FormControl>
  );
}

export default FormGroupFile;
