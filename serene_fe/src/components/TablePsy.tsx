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
  
  interface TablePsyProps {
    psyMatch : any
  }
  
  const TablePsy: React.FC<TablePsyProps> = ({ psyMatch }) => {
    
    console.log(psyMatch)
    console.log(typeof psyMatch)
    
    if (!psyMatch || !psyMatch.psychologist) {
        // Handle the case where psyMatch is missing or psychologist data is missing
        return (
          <>
            <Spacer mx={10} />
            <Center h="50vh"> {/* Center vertically */}
              <Text fontSize={24} color="gray.500">
                No matched psychologists
              </Text>
            </Center>
          </>
        );
    }

    const psychologist = psyMatch.psychologist;
  
    return (
      <ChakraProvider>
        <Table variant="striped" colorScheme="gray" size="lg" bg="white" borderRadius="lg">
          <Thead>
            <Tr>
              <Th minW="20px">Psychologist ID</Th>
              <Th minW="100px">Name</Th>
              <Th minW="100px">Qualifications</Th>
              <Th minW="100px">Specialty</Th>
              <Th minW="100px">Availability</Th>
            </Tr>
          </Thead>
          <Tbody>
              <Tr key={psychologist.psychologist_id}>
                <Td>{psychologist.psychologist_id}</Td>
                <Td>{psychologist.name}</Td>
                <Td>{psychologist.qualifications}</Td>
                <Td>{psychologist.specialty}</Td>
                <Td>{psychologist.availability}</Td>
              </Tr>
          </Tbody>
        </Table>
      </ChakraProvider>
    );
  };
  
  export default TablePsy;
  