import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, useToast } from '@chakra-ui/react';

import { ROUTE_MENU } from 'routing';
import { Ingredient } from 'model/documents/ingredient';

import FormGroupInput from 'components/molecules/FormGroupInput';
import FormGroupSelect from 'components/molecules/FormGroupSelect';
import FormTemplate from 'components/templates/FormTemplate';
import FormGroupNumber from 'components/molecules/FormGroupNumber';

const IngredientForm = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Ingredient>();

  /*
   * TODO: Placeholder function, will be replaced with real API request later
   */
  const onSubmit: SubmitHandler<Ingredient> = (data) =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsSubmitted(true);
        toast({
          title: 'Składnik dodany 🙌',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom-right',
        });
        resolve();
        console.log(`Zapisany składnik: ${data}`);
      }, 2000);
    });

  /*
   * TODO: To be replaced with DB data
   */
  const MOCK_UNITS_OPTIONS = ['kg', 'g', 'l', 'ml'];

  return (
    <>
      {isSubmitted && <Redirect to={ROUTE_MENU.INGREDIENTS.path} />}
      <FormTemplate onSubmit={handleSubmit(onSubmit)}>
        <FormGroupInput
          label="Składnik"
          id="name"
          type="text"
          name="name"
          register={register}
          errors={errors}
          validation={{ required: 'To pole jest wymagane' }}
        />
        <FormGroupSelect
          label="Jednostka"
          id="unit-of-measure"
          name="unitOfMeasure"
          placeholder="Wybierz jednostkę"
          register={register}
          errors={errors}
          validation={{ required: 'To pole jest wymagane' }}
          options={MOCK_UNITS_OPTIONS}
        />
        <FormGroupNumber
          label="Aktualne zapasy"
          id="supplies"
          name="supplies"
          register={register}
          errors={errors}
          validation={{}}
        />
        <Button isLoading={isSubmitting} type="submit" colorScheme="green" variant="solid" alignSelf="flex-start">
          Zapisz
        </Button>
      </FormTemplate>
    </>
  );
};

export default IngredientForm;
