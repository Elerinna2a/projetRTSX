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

export default function CreateTiersCompacte() {
  const navigate = useNavigate();

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
      navigate("/tiers-compactes");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Flex gap={4} flexDirection={"column"}>
        <Flex width={"30%"} m={"auto"} flexDirection={"column"} gap={3}>
          <Heading>Creer un tiers compacte:</Heading>
          <FormControl isRequired>
            <FormLabel>Nom</FormLabel>
            <Input type="text" placeholder="Nom" ref={nomRef} />
            <FormLabel>Adresse</FormLabel>
            <Input type="text" placeholder="Nom du tiers" ref={adresseRef} />
            <FormLabel>Type de tiers</FormLabel>
            <Input type="text" placeholder="Type de tiers" ref={typeTiersRef} />
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
        </Flex>
        <Spacer />
        <Flex flexDirection={"column"}>
          <Employes />
        </Flex>
      </Flex>
    </div>
  );
}
