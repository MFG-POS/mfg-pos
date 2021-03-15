import { ChakraProvider } from '@chakra-ui/react';

import AddSupplier from './AddSupplier';

function App() {
  return (
    <ChakraProvider>
      <AddSupplier />
    </ChakraProvider>
  );
}

export default App;
