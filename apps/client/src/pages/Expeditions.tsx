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
import { Expedition } from "../types/expedition.type";

export default function Expeditions() {
  const [expeditions, setExpeditions] = useState<Expedition[]>([]);
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
        .delete(`http://localhost:3000/expeditions/${idToDelete}`)
        .then(() => {
          const updatedExpedition = expeditions.filter(
            (expedition) => expedition.idNumBl !== idToDelete
          );
          setExpeditions(updatedExpedition);
          setIdToDelete(null);
          onClose();
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/expeditions")
      .then((res) => {
        setExpeditions(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div>
      <Flex>
        <Box>
          <Flex gap={3} mb={4}>
            <Heading>Expeditions </Heading>
            <Link to="/create-expedition">
              <Button leftIcon={<AddIcon />} colorScheme="teal">
                Créer une expédition
              </Button>
            </Link>
          </Flex>

          <Flex justifyContent={"center"} flexWrap={"wrap"}>
            {expeditions.length === 0 ? (
              ""
            ) : (
              <>
                {expeditions.map((expedition) => (
                  <Flex
                    key={expedition.idNumBl}
                    mb={"4"}
                    border={"1px solid gray"}
                    p={"4"}
                    borderColor="teal"
                    borderRadius={"xl"}
                  >
                    <Flex
                      key={expedition.idNumBl}
                      alignItems={"center"}
                      gap={4}
                      justifyContent="center"
                    >
                      <Flex key={expedition.idNumBl}>
                        <Box>
                          <Heading size={"md"} mb={4}>
                            <Link to={`/expeditions/${expedition.idNumBl}`}>
                              BL N°{expedition.idNumBl}
                            </Link>
                          </Heading>
                          <Box key={expedition.idNumBl}>
                            <Text>
                              <strong> Date d'expédition </strong>:{" "}
                              {expedition.dateExpedition}{" "}
                            </Text>
                            <Text>
                              <strong> Destinataire </strong>:{" "}
                              {expedition.destinataire}{" "}
                            </Text>
                            <Text>
                              <strong> Nom de palette </strong>:{" "}
                              {expedition.nbPalette}{" "}
                            </Text>
                            <Text>
                              <strong>Poids Net total </strong>:{" "}
                              {expedition.poidNetTotal} kg{" "}
                            </Text>
                          </Box>
                        </Box>
                      </Flex>
                      <Flex gap={"4"} flexDirection="column">
                        <Link to={`/update-expedition/${expedition.idNumBl}`}>
                          <Button ml={6}>
                            <EditIcon color="teal" />
                          </Button>
                        </Link>
                        <Button
                          ml={6}
                          onClick={() => handleDelete(expedition.idNumBl)}
                        >
                          <DeleteIcon color="crimson" />
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
              </>
            )}
          </Flex>
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
