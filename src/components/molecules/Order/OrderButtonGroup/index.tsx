import { Button, ButtonGroup, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type OrderButtonGroupProps = {
  submitIcon: IconType;
  submitText: string;
  cancelIcon: IconType;
  cancelText: string;
  hideSubmit?: boolean;
  onSubmitClick?: () => void;
  onCancelClick?: () => void;
};

const OrderButtonGroup = ({
  submitIcon,
  submitText,
  cancelIcon,
  cancelText,
  hideSubmit,
  onSubmitClick,
  onCancelClick,
}: OrderButtonGroupProps) => (
  <ButtonGroup
    display="flex"
    flexDirection="row"
    justifyContent="space-around"
    variant="solid"
    borderColor="gray.100"
    borderRadius="12px"
    borderWidth="1px"
    py="3"
    my="2"
  >
    {!hideSubmit && (
      <Button type="submit" variant="solid" colorScheme="green" onClick={onSubmitClick}>
        <Icon as={submitIcon} /> <Text ml="2">{submitText}</Text>
      </Button>
    )}
    <Button onClick={onCancelClick}>
      <Icon as={cancelIcon} /> <Text ml="2">{cancelText}</Text>
    </Button>
  </ButtonGroup>
);

export default OrderButtonGroup;
