import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, useToast } from '@chakra-ui/react';

import { ROUTE_MENU } from 'routing';

import { Category } from 'model/documents/category';

import FormTemplate from 'components/templates/FormTemplate';
import FormGroupInput from 'components/molecules/FormGroupInput';
import FormGroupSelect from 'components/molecules/FormGroupSelect';
import FormGroupFile from 'components/molecules/FormGroupFileUpload';

const CategoryForm = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Category>();

  /*
   * TODO: Placeholder function, will be replaced with real API request later
   */
  const onSubmit: SubmitHandler<Category> = (data) =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsSubmitted(true);
        toast({
          title: 'Kategoria dodana 🙌',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom-right',
        });
        console.log(`Zapisana kategoria: ${data}`);
        resolve();
      }, 2000);
    });

  /*
   * TODO: To be replaced with DB data
   */
  const MOCK_TAX_OPTIONS = ['PTU 8%', 'PTU 22%', 'PTU 23%'];
  const MOCK_CATEGORY_OPTIONS = ['Śniadania', 'Obiady', 'Pizza', 'Makarony'];

  return (
    <>
      <FormTemplate onSubmit={handleSubmit(onSubmit)}>
        {isSubmitted ? <Redirect to={ROUTE_MENU.CATEGORIES.path} /> : null}
        <FormGroupInput
          type="text"
          label="Kategoria"
          id="name"
          name="name"
          register={register}
          errors={errors}
          validation={{ required: 'To pole jest wymagane' }}
        />
        <FormGroupSelect
          label="Kategoria nadrzędna (opcjonalne)"
          id="parent-category"
          name="parent"
          placeholder="Wybierz kategorię nadrzędną"
          register={register}
          errors={errors}
          validation={{}}
          options={MOCK_CATEGORY_OPTIONS}
        />
        <FormGroupSelect
          label="Podatek kategorii (opcjonalne)"
          id="tax"
          name="tax"
          placeholder="Wybierz podatek dla produktów w kategorii"
          register={register}
          errors={errors}
          validation={{}}
          options={MOCK_TAX_OPTIONS}
        />
        <FormGroupFile
          label="Zdjęcie kategorii"
          id="image"
          name="image"
          register={register}
          errors={errors}
          validation={{ required: 'To pole jest wymagane' }}
        />
        <Button isLoading={isSubmitting} type="submit" colorScheme="green" variant="solid" alignSelf="flex-start">
          Zapisz
        </Button>
      </FormTemplate>
    </>
  );
};

export default CategoryForm;
