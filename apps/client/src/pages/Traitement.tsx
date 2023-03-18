import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Traitement as Traitements } from "../types/traitement.type";

export default function Traitement() {
  const [cookies] = useCookies(["sessionid"]);
  const [traitements, setTraitements] = useState<Traitements[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCreateTraitement,
    onOpen: onOpenCreateTraitement,
    onClose: onCloseCreateTraitement,
  } = useDisclosure();
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const navigate = useNavigate();

  const qualiteRef = useRef<HTMLSelectElement | null>(null);
  const quantiteCeRef = useRef<HTMLInputElement | null>(null);
  const scoringBonMalRef = useRef<HTMLInputElement | null>(null);
  const dateTraitementRef = useRef<HTMLInputElement | null>(null);

  const handleCreationTraitement = async () => {
    const qualite = qualiteRef.current?.value;
    const quantiteCorpsEtranger = quantiteCeRef.current?.value;
    const scoringBonusMalus = scoringBonMalRef.current?.value;
    const dateTraitement = dateTraitementRef.current?.value;
    try {
      if (
        quantiteCorpsEtranger === undefined ||
        scoringBonusMalus === undefined
      ) {
        return;
      }
      const response = await axios.post("http://localhost:3000/traitements", {
        qualite,
        quantiteCorpsEtranger: parseInt(quantiteCorpsEtranger),
        scoringBonusMalus: parseInt(scoringBonusMalus),
        dateTraitement,
      });
      onCloseCreateTraitement();
    } catch (error) {
      console.log(error);
    }
  };

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
  }, ["", handleCreationTraitement]);

  return (
    <div>
      <Flex>
        <Box>
          <Flex gap={3} justifyContent={"center"} mb={4}>
            <Heading>Traitement </Heading>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="teal"
              onClick={onOpenCreateTraitement}
            >
              Créer un traitement
            </Button>
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
                    borderColor="teal"
                    borderRadius={"xl"}
                  >
                    <Flex alignItems={"center"} gap={4}>
                      <Flex>
                        <Box>
                          <Heading size={"md"}>
                            <Button>
                              Traitement N°{traitement.idTraitement}
                            </Button>
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
                        <Link
                          to={`/update-traitements/${traitement.idTraitement}`}
                        >
                          <Button ml={6}>
                            <EditIcon color={"teal"} />
                          </Button>
                        </Link>
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
      <Modal isOpen={isOpenCreateTraitement} onClose={onCloseCreateTraitement}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Créer un traitement</ModalHeader>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Qualité</FormLabel>
              <Select ref={qualiteRef}>
                <option value="PURE">Pure</option>
                <option value="POLLUEE">Poluée</option>
                <option value="NONRECYCLABLE">Non recyclable</option>
              </Select>
              <FormLabel>Quantite de corps étranger</FormLabel>
              <Input
                type="number"
                placeholder="Quantite de corps étranger"
                ref={quantiteCeRef}
              />
              <FormLabel>Scoring bonus/malus</FormLabel>
              <Input
                type="number"
                placeholder="Scoring bonus/malus"
                ref={scoringBonMalRef}
                min={1}
                max={10}
              />
              <FormLabel>Date du traitement</FormLabel>
              <Input type={"date"} ref={dateTraitementRef} />
            </FormControl>
            <Button onClick={handleCreationTraitement}>Valider</Button>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onCloseCreateTraitement}>
              Annuler
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
