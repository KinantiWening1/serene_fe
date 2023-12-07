import { useState } from 'react';
import { useDisclosure, Button, HStack, Heading, Spacer} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import TableMovies from '../components/TableMovies';
import PickMood from '../components/PickMood'; 
import axios from 'axios';


export default function MoviesPage() {
  const [movieRecommendations, setMovieRecommendations] = useState({
    recommendations: [],
  });
  
  const { isOpen, onOpen, onClose } = useDisclosure(); 

  const handleGenerateRecommendationClick = () => {
    onOpen();
  };

  const handleMovieRecommendations = async (moodData:any) => {
    try {
      console.log('masuk kesini')
      const loginResponse = await axios.post(
        'https://ca-sereneapp.braveisland-f409e30d.southeastasia.azurecontainerapps.io/auth/token',
        'grant_type=password&username=johndoe&password=password123&scope=&client_id=&client_secret=',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
  
      const accessToken = loginResponse.data.access_token;
      // Make an API call to fetch movie recommendations
      const response = await axios.get(`https://ca-sereneapp.braveisland-f409e30d.southeastasia.azurecontainerapps.io/recommendation/${moodData.mood}/${moodData.max_amount}`,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      // Assuming the API response contains the movie recommendations
      const movieRecommendations = response.data;

      // Set the movie recommendations in state
      setMovieRecommendations(movieRecommendations);
      console.log(movieRecommendations);
    } catch (error) {
      console.error('Error fetching movie recommendations:', error);
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
          Movie Recommendations
        </Heading>
        <Spacer mx={12}/>
        <Button
          ml={"5%"}
          aria-label="Generate Recommendation"
          onClick={handleGenerateRecommendationClick}
          size="lg"
        >
          Generate Recommendation
        </Button>
      </HStack>
      {isOpen && (
        <PickMood
          disclosure={{ isOpen, onOpen, onClose }}
          submitFunction={handleMovieRecommendations}
        />
      )}
      <Spacer my={10}/>
      <TableMovies movieRecommendations={movieRecommendations} />
    </>
  );
}
