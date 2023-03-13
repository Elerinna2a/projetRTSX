import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function CreateExpedition() {
  const navigate = useNavigate();

  return (
    <div>
      <VStack width={"30%"} m={"auto"}>
        <Heading size={"lg"}>Creer une Expedition:</Heading>
        <FormControl isRequired>
          <FormLabel>Destinataire</FormLabel>
          <Input placeholder="destinataire" />
          <FormLabel>Nombre de palette</FormLabel>
          <Input placeholder="Nombre de palette" />
          <FormLabel>Poid Net total</FormLabel>
          <Input placeholder="Poid Net total" />
          <FormLabel>ID du traitement</FormLabel>
          <Input placeholder="ID du traitement" />
          <FormLabel>ID du tiers compacté</FormLabel>
          <Input placeholder="ID du tiers compacté" />
        </FormControl>
        <FormControl>
          <FormLabel>Facture</FormLabel>
          <Input placeholder="Facture" />
        </FormControl>
        <Button onClick={() => navigate("/")}>Valider</Button>
      </VStack>
    </div>
  );
}
