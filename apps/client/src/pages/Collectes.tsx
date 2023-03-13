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
import { Collecte as Collectes } from "../store/collecte.store";

export default function Collecte() {
  const [collectes, setCollectes] = useState<Collectes[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/collectes")
      .then((res) => setCollectes(res.data))
      .catch((err) =>
        setError(
          "Impssible d'acceder a cette page car vos droit ne le permettant pas"
        )
      );
  }, []);

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
        .delete(`http://localhost:3000/collectes/${idToDelete}`)
        .then(() => {
          const updatedCollecte = collectes.filter(
            (collecte) => collecte.idNumLot !== idToDelete
          );
          setCollectes(updatedCollecte);
          setIdToDelete(null);
          onClose();
        })
        .catch((err) => console.error(err));
    }
  };

  const f = new Intl.DateTimeFormat("fr-fr", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <div>
      <Flex justifyContent={"center"}>
        <Box>
          <Flex gap={3} mb={4}>
            <Heading>Collecte </Heading>
            <Link to="/create-collecte">
              <Button leftIcon={<AddIcon />} colorScheme="teal">
                Créer une collecte
              </Button>
            </Link>
          </Flex>
          {collectes.length === 0 ? (
            <p>Aucun collecte à faire</p>
          ) : (
            <Flex flexWrap={"wrap"} gap={4}>
              {collectes.map((collecte) => (
                <Flex key={collecte.idNumLot}>
                  <Flex
                    mb={"4"}
                    border={"1px solid gray"}
                    p={"4"}
                    borderColor="teal"
                    borderRadius={"xl"}
                  >
                    <Flex alignItems={"center"} gap={4} justifyContent="center">
                      <Flex>
                        <Box>
                          <Heading size={"md"} mb={4}>
                            <Link to={`/collecte/${collecte.idNumLot}`}>
                              Collecte N°{collecte.idNumLot}
                            </Link>
                          </Heading>
                          <Box>
                            <p>
                              {" "}
                              <strong>Date</strong> : {collecte.dateCollecte}{" "}
                            </p>
                            <p>
                              {" "}
                              <strong>Quantité</strong> : {collecte.quantite} KG
                            </p>
                            <p>
                              {" "}
                              <strong>Forme</strong> :{collecte.formeCollecte}
                            </p>
                            <p>
                              <strong>Collecte fait par l'ID </strong>:
                              <Link to={`/employes/${collecte.employeId}`}>
                                {collecte.employeId}
                              </Link>
                            </p>
                          </Box>
                        </Box>
                      </Flex>
                      <Flex gap={"4"} flexDirection="column">
                        <Button ml={6}>
                          <EditIcon color={"teal"} />
                        </Button>
                        <Button
                          ml={6}
                          onClick={() => handleDelete(collecte.idNumLot)}
                        >
                          <DeleteIcon color={"crimson"} />
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              ))}
            </Flex>
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
