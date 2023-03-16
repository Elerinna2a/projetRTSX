import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Employes from "../../pages/Employes";

export default function CreateTiersCollecte() {
  const navigate = useNavigate();

  const nomRef = useRef<HTMLInputElement | null>(null);
  const adresseRef = useRef<HTMLInputElement | null>(null);
  const typeEntrepriseRef = useRef<HTMLInputElement | null>(null);
  const scoringFaciliteRef = useRef<HTMLInputElement | null>(null);
  const nomContactRef = useRef<HTMLInputElement | null>(null);
  const telRef = useRef<HTMLInputElement | null>(null);
  const mailRef = useRef<HTMLInputElement | null>(null);
  const dateCreationRef = useRef<HTMLInputElement | null>(null);
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
    const dateCreation = dateCreationRef.current?.value;
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
        dateCreation,
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
      navigate("/tiers-collectes");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Flex gap={4} flexDirection={"column"}>
        <Flex width={"30%"} m={"auto"} flexDirection={"column"} gap={3}>
          <Heading>Créer un tiers Collecte:</Heading>
          <FormControl isRequired>
            <FormLabel>Nom</FormLabel>
            <Input type="text" placeholder="Nom" ref={nomRef} />
            <FormLabel>Adresse</FormLabel>
            <Input type="text" placeholder="Adresse" ref={adresseRef} />
            <FormLabel>Date</FormLabel>
            <Input type="date" placeholder="date" ref={dateCreationRef} />
            <FormLabel>Type de tiers</FormLabel>
            <Input
              type="text"
              placeholder="Type de tiers"
              ref={typeEntrepriseRef}
            />
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
          </FormControl>
          <FormControl>
            <FormLabel>Facture n°</FormLabel>
            <Input
              type="number"
              placeholder="Facture liée à la collecte"
              ref={factureRef}
            />
            <FormLabel>Collectes n°</FormLabel>
            <Input
              type="number"
              placeholder="Collectes n° lié à la collecte"
              ref={collectesRef}
            />
          </FormControl>
          <Button onClick={() => handleCreateTiersCollecte()}>Valider</Button>
        </Flex>
        <Spacer />
        <Flex flexDirection={"column"}>
          <Employes />
        </Flex>
      </Flex>
    </div>
  );
}
