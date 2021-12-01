import { Box, useColorModeValue, Button, Stack, useToast, Text, Icon, Heading } from '@chakra-ui/react';
import FormInputCheckAccess from 'components/molecules/CheckAccess/CheckAccess';
import { useForm } from 'react-hook-form';
import { CategoryWrite } from 'model/documents/category';
import { requiredErrorMessage } from 'others/form-default-errors';
import { getAll } from 'api/firebase/firestore/firestore-actions';
import { useEffect, useState } from 'react';
import { Employee } from 'model/documents/accesses';
import { useLocation } from 'react-router-dom';

const CryptoJS = require('crypto-js');

const CheckAccess = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CategoryWrite>();

  const [pin, setPin] = useState<String[]>([]);
  const [name, setName] = useState<String[]>([]);

  useEffect(() => {
    getAll('accesses').then((data) => setPin(data.map((tax) => String(tax.tax))));
    getAll('accesses').then((data) => setName(data.map((tax) => String(tax.name))));
  }, []);

  const toast = useToast();
  const location = useLocation<{ isEdit: boolean; id: string }>();

  const onSubmit = (data: Employee) => {
    let check: boolean = true;
    let nameUsers: String = 'kelnera';
    for (let position: number = 0; position < pin.length; position++) {
      const bytes = CryptoJS.AES.decrypt(pin[position], 'Password');
      const decryptdPassword = bytes.toString(CryptoJS.enc.Utf8);

      if (decryptdPassword == data.tax) {
        check = true;
        if (String(name[position]) == 'Admin' || String(name[position]) == 'Administratora') {
          nameUsers = 'managera';
        }
        break;
      } else {
        check = false;
      }
    }

    if (check == true) {
      toast({
        title: `Zalogowano ${nameUsers} do platformy🙌`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      window.location.href = '/dashboard';
    } else {
      toast({
        title: 'Nie poprawny PIN',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
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
          id="tax"
          name="tax"
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
