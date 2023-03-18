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
import { Link, useNavigate } from "react-router-dom";
import { Tournee } from "../types/tournee.type";

export default function Tournees() {
  const [tournees, setTournees] = useState<Tournee[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCreateFacture,
    onOpen: onOpenCreateFacture,
    onClose: onCloseCreateFacture,
  } = useDisclosure();
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const navigate = useNavigate();

  const chauffeurRef = useRef<HTMLInputElement | null>(null);
  const typeVehiculeRef = useRef<HTMLSelectElement | null>(null);
  const remorqueRef = useRef<HTMLSelectElement | null>(null);
  const dateTourneeRef = useRef<HTMLInputElement | null>(null);

  const handleCreateTournee = async () => {
    const chauffeur = chauffeurRef.current?.value;
    const typeVehicule = typeVehiculeRef.current?.value;
    const remorque = remorqueRef.current?.value;
    const dateTournee = dateTourneeRef.current?.value;

    try {
      if (chauffeur === undefined) {
        return;
      }
      const response = await axios.post("http://localhost:3000/tournees", {
        chauffeurId: parseInt(chauffeur),
        typeVehicule,
        remorque,
        dateTournee,
      });
      onCloseCreateFacture();
    } catch (error) {
      alert("Chauffeur déja assigné");
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
  }, ["", handleCreateTournee]);

  return (
    <div>
      <Flex>
        <Box>
          <Flex gap={3} justifyContent={"center"} mb={4}>
            <Heading>Tournées </Heading>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="teal"
              onClick={onOpenCreateFacture}
            >
              Créer une tournée
            </Button>
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
                            <Link to={`/tournees/${tournee.idTournee}`}>
                              <Button>Tournée N°{tournee.idTournee}</Button>
                            </Link>
                          </Heading>
                          <Box>
                            <p>
                              <strong>Id du chauffeur:</strong>{" "}
                              {tournee.chauffeurId}
                            </p>
                            <p>
                              {" "}
                              <strong>Date : </strong> {tournee.dateTournee}{" "}
                            </p>
                            <p>
                              <strong> Véhicule :</strong>{" "}
                              {tournee.typeVehicule}
                            </p>
                            <p>
                              {" "}
                              <strong> Remorque : </strong>
                              {tournee.remorque}
                            </p>
                          </Box>
                        </Box>
                      </Flex>
                      <Flex gap={"4"} flexDirection="column">
                        <Link to={`/update-tournees/${tournee.idTournee}`}>
                          <Button ml={6}>
                            <EditIcon color="teal" />
                          </Button>
                        </Link>
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
        <Modal isOpen={isOpenCreateFacture} onClose={onCloseCreateFacture}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Créer une tournée</ModalHeader>
            <ModalBody>
              <FormControl>
                <FormLabel>ID du chauffeur</FormLabel>
                <Input
                  type="number"
                  placeholder="Quantité"
                  ref={chauffeurRef}
                />
                <FormLabel>Date de la tournée</FormLabel>
                <Input
                  type="date"
                  placeholder="Quantité"
                  ref={dateTourneeRef}
                />
                <FormLabel>Type du véhicule ?</FormLabel>
                <Select ref={typeVehiculeRef} mb={4}>
                  <option value="FOURGON">Fourgon</option>
                  <option value="NONARTICULE">Non-articule</option>
                  <option value="SEMIREMORQUE">Semi-remorque</option>
                </Select>
                <FormLabel>Remorque ?</FormLabel>
                <Select ref={remorqueRef}>
                  <option value="OUI">Oui</option>
                  <option value="NON">Non</option>
                </Select>
              </FormControl>
              <Button onClick={handleCreateTournee}>Valider</Button>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={onCloseCreateFacture}>
                Annuler
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
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
