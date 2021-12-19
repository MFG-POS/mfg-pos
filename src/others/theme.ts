import { ChakraProps, extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        minWidth: '320px',
      },
    },
  },
  components: {
    Popover: {
      variants: {
        responsive: {
          popper: {
            maxWidth: 'fit-content',
          },
        },
      },
    },
  },
  colors: {
    table: {
      100: '#211F1F',
    },
  },
});

export const commonChakraProps: ChakraProps = {
  display: 'flex',
  colorScheme: 'blue',
  flexDirection: 'row',
  justifyContent: 'space-around',
  variant: 'solid',
  borderColor: 'gray.100',
  borderRadius: '12px',
  borderWidth: '1px',
  my: '2',
} as ChakraProps;
