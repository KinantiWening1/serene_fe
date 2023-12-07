import React, { useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
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

interface AddUserProps {
  disclosure: {
    isOpen: boolean;
    onClose: () => void;
  };
  submitFunction: (memberData: any) => void;
}

const AddUser: React.FC<AddUserProps> = ({ disclosure, submitFunction }) => {
  const { isOpen, onClose } = disclosure;
  const initialRef = useRef<HTMLInputElement | null>(null);
  const [userData, setUserData] = useState({
    user_id: 0,
    username: '',
    email: '',
    password: '',
    hashed_password: '',
    day: 0,
    preference: '',
    disabled: false,
    tags: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const submitClose = () => {
    submitFunction(userData);
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
            Register Now
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4} isRequired>
              <FormLabel>Username</FormLabel>
              <Input placeholder="Username" name="username" onChange={handleChange} />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Email" name="email" onChange={handleChange} />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Password" name="password" onChange={handleChange} />
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

export default AddUser;
