import { useState } from 'react';
import { useDisclosure, Button, HStack, Heading, Spacer} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import TablePsy from '../components/TablePsy';
import SetPreference from '../components/SetPreference'; 
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';


export default function AppPage() {
  const { accessToken } = useAuth();
  const [psyMatch, setPsyMatch] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure(); 

  const handlePsyMatchClick = () => {
    onOpen();
  };

  const handlePsyMatch = async (prefData:any) => {
    try {
      console.log(accessToken)
      const responseUser = await axios.get(`https://ca-sereneapp.braveisland-f409e30d.southeastasia.azurecontainerapps.io/user/active/${accessToken}`,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      console.log(responseUser)
      // Assuming the API response contains the movie recommendations
      const userData = responseUser.data;
      console.log(userData)

      userData['day'] = prefData.day
      userData['preference'] = prefData.preference
      console.log(userData)

      const changedData = await axios.put(`https://ca-sereneapp.braveisland-f409e30d.southeastasia.azurecontainerapps.io/user/`, userData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(changedData.data)
      const schedData = await axios.get(`https://ca-sereneapp.braveisland-f409e30d.southeastasia.azurecontainerapps.io/schedule/${userData['user_id']}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Set the movie recommendations in state
      setPsyMatch(schedData.data);
      console.log(psyMatch);
    } catch (error) {
      console.error('Error fetching psychologist match:', error);
      // Handle the error, e.g., show an error message to the user
    } finally {
      onClose(); // Close the modal after fetching recommendations
    }
  };

  return (
    <>
      <Navbar status="user" />
      <HStack
        mt={8}
        maxW="full"
        alignItems="center"
        justifyContent="space-between"
        marginLeft="6%" 
        marginRight="6%"
      >
        <Heading
          fontWeight={"bold"}
          fontSize={50}
          color="#CF839E"
          whiteSpace={"nowrap"}
          mr={"5%"}
        >
          Find your Psychologist
        </Heading>
        <Spacer mx={12}/>
        <Button
          ml={"5%"}
          aria-label="Pair With Psychologist"
          onClick={handlePsyMatchClick}
          size="lg"
        >
          Pair With Psychologist
        </Button>
      </HStack>
      {isOpen && (
        <SetPreference
          disclosure={{ isOpen, onOpen, onClose }}
          submitFunction={handlePsyMatch}
        />
      )}
      <Spacer my={10}/>
      <TablePsy psyMatch={psyMatch} />
    </>
  );
}
