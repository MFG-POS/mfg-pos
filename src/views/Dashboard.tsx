import { Box, Flex, Heading, Link, Stack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => (
  <Flex bg="#F9FAFB" p="50" w="full" alignItems="center" justifyContent="center" height="100%">
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
        >
          <Box display="block" as="span">
            Gotowy/a by zacząć?
          </Box>
          <Box display="block" as="span" color="brand.600">
            Rozpocznij okres próbny 🚀
          </Box>
        </Heading>
        <Stack direction={{ base: 'column', sm: 'row' }} mt={{ base: 8, lg: 0 }} shrink={{ lg: 0 }}>
          <Link
            w={['full', 'auto']}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            px="5"
            py="3"
            border="solid transparent"
            fontWeight="bold"
            rounded="md"
            shadow="md"
            color="white"
            bg="purple.400"
            _hover={{
              bg: 'purple.500',
            }}
            as={RouterLink}
            to="/orders/board/"
          >
            Otwórz Terminal
          </Link>
          <Link
            w={['full', 'auto']}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            px="5"
            py="3"
            border="solid transparent"
            fontWeight="bold"
            rounded="md"
            shadow="md"
            color="brand.600"
            bg="white"
            _hover={{
              bg: 'gray.50',
            }}
            as={RouterLink}
            to="/menu/products/"
          >
            Twoje menu
          </Link>
        </Stack>
      </Box>
    </Box>
  </Flex>
);

export default Home;
