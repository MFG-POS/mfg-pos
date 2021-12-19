import { Box, Button, Flex, Heading, useToast } from '@chakra-ui/react';
import { useAuth } from 'auth/AuthContext';

const Preview = () => {
  const { logout } = useAuth();
  const toast = useToast();

  const handleLogout = () =>
    logout().then(() =>
      toast({
        title: 'Zostałeś wylogowany pomyślnie',
        status: 'success',
        duration: 3000,
        isClosable: true,
      }),
    );

  return (
    <Flex bg="#F9FAFB" h="100%" w="full" alignItems="center" justifyContent="center" height="100vh">
      <Box bg="gray.50">
        <Box
          maxW="7xl"
          w={{ md: '3xl', lg: '4xl' }}
          mx="auto"
          py={{ base: 12, lg: 16 }}
          px={{ base: 4, lg: 8 }}
          display={{ lg: 'flex' }}
          alignItems={{ lg: 'center' }}
          justifyContent={{ lg: 'space-between' }}
        >
          <Heading
            fontSize={{ base: '3xl', sm: '4xl' }}
            fontWeight="extrabold"
            letterSpacing="tight"
            lineHeight="shorter"
            color="gray.900"
            w="80%"
          >
            <Box display="block" as="span">
              Administrator weryfikuje Twoje konto. Już niedługo uzyskasz dostęp do aplikacji 🚀
            </Box>
          </Heading>
          <Button
            w={['full', 'auto']}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            px="5"
            py="5"
            border="solid transparent"
            fontWeight="bold"
            rounded="md"
            shadow="md"
            color="white"
            bg="purple.400"
            _hover={{
              bg: 'purple.500',
            }}
            onClick={handleLogout}
          >
            Wyloguj
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};
export default Preview;
