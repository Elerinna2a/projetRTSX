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

export default function CreateTraitement() {
  const navigate = useNavigate();

  return (
    <div>
      <VStack width={"30%"} m={"auto"}>
        <Heading>Creer un Traitement:</Heading>
        <FormControl isRequired>
          <FormLabel>Qualité</FormLabel>
          <Select>
            <option value="pure">Pure</option>
            <option value="poluee">Poluée</option>
            <option value="nonrecyclable">Non recyclable</option>
          </Select>
          <FormLabel>Quantite de corps étranger</FormLabel>
          <Input placeholder="Quantite de corps étranger" />
          <FormLabel>Scoring bonus/malus</FormLabel>
          <Input placeholder="Scoring bonus/malus" />
        </FormControl>
        <FormControl>
          <FormLabel>Id de l'employé</FormLabel>
          <Input placeholder="EmployeId" />
        </FormControl>
        <Button onClick={() => navigate("/")}>Valider</Button>
      </VStack>
    </div>
  );
}
