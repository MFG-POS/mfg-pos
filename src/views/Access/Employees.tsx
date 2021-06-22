import { Image, Grid, GridItem, Box, Heading } from '@chakra-ui/react';
import AddSupplier from 'views/Access/AddSupplier';
import AddWaiter from 'views/Access/AddWaiter';
import supplier from 'assets/images/supplier.png';
import waiter from 'assets/images/waiter.png';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Employees = () => (
  <Router>
    <Box w="100%">
      <Grid templateColumns="repeat(5, 1fr)" gap={1} m="0 auto" marginBottom="1%" w="70%">
        <GridItem colSpan={2} w="100%">
          <Link to="/access/addsupplier/">
            <Image src={supplier} alt="supplier" w="70%" m="0 auto" bgColor="white" />
            <Box textAlign="center">Dostawca</Box>
          </Link>
        </GridItem>
        <GridItem colStart={4} colEnd={6}>
          <Link to="/access/waiter/">
            <Image src={waiter} alt="waiter" w="70%" m="0 auto" bgColor="white" onClick={() => {}} />
            <Box textAlign="center">Kelner</Box>
          </Link>
        </GridItem>
      </Grid>
      <Switch>
        <Route path="/access/addsupplier/">
          <AddSupplier />
        </Route>
        <Route path="/access/waiter/">
          <AddWaiter />
        </Route>
      </Switch>
    </Box>
  </Router>
);

export default Employees;
