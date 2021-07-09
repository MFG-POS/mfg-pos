import { Image, Grid, GridItem, Box } from '@chakra-ui/react';
import Supplier from 'views/Access/Supplier';
import Waiter from 'views/Access/Waiter';
import Chef from 'views/Access/Chef';
import Businessman from 'views/Access/Businessman';
import Driver from 'views/Access/Driver';
import supplier from 'assets/images/supplier.png';
import waiter from 'assets/images/waiter.png';
import chef from 'assets/images/chef.png';
import businessman from 'assets/images/businessman.png';
import driver from 'assets/images/driver.png';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Employees = () => (
  <Router>
    <Box w="100%">
      <Grid templateColumns="repeat(5, 1fr)" gap={1} m="0 auto" w="50%" marginTop="-6%">
        <GridItem colSpan={1} w="100%">
          <Link to="/access/addsupplier/">
            <Image src={supplier} alt="supplier" w="100%" m="0 auto" />
            <Box textAlign="center">Dostawca</Box>
          </Link>
        </GridItem>
        <GridItem colStart={2} colEnd={3}>
          <Link to="/access/waiter/">
            <Image src={waiter} alt="waiter" w="100%" m="0 auto" />
            <Box textAlign="center">Kelner</Box>
          </Link>
        </GridItem>
        <GridItem colStart={3} colEnd={4}>
          <Link to="/access/chef/">
            <Image src={chef} alt="chef" w="100%" m="0 auto" />
            <Box textAlign="center">Kucharz</Box>
          </Link>
        </GridItem>
        <GridItem colStart={4} colEnd={5}>
          <Link to="/access/businessman/">
            <Image src={businessman} alt="businessman" w="100%" m="0 auto" />
            <Box textAlign="center">Manager</Box>
          </Link>
        </GridItem>
        <GridItem colStart={5} colEnd={6}>
          <Link to="/access/driver/">
            <Image src={driver} alt="businessman" w="100%" m="0 auto" />
            <Box textAlign="center">Kierowca</Box>
          </Link>
        </GridItem>
      </Grid>
      <Switch>
        <Route path="/access/addsupplier/">
          <Supplier />
        </Route>
        <Route path="/access/waiter/">
          <Waiter />
        </Route>
        <Route path="/access/chef/">
          <Chef />
        </Route>
        <Route path="/access/businessman/">
          <Businessman />
        </Route>
        <Route path="/access/driver/">
          <Driver />
        </Route>
      </Switch>
    </Box>
  </Router>
);

export default Employees;
