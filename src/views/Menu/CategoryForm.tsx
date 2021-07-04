import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, useToast } from '@chakra-ui/react';

import { ROUTE_MENU } from 'routing';

import { CategoryWrite } from 'model/documents/category';

import { requiredErrorMessage } from 'others/form-default-errors';

import FormTemplate from 'components/templates/FormTemplate';
import FormGroupInput from 'components/molecules/FormGroupInput';
import FormGroupSelect from 'components/molecules/FormGroupSelect';
import FormGroupFile from 'components/molecules/FormGroupFileUpload';
import { getAll, save } from 'api/firebase/firestore/firestore-actions';
import { store } from 'api/firebase/storage/storage-actions';
import { firestore } from 'api/firebase/firebase.api';

const CategoryForm = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [taxesMap, setTaxesMap] = useState<Record<string, string>>({});
  const [categoriesMap, setCategoriesMap] = useState<Record<string, string>>({});

  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryWrite>();

  const onSubmit: SubmitHandler<CategoryWrite> = (data) => {
    const image: File = data.image[0] as File;
    store('categories/', image, async (url) => {
      await save('categories', {
        ...data,
        parent: firestore.doc(`categories/${data.parent}`),
        tax: firestore.doc(`taxes/${data.tax}`),
        image: url,
      });
      setIsSubmitted(true);
      toast({
        title: 'Podatek dodany 🙌',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
    });
  };

  useEffect(() => {
    getAll('taxes').then((data) =>
      setTaxesMap(
        data.reduce((acc, tax) => ({ ...acc, [tax.id!]: `${tax.name}, ${tax.value}%` }), {}) as Record<string, string>,
      ),
    );

    getAll('categories').then((data) => {
      setCategoriesMap(
        data.reduce((acc, category) => ({ ...acc, [category.id!]: category.name }), {}) as Record<string, string>,
      );
    });
  }, []);

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
          validation={{ required: requiredErrorMessage }}
        />
        <FormGroupSelect
          label="Kategoria nadrzędna (opcjonalne)"
          id="parent-category"
          name="parent"
          placeholder="Wybierz kategorię nadrzędną"
          register={register}
          errors={errors}
          validation={{}}
          options={categoriesMap}
        />
        <FormGroupSelect
          label="Podatek kategorii (opcjonalne)"
          id="tax"
          name="tax"
          placeholder="Wybierz podatek dla produktów w kategorii"
          register={register}
          errors={errors}
          validation={{}}
          options={taxesMap}
        />
        <FormGroupFile
          label="Zdjęcie kategorii"
          id="image"
          name="image"
          register={register}
          errors={errors}
          validation={{ required: requiredErrorMessage }}
        />
        <Button isLoading={isSubmitting} type="submit" colorScheme="green" variant="solid" alignSelf="flex-start">
          Zapisz
        </Button>
      </FormTemplate>
    </>
  );
};

export default CategoryForm;
