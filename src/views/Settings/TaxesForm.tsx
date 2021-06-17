import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, useToast } from '@chakra-ui/react';

import { ROUTE_SETTINGS } from 'routing';

import { Tax } from 'model/documents/tax';

import { requiredErrorMessage } from 'others/form-default-errors';

import FormTemplate from 'components/templates/FormTemplate';
import FormGroupInput from 'components/molecules/FormGroupInput';
import FormGroupSelect from 'components/molecules/FormGroupSelect';
import FormGroupNumber from 'components/molecules/FormGroupNumber';
import FormGroupCheckbox from 'components/molecules/FormGroupCheckbox';
import { saveAll } from 'api/firebase/firestore/firestore-actions';

const TaxesForm = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Tax>();

  const onSubmit: SubmitHandler<Tax> = (data: Tax) => {
    saveAll('taxes', data).then((ref) => {
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

  const TAX_OPTIONS = ['Wartość dodana (VAT)', 'Z obrotu'];

  return (
    <>
      <FormTemplate onSubmit={handleSubmit(onSubmit)}>
        {isSubmitted ? <Redirect to={ROUTE_SETTINGS.TAXES.path} /> : null}
        <FormGroupInput
          type="text"
          label="Podatek"
          id="name"
          name="name"
          register={register}
          errors={errors}
          validation={{ required: requiredErrorMessage }}
        />
        <FormGroupNumber
          label="Procent opodatkowania"
          id="value"
          name="value"
          register={register}
          errors={errors}
          validation={{ required: requiredErrorMessage }}
        />

        <FormGroupCheckbox
          label="Czy jest fiskalny?"
          id="isFiscal"
          name="isFiscal"
          register={register}
          errors={errors}
          validation={{}}
        />

        <FormGroupSelect
          label="Rodzaj podatku"
          id="taxType"
          name="taxType"
          placeholder="Wybierz rodzaj podatku"
          register={register}
          errors={errors}
          validation={{ required: requiredErrorMessage }}
          options={TAX_OPTIONS}
        />
        <Button isLoading={isSubmitting} type="submit" colorScheme="green" variant="solid" alignSelf="flex-start">
          Zapisz
        </Button>
      </FormTemplate>
    </>
  );
};

export default TaxesForm;
