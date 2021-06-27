import {
  Button,
  Placement,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

type PopoverProps = {
  header: string;
  triggerText: string;
  variant?: string;
  showFooter?: boolean;
  placement?: Placement;
  readonly body: ReactNode;
  readonly footer: ReactNode;
};

const PopoverTemplate = ({ header, triggerText, variant, showFooter, placement, body, footer }: PopoverProps) => (
  <Popover variant={variant} placement={placement}>
    <PopoverTrigger>
      <Button size="md" variant="outline">
        {triggerText}
      </Button>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverCloseButton />
      <PopoverHeader>{header}</PopoverHeader>
      <PopoverBody>{body}</PopoverBody>
      {showFooter && <PopoverFooter>{footer}</PopoverFooter>}
    </PopoverContent>
  </Popover>
);

export default PopoverTemplate;
