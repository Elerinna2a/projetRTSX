import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tournee } from "../types/tournee.type";

export default function Tournees() {
  const [tournees, setTournees] = useState<Tournee[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  const handleDelete = (id: number | undefined) => {
    if (id) {
      setIdToDelete(id);
      onOpen();
    } else {
      console.log("id to delete is undefined");
    }
  };

  const confirmDelete = () => {
    if (idToDelete) {
      axios
        .delete(`http://localhost:3000/tournees/${idToDelete}`)
        .then(() => {
          const updatedTournee = tournees.filter(
            (tournee) => tournee.idTournee !== idToDelete
          );
          setTournees(updatedTournee);
          setIdToDelete(null);
          onClose();
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/tournees")
      .then((res) => {
        setTournees(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div>
      <Flex>
        <Box>
          <Flex gap={3} justifyContent={"center"} mb={4}>
            <Heading>Tournées </Heading>
            <Link to="/create-tournee">
              <Button leftIcon={<AddIcon />} colorScheme="teal">
                Créer une tournée
              </Button>
            </Link>
          </Flex>

          {tournees.length === 0 ? (
            <p>Aucun tournee à faire</p>
          ) : (
            <>
              {tournees.map((tournee) => (
                <Flex key={tournee.idTournee}>
                  <Flex
                    mb={"4"}
                    border={"1px solid gray"}
                    p={"4"}
                    borderRadius={"xl"}
                    borderColor="teal"
                  >
                    <Flex alignItems={"center"} gap={4} justifyContent="center">
                      <Flex>
                        <Box>
                          <Heading size={"md"} mb={4}>
                            Collecte N°{tournee.idTournee}
                          </Heading>
                          <Box>
                            <p>
                              {" "}
                              <strong>Date</strong> : {tournee.dateTournee}{" "}
                            </p>
                            <p> Véhicule : {tournee.typeVehicule}</p>
                            <p> Remorque : {tournee.remorque}</p>
                          </Box>
                        </Box>
                      </Flex>
                      <Flex gap={"4"} flexDirection="column">
                        <Button ml={6}>
                          <EditIcon color="teal" />
                        </Button>
                        <Button
                          ml={6}
                          onClick={() => handleDelete(tournee.idTournee)}
                        >
                          <DeleteIcon color="crimson" />
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              ))}
            </>
          )}
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmer la suppression</ModalHeader>
          <ModalBody>
            Êtes-vous sûr de vouloir supprimer cet employé ?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={confirmDelete}>
              Supprimer
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Annuler
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
