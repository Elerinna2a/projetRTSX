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
import { Link } from "react-router-dom";
import { TiersCompacte } from "../types/tiersCompacte.type";

export default function TiersCompactes() {
  const [tiersCompactes, setTiersCompactes] = useState<TiersCompacte[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCreateTiersCollecte,
    onOpen: onOpenCreateTiersCollecte,
    onClose: onCloseCreateTiersCollecte,
  } = useDisclosure();
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const nomRef = useRef<HTMLInputElement | null>(null);
  const adresseRef = useRef<HTMLInputElement | null>(null);
  const typeTiersRef = useRef<HTMLInputElement | null>(null);
  const contactNomRef = useRef<HTMLInputElement | null>(null);
  const telRef = useRef<HTMLInputElement | null>(null);
  const mailRef = useRef<HTMLInputElement | null>(null);
  const factureRef = useRef<HTMLInputElement | null>(null);
  const expeditionRef = useRef<HTMLInputElement | null>(null);

  const handleCreateTiersCompacte = async () => {
    const nom = nomRef.current?.value;
    const adresse = adresseRef.current?.value;
    const typeTiers = typeTiersRef.current?.value;
    const contactNom = contactNomRef.current?.value;
    const tel = telRef.current?.value;
    const mail = mailRef.current?.value;
    const expedition = expeditionRef.current?.value;
    const factures = factureRef.current?.value;

    try {
      const createTiersCompacte = {
        nom,
        adresse,
        typeTiers,
        contactNom,
        tel,
        mail,
        expeditions: expedition
          ? { create: [{ dateExpedition: expedition }] }
          : undefined,
        factures: factures
          ? { create: [{ numeroFacture: factures }] }
          : undefined,
      };

      const response = await axios.post(
        "http://localhost:3000/tierscompactes",
        createTiersCompacte
      );
      console.log(response);
      onCloseCreateTiersCollecte();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/tierscompactes")
      .then((res) => setTiersCompactes(res.data))
      .catch((err) =>
        setError(
          "Impssible d'acceder a cette page car vos droit ne le permettant pas"
        )
      );
  }, ["", handleCreateTiersCompacte]);

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

  return (
    <div>
      <Flex>
        <Box>
          <Flex gap={3} alignItems={"center"} mb={4} flexDirection="column">
            <Heading>Tiers Compacteur </Heading>
            <Button
              leftIcon={<AddIcon />}
              colorScheme={"teal"}
              onClick={onOpenCreateTiersCollecte}
            >
              Créer un tiers compacteur
            </Button>
          </Flex>

          {tiersCompactes.length === 0 ? (
            <p>Aucun TiersCompactes à faire</p>
          ) : (
            <Flex flexWrap={"wrap"} gap={4}>
              {tiersCompactes.map((tiersCompacte) => (
                <Flex key={tiersCompacte.idTiersCompacte}>
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
                              to={`/tierscompactes/${tiersCompacte.idTiersCompacte}`}
                            >
                              <Button>
                                Tiers Compacte N°{tiersCompacte.idTiersCompacte}
                              </Button>
                            </Link>
                          </Heading>
                          <Box>
                            <p>Nom: {tiersCompacte.nom} </p>
                            <p>Adresse: {tiersCompacte.adresse} </p>
                            <p>Type: {tiersCompacte.typeTiers} </p>
                            <p>Nom du contact: {tiersCompacte.contactNom} </p>
                            <p>tel: {tiersCompacte.tel} </p>
                            <p>mail: {tiersCompacte.mail} </p>
                            {tiersCompacte.factures?.map((facture) => (
                              <p key={facture.idFacture}>
                                Facture N°{facture.idFacture}
                              </p>
                            ))}
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
      <Modal
        isOpen={isOpenCreateTiersCollecte}
        onClose={onCloseCreateTiersCollecte}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Création d'un tiers compacte</ModalHeader>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Nom</FormLabel>
              <Input type="text" placeholder="Nom" ref={nomRef} />
              <FormLabel>Adresse</FormLabel>
              <Input type="text" placeholder="Nom du tiers" ref={adresseRef} />
              <FormLabel>Type de tiers</FormLabel>
              <Input
                type="text"
                placeholder="Type de tiers"
                ref={typeTiersRef}
              />
              <FormLabel>Nom du contact</FormLabel>
              <Input
                ref={contactNomRef}
                placeholder="Forme de la collecte"
                type="text"
              />
              <FormLabel>Tel du contact</FormLabel>
              <Input type="tel" placeholder="Tel du contact" ref={telRef} />
              <FormLabel>E-Mail</FormLabel>
              <Input type="email" placeholder="E-Mail" ref={mailRef} />
            </FormControl>
            {/* <FormControl>
            <FormLabel>Facture n°</FormLabel>
            <Input
              type="number"
              placeholder="Facture lié à la collecte"
              ref={factureRef}
            />
            <FormLabel>Expedition n°</FormLabel>
            <Input
              type="number"
              placeholder="Expedition n° lié à la collecte"
              ref={expeditionRef}
            />
          </FormControl> */}
            <Button onClick={() => handleCreateTiersCompacte()}>Valider</Button>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onCloseCreateTiersCollecte}>
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
