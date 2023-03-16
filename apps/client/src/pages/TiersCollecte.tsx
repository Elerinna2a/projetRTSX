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
import { TierCollecte } from "../store/tierCollecte.store";

export default function TiersCollecte() {
  const [tierCollectes, setTierCollectes] = useState<TierCollecte[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/tierscollectes")
      .then((res) => setTierCollectes(res.data))
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
        .delete(`http://localhost:3000/tierscollectes/${idToDelete}`)
        .then(() => {
          const updatedTierCollectes = tierCollectes.filter(
            (tierCollecte) => tierCollecte.idTierCollecte !== idToDelete
          );
          setTierCollectes(updatedTierCollectes);
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
          <Flex gap={3} justifyContent={"center"} mb={4}>
            <Heading>Tiers Collecte </Heading>
            <Link to="/create-collecte">
              <Button leftIcon={<AddIcon />} colorScheme="teal">
                Crée un tiers
              </Button>
            </Link>
          </Flex>

          {tierCollectes.length === 0 ? (
            <p>Aucun collecte à faire</p>
          ) : (
            <>
              {tierCollectes.map((tierCollecte) => (
                <div key={tierCollecte.idTierCollecte}>
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
                            <Link
                              to={`/collecte/${tierCollecte.idTierCollecte}`}
                            >
                              Tier Collecte N°{tierCollecte.idTierCollecte}
                            </Link>
                          </Heading>
                          <Box>
                            <p>
                              {" "}
                              <strong>Nom du tiers : </strong>{" "}
                              {tierCollecte.nom}{" "}
                            </p>
                            <p>
                              {" "}
                              Score de facilité d'accès :{" "}
                              {tierCollecte.scoringFacilite}
                            </p>
                            <p> Type de tiers :{tierCollecte.typeEntreprise}</p>
                          </Box>
                        </Box>
                      </Flex>
                      <Flex gap={"4"} flexDirection="column">
                        <Button ml={6}>
                          <EditIcon />
                        </Button>
                        <Button
                          ml={6}
                          onClick={() =>
                            handleDelete(tierCollecte.idTierCollecte)
                          }
                        >
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
