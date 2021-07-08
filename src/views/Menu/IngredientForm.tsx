import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, useToast } from '@chakra-ui/react';

import { ROUTE_MENU } from 'routing';
import { Ingredient } from 'model/documents/ingredient';

import { requiredErrorMessage } from 'others/form-default-errors';

import FormGroupInput from 'components/molecules/FormGroupInput';
import FormGroupSelect from 'components/molecules/FormGroupSelect';
import FormTemplate from 'components/templates/FormTemplate';
import FormGroupNumber from 'components/molecules/FormGroupNumber';
import { save } from 'api/firebase/firestore/firestore-actions';
import { UnitOfMeasure } from 'model/enums/unit-of-measure';

const IngredientForm = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<Ingredient>();

  const onSubmit: SubmitHandler<Ingredient> = (data) => {
    save('ingredients', {
      ...data,
      supplies: Number(data.supplies),
    }).then(() => {
      setIsSubmitted(true);
      toast({
        title: 'Składnik dodany 🙌',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
    });
  };

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
          validation={{ required: requiredErrorMessage }}
        />
        <FormGroupSelect
          label="Jednostka"
          id="unit-of-measure"
          name="unitOfMeasure"
          placeholder="Wybierz jednostkę"
          control={control}
          errors={errors}
          validation={{ required: requiredErrorMessage }}
          options={UnitOfMeasure}
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
