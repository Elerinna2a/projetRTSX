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
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Facture } from "../store/facture.store";

export default function Factures() {
  const [factures, setFactures] = useState<Facture[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCreateFacture,
    onOpen: onOpenCreateFacture,
    onClose: onCloseCreateFacture,
  } = useDisclosure();
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const navigate = useNavigate();

  const dateFactureRef = useRef<HTMLInputElement | null>(null);
  const montantRef = useRef<HTMLInputElement | null>(null);
  const datePaiementFactureRef = useRef<HTMLInputElement | null>(null);
  const tierCompacteIdRef = useRef<HTMLInputElement | null>(null);
  const tiersCollecteIdRef = useRef<HTMLInputElement | null>(null);

  const handleCreateFacture = async () => {
    const dateFacture = dateFactureRef.current?.value;
    const montant = montantRef.current?.value;
    const datePaiementFacture = datePaiementFactureRef.current?.value;
    const tierCompacteId = tierCompacteIdRef.current?.value;
    const tiersCollecteId = tiersCollecteIdRef.current?.value;
    try {
      if (
        montant === undefined ||
        tierCompacteId === undefined ||
        tiersCollecteId === undefined
      ) {
        return;
      }
      const response = await axios.post("http://localhost:3000/factures", {
        dateFacture,
        montant: parseFloat(montant),
        datePaiementFacture,
        tierCompacteId: parseInt(tierCompacteId),
        tiersCollecteId: parseInt(tiersCollecteId),
      });
      navigate("/factures");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/factures")
      .then((res) => setFactures(res.data))
      .catch((err) =>
        setError(
          "Impssible d'acceder a cette page car vos droit ne le permettant pas"
        )
      );
  }, ["", handleCreateFacture]);

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

  return (
    <div>
      <Flex>
        <Box>
          <Flex gap={3} justifyContent={"center"} mb={4}>
            <Heading>Factures </Heading>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="teal"
              onClick={onOpenCreateFacture}
            >
              Créer une facture
            </Button>
          </Flex>

          {factures.length === 0 ? (
            <p>Aucun Factures à faire</p>
          ) : (
            <Flex flexWrap={"wrap"} gap={4}>
              {factures.map((factures) => (
                <Flex key={factures.idFacture}>
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
                            <Link to={`/factures/${factures.idFacture}`}>
                              <Button>factures N°{factures.idFacture}</Button>
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
                        <Link to={`/update-facture/${factures.idFacture}`}>
                          <Button ml={6} color="teal">
                            <EditIcon />
                          </Button>
                        </Link>
                        <Button
                          ml={6}
                          onClick={() => handleDelete(factures.idFacture)}
                          color="crimson"
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
      <Modal isOpen={isOpenCreateFacture} onClose={onCloseCreateFacture}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Création d'une facture</ModalHeader>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Date création de la facture</FormLabel>
              <Input type="date" ref={dateFactureRef} />
              <FormLabel>Montant</FormLabel>
              <Input type="float" ref={montantRef} />
              <FormLabel>Date paiement de la facture</FormLabel>
              <Input type="date" ref={datePaiementFactureRef} />
              <FormLabel>Id du tiers compacte</FormLabel>
              <Input type="number" ref={tierCompacteIdRef} />
              <FormLabel>Id du tiers Collecte</FormLabel>
              <Input type="number" ref={tiersCollecteIdRef} />
            </FormControl>
            <Button onClick={handleCreateFacture}>Creer Facture</Button>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onCloseCreateFacture}>
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
