import { Meal } from 'api/firebase/firebase.types';
import React from 'react';
import { ListItem, ListIcon, Box, Heading, Flex, Text } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const MealItem = React.memo<{ meal: Meal }>(({ meal: { id, name, ingredients } }) => (
  <ListItem>
    <Box p="20px">
      <Heading>
        <ListIcon as={StarIcon} color="yellow.500" />
        {name}
      </Heading>
    </Box>
    <Text p="10px">Ingredients:</Text>
    {ingredients.map(({ ingredient, portion }) => (
      <Flex key={id}>
        <Text p="10px">{ingredient}</Text>
        <Text p="10px">{portion}</Text>
      </Flex>
    ))}
  </ListItem>
));

export default MealItem;
