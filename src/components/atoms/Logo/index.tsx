import { Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type LogoProps = {
  isLink?: boolean;
};

const Logo = ({ isLink }: LogoProps) => (
  <Heading
    fontWeight="extrabold"
    p="4"
    size="xl"
    bgGradient="linear(to-l, #7928CA, #FF0080)"
    bgClip="text"
    w="100%"
    textAlign="center"
  >
    {isLink ? <Link to="/">mfg.pos</Link> : 'mfg.pos'}
  </Heading>
);

Logo.defaultProps = {
  isLink: false,
};

export default Logo;
