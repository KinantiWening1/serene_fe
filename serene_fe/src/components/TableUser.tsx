import { useState } from 'react';
import Delete from "../assets/delete_button.svg";
import Edit from "../assets/edit_button.svg";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  IconButton,
  ChakraProvider
} from '@chakra-ui/react';
import DeleteData from './Deletedata';
import EditData from './Editdatasiswa';
import axios from 'axios';

export default function TableSiswa(props: any) {
  const [isDeleteDataOpen, setIsDeleteDataOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [isEditDataOpen, setIsEditDataOpen] = useState(false);
  const {delStatus, setDelStatus, editStatus, setEditStatus} = props;

  // Function to handle opening the DeleteData modal
  const handleOpenDeleteData = (data: JSON) => {
    setSelectedData(data);
    setIsDeleteDataOpen(true);
  };

  // Function to handle closing the DeleteData modal
  const handleCloseDeleteData = () => {
    setSelectedData(null);
    setIsDeleteDataOpen(false);
  };

  // Function to handle opening the DeleteData modal
  const handleOpenEditData = (data: JSON) => {
    setSelectedData(data);
    setIsEditDataOpen(true);
  };

  // Function to handle closing the DeleteData modal
  const handleCloseEditData = () => {
    setSelectedData(null);
    setIsEditDataOpen(false);
  };

  // Function to handle the deletion of data
  function onDelete() {
    const studentData = selectedData;
    axios.delete(`http://localhost:5000/student/${studentData.idStudent}`)
      .then((res) => {
        setDelStatus(res.data.status);
        console.log(delStatus);
      })
      .catch((error) => {
        console.error("Error deleting student data: ", error);
      });
      handleCloseDeleteData();
  };

  function onEdit(editedData:any) {
    axios
      .put(`http://localhost:5000/student/${editedData.idStudent}`, editedData)
      .then((res) => {
        console.log('PUT Response:', res.data);
  
        if (res.data && res.data.status) {
          setEditStatus(res.data.status);
        } else {
          console.error('Unexpected response format:', res.data);
        }
      })
      .catch((error) => {
        console.error('Error updating student data:', error);
      });
  
    handleCloseEditData();
  }

  return (
    <ChakraProvider>
      <Table variant="striped" colorScheme="gray" size="lg" bg="white" borderRadius="lg">
        <Thead>
          <Tr>
            <Th minW="20px">ID</Th>
            <Th minW="200px">Nama</Th>
            <Th minW="50px">Usia</Th>
            <Th minW="180px">No Telepon</Th>
            <Th minW="80px">Status</Th>
            <Th minW="120px">Kelas</Th>
            <Th minW="200px">Alamat</Th>
            <Th minW="100px">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.data.map((item:any) => (
            <Tr key={item.idStudent}>
              <Td>{item.idStudent}</Td>
              <Td>{item.namaSiswa}</Td>
              <Td>{item.umurSiswa}</Td>
              <Td>{item.noTelpSiswa}</Td>
              <Td>{item.status}</Td>
              <Td>{item.kelasSiswa}</Td>
              <Td>{item.alamatSiswa}</Td>
              <Td>
                <div style={{ display: 'flex' }}>
                  {/* Edit Icon */}
                  <IconButton
                    aria-label="Edit"
                    size="sm"
                    mr={2}
                    onClick={() => handleOpenEditData(item)}
                  >
                    <Image src={Edit} alt="Edit Icon" boxSize={8} />
                  </IconButton>

                  {/* Delete Icon as Image */}
                  <IconButton
                    aria-label="Delete"
                    size="sm"
                    onClick={() => handleOpenDeleteData(item)}
                    mr={2}
                  >
                    <Image src={Delete} alt="Delete Icon" boxSize={8} />
                  </IconButton>

                </div>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

     {/* DeleteData modal */}
     {isDeleteDataOpen && (
        <DeleteData
          disclosure={{
            isOpen: isDeleteDataOpen,
            onOpen: handleOpenDeleteData,
            onClose: handleCloseDeleteData,
          }}
          onDelete={onDelete} 
          />
      )}

      {/* EditData modal */}
      {isEditDataOpen && (
      <EditData
        disclosure={{
          isOpen: isEditDataOpen,
          onOpen: handleOpenEditData,
          onClose: handleCloseEditData,
        }}
        selectedData={selectedData}
        onSave={onEdit} 
        />

      )}

      
    </ChakraProvider>
  );
};
