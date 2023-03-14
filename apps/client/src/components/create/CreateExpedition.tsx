import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateExpedition() {
  const navigate = useNavigate();

  const destinataireRef = useRef<HTMLInputElement | null>(null);
  const nbPaletteRef = useRef<HTMLInputElement | null>(null);
  const poidNetTotalRef = useRef<HTMLInputElement | null>(null);
  const idTraitementRef = useRef<HTMLInputElement | null>(null);
  const idTiersCompacteRef = useRef<HTMLInputElement | null>(null);
  const facturesRef = useRef<HTMLInputElement | null>(null);

  const handleCreateExpedition = async () => {
    const destinataire = destinataireRef.current?.value;
    const nbPalette = nbPaletteRef.current?.value;
    const poidNetTotal = poidNetTotalRef.current?.value;
    const traitement = idTraitementRef.current?.value;
    const tiersCompacte = idTiersCompacteRef.current?.value;
    const numFacture = facturesRef.current?.value;
    try {
      if (
        nbPalette === null ||
        nbPalette === undefined ||
        poidNetTotal === null ||
        poidNetTotal === undefined
      ) {
        return;
      }
      const response = await axios.post("http://localhost:3000/expeditions", {
        destinataire,
        nbPalette: parseInt(nbPalette),
        poidNetTotal: parseInt(poidNetTotal),
        traitement,
        tiersCompacte,
        numFacture,
      });
      navigate("/expeditions");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <VStack width={"30%"} m={"auto"}>
        <Heading size={"lg"}>Creer une Expedition:</Heading>
        <FormControl isRequired>
          <FormLabel>Destinataire</FormLabel>
          <Input placeholder="destinataire" ref={destinataireRef} />
          <FormLabel>Nombre de palette</FormLabel>
          <Input placeholder="Nombre de palette" ref={nbPaletteRef} />
          <FormLabel>Poid Net total</FormLabel>
          <Input placeholder="Poid Net total" ref={poidNetTotalRef} />
          <FormLabel>ID du traitement</FormLabel>
          <Input placeholder="ID du traitement" ref={idTraitementRef} />
          <FormLabel>ID du tiers compacté</FormLabel>
          <Input placeholder="ID du tiers compacté" ref={idTiersCompacteRef} />
        </FormControl>
        <FormControl>
          <FormLabel>Facture</FormLabel>
          <Input placeholder="Facture" ref={facturesRef} />
        </FormControl>
        <Button onClick={handleCreateExpedition}>Valider</Button>
      </VStack>
    </div>
  );
}
