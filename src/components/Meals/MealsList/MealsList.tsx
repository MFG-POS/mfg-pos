import { getFirestoreDocs } from 'api/firebase/firestore/meals-actions';
import { useEffect, useState } from 'react';
import { UnorderedList } from '@chakra-ui/react';
import { Meal } from 'api/firebase/firebase.types';
import MealItem from '../MealItem/MealItem';

// This is sample component, to test integration with Firebase
const MealsList = () => {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    const docs = getFirestoreDocs('meals');
    docs
      .then((data) => {
        const currentState: Meal[] = [];
        data.forEach((meal) => {
          if (meal) {
            const { id } = meal;
            const { name, ingredients } = meal.data();
            currentState.push({ id, name, ingredients });
          }
        });
        setMeals(currentState);
      })
      .catch((err) => {
        throw new Error(`Could not fetch meals collection!. Error: ${err.message}`);
      });
  }, []);

  return (
    <>
      <UnorderedList w="50%" m="0 auto" p="15px" borderRadius="5px" bg="gray.200" styleType="none">
        {meals.length ? meals.map((meal: Meal) => <MealItem key={meal.id} meal={meal} />) : <p>Fetching meals...</p>}
      </UnorderedList>
    </>
  );
};

export default MealsList;
