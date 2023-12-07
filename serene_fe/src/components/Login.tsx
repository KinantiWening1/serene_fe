import { useState } from "react";
import {
  Flex,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  FormControl,
  Image,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo_vertikal.svg";
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function Login() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleLogin = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://ca-sereneapp.braveisland-f409e30d.southeastasia.azurecontainerapps.io/auth/token',
        `grant_type=password&username=${username}&password=${password}&scope=&client_id=&client_secret=`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      // Assuming the response contains an access token
      const accessToken = response.data.access_token;

      login(accessToken); // Store the token in the context
    console.log(username)
    console.log(accessToken)
      const userResponse = await axios.get(`https://ca-sereneapp.braveisland-f409e30d.southeastasia.azurecontainerapps.io/user/${username}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

    // Assuming the user data response contains a 'tags' property
    const userTags = userResponse.data.tags;
    console.log(userResponse.data)

    // Redirect based on user's tags
    if (userTags === "regular") {
      navigate('/apppage');
    } else if (userTags === "admin") {
      navigate('/userdata');
    }

      // Display a success toast
      toast({
        title: 'Login Successful',
        description: 'You have successfully logged in.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Redirect or perform other actions as needed
    } catch (error) {
      // Display an error toast
      toast({
        title: 'Login Failed',
        description: 'Invalid username or password.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });

      console.error('Login error:', error);
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={Logo} width={60} />
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleLogin}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="purple"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
