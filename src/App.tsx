import { ChakraProvider } from '@chakra-ui/react';
import MealsList from 'components/Meals/MealsList/MealsList';
import AddSupplier from './components/Supplier/AddSupplier';
import Categories from './components/Tables/Categories';
import Room from './components/PlanRoom/Room';

const App = () => (
  <ChakraProvider>
    <Room />
    <AddSupplier />
    <Categories />
    <MealsList />
  </ChakraProvider>
);

export default App;
