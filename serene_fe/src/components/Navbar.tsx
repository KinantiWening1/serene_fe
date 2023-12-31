import {
    Box,
    Flex,
    Spacer,
    Text,
    Link,
    Image,
    Button,
  } from "@chakra-ui/react";
  import { Link as RouterLink } from "react-router-dom";
  import Logo from '../assets/logo_horizontal.svg';
  import Logout from '../components/Logout'

  
  export default function Navbar(props: { status: string; } ){
    const isAdmin =  (props.status == "admin"); 
    const isUser =  (props.status == "user"); 
    const isPublic =  (props.status == "public"); 
    const customButtonStyle = {
      backgroundColor: '#6878F4', 
      color: 'white',        
    };
    return (
        <Box
          bg="#050A30"
          color="#F4F6FC"
          p={4}
          fontSize="lg"
          fontWeight="bold"
          display={{ md: "flex" }}
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          maxWidth="100%"
          marginX="auto"
          position="relative"
        >
          <Image
            src={Logo}
            alt="Logo"
            boxSize={40}
            h={12}
            objectFit="contain"
          />
  
          {/* Links */}
          <Flex display={{ base: "none", md: "flex" }}>
          {
              isPublic && 
            <Box
              mx={10}
              position="relative"
              fontWeight="bold"
              padding= '10px'
              style={{ whiteSpace: 'nowrap' }}
              _hover={{
                color: 'blue',
                bgColor: '#F4F6FC',
                rounded: 'md',
              }}
            >
              <Link
                fontSize="md"
                fontWeight="bold" 
                _hover={{
                  color: 'white',
                }}
                as={RouterLink} to="/"
              >
                Beranda
              </Link>
            </Box>
            }
  
            {
              (isAdmin || isPublic || isUser) && (
              <Box
                mx={10}
                position="relative"
                fontWeight="bold"
                rounded="md"
                padding="10px"
                style={{ whiteSpace: 'nowrap' }}
                  _hover={{
                  color: 'blue',
                  bgColor: '#F4F6FC',
                }}
              >
                <Link
                  fontSize="md"
                  fontWeight="bold"
                  _hover={{
                    textColor: 'blue',
                  }}
                  as={RouterLink}
                  to="https://ca-sereneapp.braveisland-f409e30d.southeastasia.azurecontainerapps.io/docs"
                  target="_blank"  // Opens the link in a new tab/window
                >
                  Dokumentasi
                </Link>
              </Box>
              )
            }
  
            {
              isAdmin &&
              <Box
                mx={10}
                position="relative"
                fontWeight="bold"
                rounded='md'
                padding='10px'
                style={{ whiteSpace: 'nowrap' }}
                _hover={{
                  color: 'blue',
                  bgColor: '#F4F6FC',
                }}
              >
                <Link
                  fontSize="md"
                  fontWeight="bold"
                  _hover={{
                    color: 'blue',
                  }}
                  as={RouterLink} to="/userdata"
                >
                  Data User
                </Link>
              </Box>
            }
  
            {
              isAdmin &&
              <Box
                mx={10}
                position="relative"
                fontWeight="bold"
                rounded='md'
                padding='10px'
                style={{ whiteSpace: 'nowrap' }}
                _hover={{
                  color: 'blue',
                  bgColor: '#F4F6FC',
                }}
              >
                <Link
                  fontSize="md"
                  fontWeight="bold"
                  _hover={{
                    color: 'blue',
                  }}
                  as={RouterLink} to="/bookingdata"
                >
                  Data Psychologist
                </Link>
              </Box>
            }

            {
              isAdmin &&
              <Box
                mx={10}
                position="relative"
                fontWeight="bold"
                rounded='md'
                padding='10px'
                style={{ whiteSpace: 'nowrap' }}
                _hover={{
                  color: 'blue',
                  bgColor: '#F4F6FC',
                }}
              >
                <Link
                  fontSize="md"
                  fontWeight="bold"
                  _hover={{
                    color: 'blue',
                  }}
                  as={RouterLink} to="/appdata"
                >
                  Data Appointment
                </Link>
              </Box>
            }

            {
              isUser &&
              <Box
                mx={10}
                position="relative"
                fontWeight="bold"
                rounded='md'
                padding='10px'
                style={{ whiteSpace: 'nowrap' }}
                _hover={{
                  color: 'blue',
                  bgColor: '#F4F6FC',
                }}
              >
                <Link
                  fontSize="md"
                  fontWeight="bold"
                  _hover={{
                    color: 'blue',
                  }}
                  as={RouterLink} to="/apppage"
                >
                  Appointments
                </Link>
              </Box>
            }

            {
              isUser &&
              <Box
                mx={10}
                position="relative"
                fontWeight="bold"
                rounded='md'
                padding='10px'
                style={{ whiteSpace: 'nowrap' }}
                _hover={{
                  color: 'blue',
                  bgColor: '#F4F6FC',
                }}
              >
                <Link
                  fontSize="md"
                  fontWeight="bold"
                  _hover={{
                    color: 'blue',
                  }}
                  as={RouterLink} to="/moviespage"
                >
                  Movie Recommendations
                </Link>
              </Box>
            }

          </Flex>
  
          <Spacer mx={5} />
            
          {/* Admin Greeting */}
  
          { isAdmin &&
          <Flex alignItems="center">
            <Text mr={4} fontWeight="bold" fontSize="md" style={{ whiteSpace: 'nowrap' }}>
              Hi, Admin
              </Text>
            <Spacer mx={2} />
          </Flex>
          }

          { isAdmin && <Logout/>}
          { isUser && <Logout/>}
          { isPublic && 
            <Button colorScheme="blue" mr={3} as={RouterLink} to="/login" style={customButtonStyle}>
              Login
            </Button>
          }
        </Box>
    );
  };