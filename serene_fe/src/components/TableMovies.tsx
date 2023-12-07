import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ChakraProvider,
  Spacer,
  Center,
  Text
} from '@chakra-ui/react';

interface TableMoviesProps {
  movieRecommendations: {
    recommendations: Array<{
      movie_id: number;
      title: string;
    }>;
  };
}

const TableMovies: React.FC<TableMoviesProps> = ({ movieRecommendations }) => {
  console.log(movieRecommendations)
  const recommendationsArray = movieRecommendations.recommendations;
  
  if (
    !Array.isArray(recommendationsArray) ||
    recommendationsArray.length === 0
  ) {
    // Handle the case where recommendationsArray is not an array or is empty
    console.log('panjangnya nol');
    return (
      <>
        <Spacer mx={10} />
        <Center h="50vh"> {/* Center vertically */}
          <Text fontSize={24} color="gray.500">
            No generated recommendations
          </Text>
        </Center>
      </>
    );
  }

  return (
    <ChakraProvider>
      <Table variant="striped" colorScheme="gray" size="lg" bg="white" borderRadius="lg">
        <Thead>
          <Tr>
            <Th minW="20px">Movie ID</Th>
            <Th minW="200px">Title</Th>
          </Tr>
        </Thead>
        <Tbody>
          {recommendationsArray.map((item: any) => (
            <Tr key={item.movie_id}>
              <Td>{item.movie_id}</Td>
              <Td>{item.title}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </ChakraProvider>
  );
};

export default TableMovies;
