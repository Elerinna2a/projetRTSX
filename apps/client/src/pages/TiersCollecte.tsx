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
import { Link } from "react-router-dom";
import { TierCollecte } from "../store/tierCollecte.store";

export default function TiersCollecte() {
  const [tierCollectes, setTierCollectes] = useState<TierCollecte[]>([]);
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
  const typeEntrepriseRef = useRef<HTMLInputElement | null>(null);
  const scoringFaciliteRef = useRef<HTMLSelectElement | null>(null);
  const nomContactRef = useRef<HTMLInputElement | null>(null);
  const telRef = useRef<HTMLInputElement | null>(null);
  const mailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const collectesRef = useRef<HTMLInputElement | null>(null);
  const factureRef = useRef<HTMLInputElement | null>(null);

  const handleCreateTiersCollecte = async () => {
    const nom = nomRef.current?.value;
    const adresse = adresseRef.current?.value;
    const typeEntreprise = typeEntrepriseRef.current?.value;
    const scoringFacilite = scoringFaciliteRef.current?.value;
    const nomContact = nomContactRef.current?.value;
    const tel = telRef.current?.value;
    const mail = mailRef.current?.value;
    const password = passwordRef.current?.value;
    const collectes = collectesRef.current?.value;
    const facture = factureRef.current?.value;

    try {
      const createTiersCollecte = {
        nom,
        adresse,
        typeEntreprise,
        scoringFacilite,
        nomContact,
        tel,
        mail,
        password,
        collectess: collectes
          ? { create: [{ dateCollectes: collectes }] }
          : undefined,
        factures: facture
          ? { connect: [{ idFacture: parseInt(facture) }] }
          : undefined,
      };

      const response = await axios.post(
        "http://localhost:3000/tierscollectes",
        createTiersCollecte
      );
      console.log(response);
      onCloseCreateTiersCollecte();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/tierscollectes")
      .then((res) => setTierCollectes(res.data))
      .catch((err) =>
        setError(
          "Impssible d'acceder a cette page car vos droit ne le permettant pas"
        )
      );
  }, ["", handleCreateTiersCollecte]);

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

  return (
    <div>
      <Flex>
        <Box>
          <Flex gap={3} justifyContent={"center"} mb={4}>
            <Heading>Tiers Collecte </Heading>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="teal"
              onClick={onOpenCreateTiersCollecte}
            >
              Crée un tiers
            </Button>
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
                              <Button>
                                Tier Collecte N°{tierCollecte.idTierCollecte}
                              </Button>
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
                        <Link
                          to={`/update-tierscollecte/${tierCollecte.idTierCollecte}`}
                        >
                          <Button ml={6} color="teal">
                            <EditIcon />
                          </Button>
                        </Link>
                        <Button
                          ml={6}
                          onClick={() =>
                            handleDelete(tierCollecte.idTierCollecte)
                          }
                          color="crimson"
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
      <Modal
        isOpen={isOpenCreateTiersCollecte}
        onClose={onCloseCreateTiersCollecte}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Créer un tiers Collecte</ModalHeader>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Nom</FormLabel>
              <Input type="text" placeholder="Nom" ref={nomRef} />
              <FormLabel>Adresse</FormLabel>
              <Input type="text" placeholder="Adresse" ref={adresseRef} />
              <FormLabel>Type de tiers</FormLabel>
              <Input
                type="text"
                placeholder="Type de tiers"
                ref={typeEntrepriseRef}
              />
              <FormLabel>Scoring facilité</FormLabel>
              <Select ref={scoringFaciliteRef}>
                <option value="UN">UN</option>
                <option value="DEUX">DEUX</option>
                <option value="TROIS">TROIS</option>
              </Select>
              <FormLabel>Nom du contact</FormLabel>
              <Input
                ref={nomContactRef}
                placeholder="Nom du contact"
                type="text"
              />
              <FormLabel>Tel du contact</FormLabel>
              <Input type="tel" placeholder="Tel du contact" ref={telRef} />
              <FormLabel>E-Mail</FormLabel>
              <Input type="email" placeholder="E-Mail" ref={mailRef} />
              <FormLabel>Password</FormLabel>
              <Input
                ref={passwordRef}
                placeholder="Nom du contact"
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Facture n°</FormLabel>
              <Input
                type="number"
                placeholder="Facture liée à la collecte"
                ref={factureRef}
              />
              {/* <FormLabel>Collectes n°</FormLabel>
            <Input
              type="number"
              placeholder="Collectes n° lié à la collecte"
              ref={collectesRef}
            /> */}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleCreateTiersCollecte()}>Valider</Button>
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
