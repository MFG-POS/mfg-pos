import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

type SimpleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  closeCallback: () => void;
  content: React.ReactNode;
};

const SimpleModal = ({ isOpen, onClose, header, closeCallback, content }: SimpleModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{header}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>{content}</ModalBody>

      <ModalFooter>
        <Button
          colorScheme="green"
          mr={3}
          onClick={() => {
            closeCallback();
            onClose();
          }}
        >
          POTWIERDŹ
        </Button>
        <Button variant="outline" onClick={onClose}>
          ANULUJ
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default SimpleModal;
