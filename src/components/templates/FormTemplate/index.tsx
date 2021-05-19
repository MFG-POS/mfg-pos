import { Stack } from '@chakra-ui/react';

type FormTemplateProps = {
  readonly children: React.ReactNode;
  onSubmit: (e?: React.BaseSyntheticEvent<object> | undefined) => Promise<void>;
};

const FormTemplate = ({ children, onSubmit }: FormTemplateProps) => (
  <Stack alignItems="center" minHeight="100vh" w="100%" bg="gray.100" p="10">
    <Stack
      as="form"
      w={['90%', null, '80%', '65%']}
      spacing="6"
      shadow="base"
      rounded="md"
      p={{ sm: 6 }}
      onSubmit={onSubmit}
      bg="white"
    >
      {children}
    </Stack>
  </Stack>
);

export default FormTemplate;
