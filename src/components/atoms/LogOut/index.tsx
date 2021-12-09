import { Divider, Flex, Heading, Icon, Link, useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'auth/AuthContext';
import { FaUsers } from 'react-icons/all';

type LogOutProps = {
  isLink?: boolean;
};

const LogOut = ({ isLink }: LogOutProps) => {
  const { logout, currentUserDetails } = useAuth();
  const history = useHistory();
  const toast = useToast();

  async function handleLogout() {
    logout().then(() => {
      history.push('/login');
      toast({
        title: 'Zostałeś wylogowany z aplikajci',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    });
  }

  return (
    <Flex alignItems="center" justifyContent="center" flexDirection="column" w="100%" mb="2">
      <Divider mb="2" />
      <Icon as={FaUsers} textAlign="center" fontSize="2rem" />
      <Heading
        fontWeight="extrabold"
        fontSize="1rem"
        bgGradient="linear(to-r, green.400,purple.500)"
        bgClip="text"
        textAlign="center"
      >
        {currentUserDetails && `${currentUserDetails.name} ${currentUserDetails?.surname}`}
      </Heading>
      <Link
        mt="2"
        bgClip="text"
        bgGradient="linear(to-l, #B789FF, #FF4391)"
        fontWeight="extrabold"
        onClick={handleLogout}
      >
        Wyloguj
      </Link>
    </Flex>
  );
};

LogOut.defaultProps = {
  isLink: false,
};

export default LogOut;
