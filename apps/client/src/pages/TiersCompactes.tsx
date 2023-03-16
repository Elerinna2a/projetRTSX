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
import { TiersCompacte } from "../types/tiersCompacte.type";

export default function TiersCompactes() {
  const [tiersCompactes, setTiersCompactes] = useState<TiersCompacte[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/tierscompactes")
      .then((res) => setTiersCompactes(res.data))
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
        .delete(`http://localhost:3000/tierscompactes/${idToDelete}`)
        .then(() => {
          const updatedTiersCompactes = tiersCompactes.filter(
            (tiersCompacte) => tiersCompacte.idTiersCompacte !== idToDelete
          );
          setTiersCompactes(updatedTiersCompactes);
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
      <Flex>
        <Box>
          <Flex gap={3} alignItems={"center"} mb={4} flexDirection="column">
            <Heading>Tiers Compacteur </Heading>
            <Link to="/create-tierscompacte">
              <Button leftIcon={<AddIcon />} colorScheme={"teal"}>
                Créer un tiers compacteur
              </Button>
            </Link>
          </Flex>

          {tiersCompactes.length === 0 ? (
            <p>Aucun TiersCompactes à faire</p>
          ) : (
            <Flex flexWrap={"wrap"} gap={4}>
              {tiersCompactes.map((tiersCompacte) => (
                <Flex key={tiersCompacte.idTiersCompacte}>
                  <Flex mb={"4"} border={"1px solid gray"} p={"4"}>
                    <Flex alignItems={"center"} gap={4} justifyContent="center">
                      <Flex>
                        <Box>
                          <Heading size={"md"} mb={4}>
                            <Link
                              to={`/tierscompactes/${tiersCompacte.idTiersCompacte}`}
                            >
                              Tiers Compacte N°{tiersCompacte.idTiersCompacte}
                            </Link>
                          </Heading>
                          <Box>
                            <p>Nom: {tiersCompacte.nom} </p>
                            <p>Adresse: {tiersCompacte.adresse} </p>
                            <p>Type: {tiersCompacte.typeTiers} </p>
                            <p>Nom du contact: {tiersCompacte.contactNom} </p>
                            <p>tel: {tiersCompacte.tel} </p>
                            <p>mail: {tiersCompacte.mail} </p>
                            {tiersCompacte.factures ? (
                              <>
                                <p>facture: {tiersCompacte.factures} </p>
                              </>
                            ) : (
                              ""
                            )}
                          </Box>
                        </Box>
                      </Flex>
                      <Flex gap={"4"} flexDirection="column">
                        <Button ml={6} color="teal">
                          <EditIcon />
                        </Button>
                        <Button
                          ml={6}
                          onClick={() =>
                            handleDelete(tiersCompacte.idTiersCompacte)
                          }
                          color={"crimson"}
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
