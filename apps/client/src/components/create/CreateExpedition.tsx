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

export default function CreateExpedition() {
  const navigate = useNavigate();

  const dateExpeditionRef = useRef<HTMLInputElement | null>(null);
  const destinataireRef = useRef<HTMLInputElement | null>(null);
  const nbPaletteRef = useRef<HTMLInputElement | null>(null);
  const poidNetTotalRef = useRef<HTMLInputElement | null>(null);
  const tiersCompacteIdRef = useRef<HTMLInputElement | null>(null);

  const handleCreateExpedition = async () => {
    try {
      const dateExpedition = dateExpeditionRef.current?.value;
      const destinataire = destinataireRef.current?.value;
      const nbPalette = nbPaletteRef.current?.value;
      const poidNetTotal = poidNetTotalRef.current?.value;
      const tiersCompacteId = tiersCompacteIdRef.current?.value;
      if (
        nbPalette === undefined ||
        nbPalette === null ||
        poidNetTotal === undefined ||
        poidNetTotal === null ||
        tiersCompacteId === undefined ||
        tiersCompacteId === null
      ) {
        alert("Veuillez remplir tous les champs");
        return;
      }

      const response = await axios.post("http://localhost:3000/expeditions", {
        dateExpedition,
        destinataire,
        nbPalette: parseFloat(nbPalette),
        poidNetTotal: parseInt(poidNetTotal),
        tiersCompacteId: parseInt(tiersCompacteId),
      });
      console.log(response);
      navigate("/expeditions");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Flex gap={4} flexDirection={"column"}>
        <Flex width={"30%"} m={"auto"} flexDirection={"column"} gap={3}>
          <Heading>Creer une expédition :</Heading>
          <FormControl isRequired>
            <FormLabel>dateExpedition</FormLabel>
            <Input type="date" ref={dateExpeditionRef} />
            <FormLabel>destinataire</FormLabel>
            <Input
              type="text"
              placeholder="destinataire"
              ref={destinataireRef}
            />
            <FormLabel>nbPalette</FormLabel>
            <Input type="number" ref={nbPaletteRef} />
            <FormLabel>poidNetTotal</FormLabel>
            <Input type="number" ref={poidNetTotalRef} />
            <FormLabel>Tiers compacte ID</FormLabel>
            <Input type="number" ref={tiersCompacteIdRef} />
          </FormControl>
          <Button onClick={() => handleCreateExpedition()}>Valider</Button>
        </Flex>
        <Spacer />
        <Flex flexDirection={"column"}>
          <Employes />
        </Flex>
      </Flex>
    </div>
  );
}
