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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Collecte as Collectes } from "../store/collecte.store";

export default function Collecte() {
  // useRef, useState, useDisclosure
  const [collectes, setCollectes] = useState<Collectes[]>([]);
  const [selectedCollecte, setSelectedCollecte] = useState<Collectes>();
  const [error, setError] = useState<string | null>(null);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenSingleCollecte,
    onOpen: onOpenSingleCollecte,
    onClose: onCloseSingleCollecte,
  } = useDisclosure();
  const {
    isOpen: isOpenCreateCollecte,
    onOpen: onOpenCreateCollecte,
    onClose: onCloseCreateCollecte,
  } = useDisclosure();

  const quantiteRef = useRef<HTMLInputElement | null>(null);
  const nomTiersRef = useRef<HTMLInputElement | null>(null);
  const formeCollecteRef = useRef<HTMLSelectElement | null>(null);
  const employeIdCollecteRef = useRef<HTMLInputElement | null>(null);
  const traitementIdCollecteRef = useRef<HTMLInputElement | null>(null);
  const dateCollecteRef = useRef<HTMLInputElement | null>(null);
  const tierCollecteIdRef = useRef<HTMLInputElement | null>(null);

  // Create Collecte
  const handleCreateCollecte = async () => {
    // constant attritubtion

    const quantite = quantiteRef.current?.value;
    const nomTierCollecte = nomTiersRef.current?.value;
    const formeCollecte = formeCollecteRef.current?.value;
    const employeId = employeIdCollecteRef.current?.value;
    const traitementId = traitementIdCollecteRef.current?.value;
    const dateCollecte = dateCollecteRef.current?.value;
    const tiercollecteId = tierCollecteIdRef.current?.value;
    try {
      if (
        quantite === undefined ||
        employeId === undefined ||
        traitementId === undefined ||
        dateCollecte === undefined ||
        tiercollecteId === undefined
      ) {
        return;
      }
      const response = await axios.post("http://localhost:3000/collectes", {
        quantite: parseInt(quantite),
        nomTierCollecte,
        formeCollecte,
        employeId: parseInt(employeId),
        traitementId: parseInt(traitementId),
        dateCollecte,
        tiercollecteId: parseInt(tiercollecteId),
      });
      console.log(response);
      onCloseCreateCollecte();
    } catch (err) {
      console.log(err);
    }
  };

  // delete part
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

  useEffect(() => {
    axios
      .get("http://localhost:3000/collectes")
      .then((res) => setCollectes(res.data))
      .catch((err) =>
        setError(
          "Impssible d'acceder a cette page car vos droit ne le permettant pas"
        )
      );
  }, ["", handleCreateCollecte, onOpenSingleCollecte]);

  return (
    <div>
      <Flex>
        <Box>
          <Flex gap={3} mb={4}>
            <Heading>Collecte </Heading>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="teal"
              onClick={onOpenCreateCollecte}
            >
              Créer une collecte
            </Button>
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
                            {/* <Link to={`/collectes/${collecte.idNumLot}`}> */}
                            <Button
                              onClick={() => {
                                setSelectedCollecte(collecte);
                                onOpenSingleCollecte();
                              }}
                            >
                              Collecte N°{collecte.idNumLot}
                            </Button>
                            {/* </Link> */}
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
                        <Link to={`/update-collectes/${collecte.idNumLot}`}>
                          <Button ml={6}>
                            <EditIcon color={"teal"} />
                          </Button>
                        </Link>
                        <Button
                          ml={6}
                          onClick={() => handleDelete(collecte.idNumLot)}
                        >
                          <DeleteIcon color={"crimson"} />
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Modal
                    isOpen={isOpenSingleCollecte}
                    onClose={onCloseSingleCollecte}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Details de la collecte</ModalHeader>
                      <ModalBody>
                        {selectedCollecte && (
                          <Flex flexDirection={"column"}>
                            <Text>ID : {selectedCollecte.idNumLot}</Text>
                            <Text>
                              Nom du tiers: {selectedCollecte.nomTierCollecte}
                            </Text>
                            <Text>Quantite : {selectedCollecte.quantite}</Text>
                            <Text>
                              Forme de la collecte :{" "}
                              {selectedCollecte.formeCollecte}
                            </Text>
                            <Link
                              to={`/traitements/${selectedCollecte.traitementId}`}
                            >
                              <Text>
                                Id du traitement lié :{" "}
                                {selectedCollecte.traitementId}
                              </Text>
                            </Link>
                            <Link
                              to={`/employes/${selectedCollecte.employeId}`}
                            >
                              <Text>
                                Id de du chauffeur :{" "}
                                {selectedCollecte.employeId}
                              </Text>
                            </Link>
                            <Text>
                              Date de la collecte :{" "}
                              {selectedCollecte.dateCollecte}
                            </Text>
                          </Flex>
                        )}
                      </ModalBody>
                      <ModalFooter>
                        <Button variant="ghost" onClick={onCloseSingleCollecte}>
                          Annuler
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Flex>
              ))}
            </Flex>
          )}
        </Box>
      </Flex>

      {/* Modal Create */}
      <Modal isOpen={isOpenCreateCollecte} onClose={onCloseCreateCollecte}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Création d'un employé</ModalHeader>
          <ModalBody>
            <Flex gap={4} flexDirection={"column"}>
              <Flex m={"auto"} flexDirection={"column"} gap={3}>
                <Heading>Creer une collecte:</Heading>
                <FormControl isRequired>
                  <FormLabel>Quantité</FormLabel>
                  <Input
                    type="number"
                    placeholder="Quantité"
                    ref={quantiteRef}
                  />
                  <FormLabel>Nom du tiers</FormLabel>
                  <Input
                    type="text"
                    placeholder="Nom du tiers"
                    ref={nomTiersRef}
                  />
                  <FormLabel>Date de la collecte</FormLabel>
                  <Input type="date" ref={dateCollecteRef} />
                  <FormLabel>Forme de la collecte</FormLabel>
                  <Select ref={formeCollecteRef}>
                    <option value="SAC">Sac</option>
                    <option value="VRAC">Vrac</option>
                    <option value="PALETTE">Palette</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Id du Chauffeur</FormLabel>
                  <Input
                    type="number"
                    placeholder="Id du Chauffeur"
                    ref={employeIdCollecteRef}
                  />
                  <FormLabel>ID Traitement lié à la collecte</FormLabel>
                  <Input
                    type="number"
                    placeholder="Traitement lié à la collecte"
                    ref={traitementIdCollecteRef}
                  />
                  <FormLabel>ID TierCollecte lié à la collecte</FormLabel>
                  <Input
                    type="number"
                    placeholder="Collecte lié à la collecte"
                    ref={tierCollecteIdRef}
                  />
                </FormControl>
                <Button onClick={() => handleCreateCollecte()}>Valider</Button>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onCloseCreateCollecte}>
              Fermer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal DELETE */}
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
