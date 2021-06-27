import { Box, Text, NumberInput, ButtonGroup, Button, NumberInputField } from '@chakra-ui/react';
import { useState } from 'react';
import { GetId } from 'components/molecules/Room/LoadPlanRoom/index';

const Alert = () => {
  let [value] = useState<String>('');

  return (
    <Box id="confirmationView" zIndex="8" position="relative" visibility="hidden" w="100%" h="100%" m="0 auto">
      <Box w="20%" h="20%" zIndex="6" position="absolute" m="0 auto" left="40%" top="40%">
        <Text color="white" m="0 auto" w="100%" textAlign="center">
          WSKAŻ ILOŚĆ GOŚCI
        </Text>
        <Box marginTop="2em">
          <NumberInput>
            <NumberInputField
              w="100%"
              textAlign="center"
              focusBorderColor="none"
              autoComplete="off"
              color="white"
              maxLength={2}
              height="2em"
              border="1px"
              borderRadius="2em"
              borderColor="gray.300"
              onChange={(event) => {
                value = event.target.value.toString();
              }}
            />
          </NumberInput>
        </Box>
        <ButtonGroup h="4em" w="100%" variant="outline" spacing="6" left="40%" marginTop="2em">
          <Box minWidth="10%" m="0 auto">
            <Button
              type="submit"
              bg="#33D268"
              h="2em"
              color="white"
              colorScheme="#33D268"
              onClick={() => {
                if (value.length != 0) {
                  console.log({ id: GetId(), sites: value });
                }
              }}
            >
              Dodaj
            </Button>
          </Box>
          <Box minWidth="10%" m="0 auto">
            <Button
              type="submit"
              h="2em"
              bg="white"
              colorScheme="gray"
              onClick={() => {
                // @ts-ignore: Object is possibly 'null'.
                document.getElementById('confirmationView').style.visibility = 'hidden';
              }}
            >
              Anuluj
            </Button>
          </Box>
        </ButtonGroup>
      </Box>
      <Box w="100%" h="100%" bg="#000000" opacity="90%" zIndex="5" position="absolute" />
    </Box>
  );
};

export default Alert;
