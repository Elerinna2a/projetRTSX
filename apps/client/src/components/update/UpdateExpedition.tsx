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
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Employes from "../../pages/Employes";
import { Expedition } from "../../store/expedition.store";

export default function UpdateExpedition() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [expeditions, setExpeditions] = useState<Expedition>();

  const dateExpeditionRef = useRef<HTMLInputElement | null>(null);
  const destinataireRef = useRef<HTMLInputElement | null>(null);
  const nbPaletteRef = useRef<HTMLInputElement | null>(null);
  const poidNetTotalRef = useRef<HTMLInputElement | null>(null);
  const tiersCompacteIdRef = useRef<HTMLInputElement | null>(null);

  const handleUpdateExpedition = async () => {
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

      const response = await axios.put(
        `http://localhost:3000/expeditions/${id}`,
        {
          dateExpedition,
          destinataire,
          nbPalette: parseFloat(nbPalette),
          poidNetTotal: parseInt(poidNetTotal),
          tiersCompacteId: parseInt(tiersCompacteId),
        }
      );
      console.log(response);
      navigate("/expeditions");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getExpedition = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/expeditions/${id}`
        );
        setExpeditions(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getExpedition();
  }, [id]);

  return (
    <div>
      <Flex gap={4} flexDirection={"column"}>
        <Flex width={"30%"} m={"auto"} flexDirection={"column"} gap={3}>
          <Heading>Creer une expédition :</Heading>
          <FormControl isRequired>
            <FormLabel>dateExpedition</FormLabel>
            <Input
              type="date"
              ref={dateExpeditionRef}
              defaultValue={expeditions?.dateExpedition}
            />
            <FormLabel>destinataire</FormLabel>
            <Input
              type="text"
              ref={destinataireRef}
              defaultValue={expeditions?.destinataire}
            />
            <FormLabel>nbPalette</FormLabel>
            <Input
              type="number"
              ref={nbPaletteRef}
              defaultValue={expeditions?.nbPalette}
            />
            <FormLabel>poidNetTotal</FormLabel>
            <Input
              type="number"
              ref={poidNetTotalRef}
              defaultValue={expeditions?.poidNetTotal}
            />
            <FormLabel>Tiers compacte ID</FormLabel>
            <Input
              type="number"
              ref={tiersCompacteIdRef}
              defaultValue={expeditions?.tiersCompacteId}
            />
          </FormControl>
          <Button onClick={() => handleUpdateExpedition()}>Valider</Button>
        </Flex>
        <Spacer />
        <Flex flexDirection={"column"}>
          <Employes />
        </Flex>
      </Flex>
    </div>
  );
}
