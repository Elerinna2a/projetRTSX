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
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { Traitement as Traitements } from "../types/traitement.type";

export default function Traitement() {
  const [cookies] = useCookies(["sessionid"]);
  const [traitements, setTraitements] = useState<Traitements[]>([]);
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
        .delete(`http://localhost:3000/traitements/${idToDelete}`)
        .then(() => {
          const updatedTraitement = traitements.filter(
            (traitement) => traitement.idTraitement !== idToDelete
          );
          setTraitements(updatedTraitement);
          setIdToDelete(null);
          onClose();
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/traitements")
      .then((res) => setTraitements(res.data))
      .catch((err) =>
        setError(
          "Impssible d'acceder a cette page car vos droit ne le permettant pas"
        )
      );
  }, []);

  return (
    <div>
      <Flex>
        <Box>
          <Flex gap={3} justifyContent={"center"} mb={4}>
            <Heading>Traitement </Heading>
            <Link to="/create-traitement">
              <Button leftIcon={<AddIcon />} colorScheme="teal">
                Créer un traitement
              </Button>
            </Link>
          </Flex>
          {traitements.length === 0 ? (
            <p>Aucun traitement à faire</p>
          ) : (
            <>
              {traitements.map((traitement) => (
                <div key={traitement.idTraitement}>
                  <Flex
                    mb={"4"}
                    border={"1px solid gray"}
                    p={"4"}
                    justifyContent="center"
                  >
                    <Flex alignItems={"center"} gap={4}>
                      <Flex>
                        <Box>
                          <Heading size={"md"}>
                            Traitement N°{traitement.idTraitement}
                          </Heading>
                          <Box>
                            <p>
                              Date du Traitement {traitement.dateTraitement}{" "}
                            </p>
                            <p>Qualité du traitement: {traitement.qualite}</p>
                            <p>
                              QTE corps étranger :{" "}
                              {traitement.quantiteCorpsEtranger}kg
                            </p>
                            <p>
                              Scoring Bonus/Malus :{" "}
                              {traitement.scoringBonusMalus}
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
                          onClick={() => handleDelete(traitement.idTraitement)}
                        >
                          <DeleteIcon color={"crimson"} />
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
