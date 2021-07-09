import { Box, Container, Grid, Input, Wrap, WrapItem } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import AddChefButtons from 'components/molecules/Employees/Chef/AddChefButtons/index';
import breakpointsFontSize from 'components/molecules/Employees/styled/breakpointsFontSize';

const AddChefData = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    nameChef: string;
  }>();

  const onSubmit = (data: Object) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Wrap w="50%" h="4em" margin="0 auto">
          <WrapItem w="100%">
            <Box w="100%" borderTop="1px" borderColor="gray.300" />
          </WrapItem>
          <WrapItem h="4em" w="100%" minWidth="28em">
            <Grid templateColumns="repeat(2, 1fr)" gap={2} w="100%">
              <Container px="2em" py="0.2em" fontWeight="Bold">
                Imię i Nazwisko
              </Container>
              <Box>
                <Input
                  border="1px"
                  borderRadius="2em"
                  borderColor="gray.300"
                  {...register('nameChef', { required: 'Wprowadź imię oraz nazwisko' })}
                />
                {errors.nameChef && (
                  <Box fontSize={breakpointsFontSize} color="red">
                    {errors.nameChef.message}
                  </Box>
                )}
              </Box>
            </Grid>
          </WrapItem>
          <WrapItem w="100%">
            <Box w="100%" borderTop="1px" borderColor="gray.300" />
          </WrapItem>
          <WrapItem>
            <AddChefButtons />
          </WrapItem>
        </Wrap>
      </Box>
    </form>
  );
};

export default AddChefData;
