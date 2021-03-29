import { ChakraProvider } from '@chakra-ui/react';
import MealsList from 'components/Meals/MealsList/MealsList';
import AddSupplier from './AddSupplier';
import Categories from './components/tables/Categories';

const App = () => (
  <ChakraProvider>
    <AddSupplier />
    <Categories />
    <MealsList />
  </ChakraProvider>
);

export default App;
