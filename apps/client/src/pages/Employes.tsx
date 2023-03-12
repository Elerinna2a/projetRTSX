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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Employe } from "../store/employe.store";

export default function Employes() {
  const [employes, setEmployes] = useState<Employe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/employes")
      .then((res) => setEmployes(res.data))
      .catch((err) =>
        setError(
          "Impssible d'acceder a cette page car vos droit ne le permettant pas"
        )
      );
  }, []);

  const f = new Intl.DateTimeFormat("fr-fr", {
    dateStyle: "short",
    timeStyle: "short",
  });

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
        .delete(`http://localhost:3000/employes/${idToDelete}`)
        .then(() => {
          const updatedEmployes = employes.filter(
            (employe) => employe.id !== idToDelete
          );
          setEmployes(updatedEmployes);
          setIdToDelete(null);
          onClose();
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <Flex>
        <Box>
          <Flex gap={3} justifyContent={"center"} mb={4}>
            <Heading>Employes </Heading>
            <Link to="/create-employe">
              <Button>
                <AddIcon />
              </Button>
            </Link>
          </Flex>

          {employes.length === 0 ? (
            <>
              <Text>Voulez vous en créer un ?</Text>
              <AddIcon />
            </>
          ) : (
            <>
              {employes.map((employe) => (
                <div key={employe.id}>
                  <Flex mb={"4"} border={"1px solid gray"} p={"4"}>
                    <Flex alignItems={"center"} gap={4} justifyContent="center">
                      <Flex>
                        <Box>
                          <Heading size={"md"} mb={4}>
                            <Link to={`/employes/${employe.id}`}>
                              employe N°
                              {employe.id}
                            </Link>
                          </Heading>
                          <Box>
                            <Text>Nom : {employe.nom} </Text>
                            <Text>Prénom : {employe.prenom} </Text>
                            <Text>Role : {employe.role} </Text>
                          </Box>
                        </Box>
                      </Flex>
                      <Flex gap={"4"} flexDirection="column">
                        <Button ml={6}>
                          <EditIcon />
                        </Button>
                        <Button ml={6} onClick={() => handleDelete(employe.id)}>
                          <DeleteIcon />
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                </div>
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
