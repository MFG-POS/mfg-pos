import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, useToast } from '@chakra-ui/react';

import { ROUTE_MENU } from 'routing';
import { Product } from 'model/documents/products';

import { requiredErrorMessage } from 'others/form-default-errors';

import FormTemplate from 'components/templates/FormTemplate';
import FormGroupInput from 'components/molecules/FormGroupInput';
import FormGroupSelect from 'components/molecules/FormGroupSelect';
import FormGroupProductPrice from 'components/molecules/FormGroupProductPrice';
import FormGroupFile from 'components/molecules/FormGroupFileUpload';

const ProductForm = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Product>();

  const taxValue = watch('tax');

  /*
   * TODO: Placeholder function, will be replaced with real API request later
   */
  const onSubmit: SubmitHandler<Product> = (data) =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsSubmitted(true);
        toast({
          title: 'Artykuł dodany 🙌',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom-right',
        });
        console.log(`Zapisana artykuł: ${data}`);
        resolve();
      }, 2000);
    });

  /*
   * TODO: To be replaced with DB data
   */
  const MOCK_TAX_OPTIONS = ['PTU 8%', 'PTU 22%', 'PTU 23%'];
  const MOCK_CATEGORY_OPTIONS = ['Śniadania', 'Obiady', 'Pizza', 'Makarony'];

  return (
    <FormTemplate onSubmit={handleSubmit(onSubmit)}>
      {isSubmitted ? <Redirect to={ROUTE_MENU.PRODUCT.path} /> : null}
      <FormGroupInput
        label="Artykuł"
        id="name"
        type="text"
        name="name"
        register={register}
        errors={errors}
        validation={{ required: requiredErrorMessage }}
      />
      <FormGroupSelect
        label="Kategoria"
        id="category"
        name="category"
        placeholder="Wybierz kategorię"
        register={register}
        errors={errors}
        validation={{ required: requiredErrorMessage }}
        options={MOCK_CATEGORY_OPTIONS}
      />
      <FormGroupSelect
        label="Podatek"
        id="tax"
        name="tax"
        placeholder="Wybierz podatek"
        register={register}
        errors={errors}
        validation={{ required: requiredErrorMessage }}
        options={MOCK_TAX_OPTIONS}
      />
      <FormGroupProductPrice
        id="product"
        name="grossPrice"
        label="Cena artykułu"
        tax={taxValue}
        register={register}
        errors={errors}
        validation={{ required: requiredErrorMessage }}
      />
      <FormGroupFile
        label="Zdjęcie artykułu"
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
  );
};

export default ProductForm;
