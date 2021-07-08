import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Stack, useToast, Text, VStack, NumberInput, NumberInputField, FormLabel } from '@chakra-ui/react';

import { ROUTE_MENU } from 'routing';
import { Product } from 'model/documents/products';

import { requiredErrorMessage } from 'others/form-default-errors';

import FormTemplate from 'components/templates/FormTemplate';
import FormGroupInput from 'components/molecules/FormGroupInput';
import FormGroupSelect from 'components/molecules/FormGroupSelect';
import FormGroupFile from 'components/molecules/FormGroupFileUpload';
import { getAll, getSingle, save } from 'api/firebase/firestore/firestore-actions';
import FormGroupNumber from 'components/molecules/FormGroupNumber';
import { store } from 'api/firebase/storage/storage-actions';
import { firestore } from 'api/firebase/firebase.api';

const ProductForm = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [taxesMap, setTaxesMap] = useState<Record<string, string>>({});
  const [categoriesMap, setCategoriesMap] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    control,
  } = useForm<Product>();

  const toast = useToast();

  // TODO: The following code (to the onSubmit function) can be significantly refactored, without the need for a single tax and additional local states.
  const [grossPrice, setGrossPrice] = useState<number>(0);
  const [taxValue, setTaxValue] = useState<number>(0);

  const taxDoc = (watch('tax') as unknown) as string;
  const netValue = watch('netPrice');
  const overheadValue = watch('overhead');

  const getGrossPrice = (net: number, overhead: number, tax: number) => {
    const gross = net + (net * tax) / 100 + (net * overhead) / 100;
    return gross || 0;
  };

  useEffect(() => {
    setGrossPrice(getGrossPrice(Number(netValue), Number(overheadValue), Number(taxValue)));
  }, [taxValue, netValue, overheadValue]);
  useEffect(() => {
    if (!taxDoc) {
      setTaxValue(0);
      return;
    }
    getSingle('/taxes', taxDoc).then((data) => setTaxValue(data?.value as number));
  }, [taxDoc]);

  const onSubmit: SubmitHandler<Product> = (data) => {
    const image: File = data.image[0] as File;
    store('products/', image, async (url) => {
      await save('products', {
        ...data,
        category: firestore.doc(`categories/${data.category}`),
        tax: firestore.doc(`taxes/${taxDoc}`),
        grossPrice,
        image: url,
      });
      setIsSubmitted(true);
      toast({
        title: 'Artykuł dodany 🙌',
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
    <FormTemplate onSubmit={handleSubmit(onSubmit)}>
      {isSubmitted ? <Redirect to={ROUTE_MENU.PRODUCTS.path} /> : null}
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
        errors={errors}
        validation={{ required: requiredErrorMessage }}
        options={categoriesMap}
        control={control}
      />
      <FormGroupSelect
        label="Podatek"
        id="tax"
        name="tax"
        placeholder="Wybierz podatek"
        errors={errors}
        validation={{ required: requiredErrorMessage }}
        options={taxesMap}
        control={control}
      />
      {/* TODO: Code in the following div for future refactoring (separating into a separate component, e.g. FormGroupCalculatePrice). */}
      <div>
        <Text fontSize="lg" fontWeight="bold" pb="5" textAlign="center" color="gray.700">
          💰 Cena artykułu
        </Text>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          alignItems={{ base: 'center', lg: 'flex-end' }}
          justifyContent="center"
        >
          <VStack>
            <FormGroupNumber
              label="Cena netto (zł)"
              id="netPrice"
              name="netPrice"
              register={register}
              errors={errors}
              validation={{ required: requiredErrorMessage }}
            />
          </VStack>
          <VStack>
            <FormGroupNumber
              label="Narzut / marża (%)"
              id="overhead"
              name="overhead"
              register={register}
              errors={errors}
              validation={{ required: requiredErrorMessage }}
            />
          </VStack>
          <VStack>
            <FormLabel fontSize="sm" fontWeight="md" color="gray.700">
              Podatek (%)
            </FormLabel>
            <NumberInput value={taxValue} isReadOnly>
              <NumberInputField />
            </NumberInput>
          </VStack>
          <VStack>
            <FormLabel fontSize="sm" fontWeight="md" color="gray.700">
              Kwota całkowita (zł)
            </FormLabel>
            <NumberInput size="md" value={grossPrice} min={0} precision={2} isReadOnly>
              <NumberInputField />
            </NumberInput>
          </VStack>
        </Stack>
      </div>
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
