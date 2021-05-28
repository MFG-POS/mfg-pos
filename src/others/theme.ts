import { extendTheme } from '@chakra-ui/react';

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
});
