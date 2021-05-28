import { Box, Text } from '@chakra-ui/react';

type TopBarProps = {
  name: string;
  length: number;
};

const TopBar = ({ name, length }: TopBarProps) => (
  <Box p="0.5rem" mb="0.5rem" borderBottom="1px solid #e2e8f0">
    <Text display="inline-block" fontWeight="bold">
      {name}
    </Text>
    <Text display="inline-block" color="slategrey" ml="1rem">
      {length}
    </Text>
  </Box>
);

export default TopBar;
