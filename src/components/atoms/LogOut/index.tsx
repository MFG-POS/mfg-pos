import { Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type LogOutProps = {
  isLink?: boolean;
};

const LogOut = ({ isLink }: LogOutProps) => (
  <Heading
    fontWeight="extrabold"
    p="4"
    size=""
    bgGradient="linear(to-l, #B789FF, #FF4391)"
    bgClip="text"
    w="100%"
    textAlign="center"
  >
    {isLink ? <Link to="/login">Wyloguj</Link> : 'mfg.pos'}
  </Heading>
);

LogOut.defaultProps = {
  isLink: false,
};

export default LogOut;
