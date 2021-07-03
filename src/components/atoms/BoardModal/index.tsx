import React, { ChangeEvent, useState } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

type BoardModalProps = {
  id: string;
  updateSeats: (id: string, value: string) => void;
  isOpen: boolean;
  onClose: () => void;
};

const BoardModal = ({ id, updateSeats, isOpen, onClose }: BoardModalProps) => {
  const [value, setValue] = useState('');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Wskaż ilość miejsc</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input isRequired type="number" value={value} onChange={handleChange} placeholder="Ilość miejsc" />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="green"
            mr={3}
            onClick={() => {
              updateSeats(id, value);
              onClose();
            }}
          >
            POTWIERDŹ
          </Button>
          <Button variant="outline">ANULUJ</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BoardModal;
