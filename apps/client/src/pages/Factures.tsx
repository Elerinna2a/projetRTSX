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
import { Facture } from "../store/facture.store";

export default function Factures() {
  const [factures, setFactures] = useState<Facture[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/facturs")
      .then((res) => setFactures(res.data))
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
        .delete(`http://localhost:3000/factures/${idToDelete}`)
        .then(() => {
          const updatedFactures = factures.filter(
            (factures) => factures.idFacture !== idToDelete
          );
          setFactures(updatedFactures);
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
          <Flex gap={3} justifyContent={"center"} mb={4}>
            <Heading>Factures </Heading>
            <Link to="/create-Factures">
              <Button leftIcon={<AddIcon />} colorScheme="teal">
                Créer une facture
              </Button>
            </Link>
          </Flex>

          {factures.length === 0 ? (
            <p>Aucun Factures à faire</p>
          ) : (
            <Flex flexWrap={"wrap"} gap={4}>
              {factures.map((factures) => (
                <Flex key={factures.idFacture}>
                  <Flex mb={"4"} border={"1px solid gray"} p={"4"}>
                    <Flex alignItems={"center"} gap={4} justifyContent="center">
                      <Flex>
                        <Box>
                          <Heading size={"md"} mb={4}>
                            <Link to={`/factures/${factures.idFacture}`}>
                              factures N°{factures.idFacture}
                            </Link>
                          </Heading>
                          <Box>
                            <p>
                              {" "}
                              <strong>Date</strong> : {factures.dateFacture}{" "}
                            </p>
                            <p> Montant : {factures.montant} €</p>
                          </Box>
                        </Box>
                      </Flex>
                      <Flex gap={"4"} flexDirection="column">
                        <Button ml={6}>
                          <EditIcon />
                        </Button>
                        <Button
                          ml={6}
                          onClick={() => handleDelete(factures.idFacture)}
                        >
                          <DeleteIcon />
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
