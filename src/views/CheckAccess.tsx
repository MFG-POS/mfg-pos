import { Box, useColorModeValue, Button, Stack, Image, Text, Icon, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import FormInputCheckAccess from 'components/molecules/CheckAccess/CheckAccess';
import { useForm } from 'react-hook-form';
import { CategoryWrite } from 'model/documents/category';
import { requiredErrorMessage } from 'others/form-default-errors';
import { getAll } from 'api/firebase/firestore/firestore-actions';
import { useEffect, useState } from 'react';

const CheckAccess = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CategoryWrite>();

  const [pin, setPin] = useState<Record<string, string>>({});

  useEffect(() => {
    getAll('accesses').then((data) =>
      setPin(data.reduce((acc, tax) => ({ ...acc, [tax.id!]: `${tax.tax}` }), {}) as Record<string, string>),
    );
  }, []);

  const onSubmit = (data: String) => {
    console.log(Object.keys(pin).length);
    console.log(pin);
    console.log(data);
  };

  return (
    <Box px="8" py="24" mx="auto">
      <Box w={{ base: 'full', md: 11 / 12, xl: 9 / 12 }} mx="auto" textAlign={{ base: 'left', md: 'center' }}>
        <Heading
          mb="6"
          fontSize={{ base: '4xl', md: '6xl' }}
          fontWeight="bold"
          lineHeight="none"
          letterSpacing={{ base: 'normal', md: 'tight' }}
          color={useColorModeValue('gray.900', 'gray.100')}
        >
          Wprowadź{' '}
          <Text
            display={{ base: 'block', lg: 'inline' }}
            w="full"
            bgClip="text"
            bgGradient="linear(to-r, green.400,purple.500)"
            fontWeight="extrabold"
          >
            PIN
          </Text>{' '}
          dostepu do aplikacji
        </Heading>
        <FormInputCheckAccess
          type="text"
          label=""
          id="name"
          name="name"
          register={register}
          errors={errors}
          validation={{ required: requiredErrorMessage }}
        />
        <Stack
          paddingTop="3em"
          direction={{ base: 'column', sm: 'row' }}
          mb={{ base: 4, md: 8 }}
          spacing="2"
          justifyContent={{ sm: 'left', md: 'center' }}
        >
          <Button
            variant="solid"
            colorScheme="purple"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            w={{ base: 'full', sm: 'auto' }}
            mb={{ base: 2, sm: 0 }}
            size="lg"
            onClick={handleSubmit(onSubmit)}
          >
            Zaloguj
            <Icon boxSize="4" ml="1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </Icon>
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default CheckAccess;
