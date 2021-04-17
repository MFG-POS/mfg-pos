import { ChakraProvider } from '@chakra-ui/react';
import MealsList from 'components/Meals/MealsList/MealsList';
import { theme } from 'others/theme';
import AddSupplier from 'components/Supplier/AddSupplier';
import Categories from 'components/Tables/Categories';

const App = () => (
  <ChakraProvider theme={theme}>
    <AddSupplier />
    <Categories />
    <MealsList />
  </ChakraProvider>
);

export default App;
