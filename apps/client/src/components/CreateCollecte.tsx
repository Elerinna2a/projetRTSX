import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function CreateCollecte() {
  const navigate = useNavigate();

  return (
    <div>
      <VStack width={"30%"} m={"auto"}>
        <Heading>Creer une collecte:</Heading>
        <FormControl isRequired>
          <FormLabel>Quantité</FormLabel>
          <Input placeholder="Quantité" />
          <FormLabel>Nom du tiers</FormLabel>
          <Input placeholder="Nom du tiers" />
          <FormLabel>Forme de la collecte</FormLabel>
          <Select>
            <option value="sac">Sac</option>
            <option value="vrac">Vrac</option>
            <option value="palette">Palette</option>
          </Select>
          <FormLabel>Type de collecte</FormLabel>
          <Input placeholder="Type de la collecte" />
        </FormControl>
        <FormControl>
          <FormLabel>L'id de l'employé</FormLabel>
          <Input placeholder="EmployeId" />
        </FormControl>
        <Button onClick={() => navigate("/")}>Valider</Button>
      </VStack>
    </div>
  );
}
