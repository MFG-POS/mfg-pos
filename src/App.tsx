import { ChakraProvider } from '@chakra-ui/react';
import MealsList from 'components/Meals/MealsList/MealsList';
import AddSupplier from './AddSupplier';

const App = () => (
  <ChakraProvider>
    <AddSupplier />
    <MealsList />
  </ChakraProvider>
);

export default App;
