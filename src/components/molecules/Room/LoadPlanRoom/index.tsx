import { Box, Text } from '@chakra-ui/react';
import { RowType } from 'model/tableDND/row-type';
import { TableType } from 'model/tableDND/table-types';

let value: string = '0';

const Load = ({ id, left, top, height, width, borderRadius, text }: TableType & RowType) => (
  <Box
    zIndex="1"
    color="white"
    position="absolute"
    float="left"
    h="0"
    width={width}
    height={height * 2}
    left={left}
    top={top}
  >
    <Text
      id={id}
      borderRadius={borderRadius}
      textAlign="center"
      backgroundColor="#454545"
      h="100%"
      zIndex="1"
      maxH="80px"
      paddingTop="25px"
      focusBorderColor="none"
      maxLength={2}
      color="white"
      onClick={() => {
        // @ts-ignore: Object is possibly 'null'.
        document.getElementById('confirmationView').style.visibility = 'visible';
        value = id;
      }}
    >
      {text}
    </Text>
  </Box>
);

export const GetId = () => {
  console.log(value);
  return value;
};

export default Load;
