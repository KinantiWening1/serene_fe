import React, { useRef, useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  ChakraProvider,
  extendTheme,
} from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: 'Roboto Bold, sans-serif',
  },
});

interface PickMoodProps {
  disclosure: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
  submitFunction: (memberData: any) => void;
}

const SetPreference: React.FC<PickMoodProps> = ({ disclosure, submitFunction }) => {
  const { isOpen, onClose } = disclosure;
  const initialRef = useRef<HTMLInputElement | null>(null);
  const [prefData, setPrefData] = useState({
    day:0,
    preference:''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrefData({ ...prefData, [e.target.name]: e.target.value });
  };

  const submitClose = async () => {
    submitFunction(prefData);
    onClose();
  };
  

  return (
    <ChakraProvider theme={theme}>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontWeight="bold"
            color="#02033B"
            fontFamily="Roboto"
            fontSize="2xl"
            textAlign="center"
          >
            What are your preferences?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4} isRequired>
              <FormLabel>Day Preference</FormLabel>
              <Input ref={initialRef} placeholder="Day Preference" name="day" onChange={handleChange} />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Topic Preference</FormLabel>
              <Input ref={initialRef} placeholder="Topic Preference" name="preference" onChange={handleChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" mr={3} type="submit" onClick={submitClose}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default SetPreference;
