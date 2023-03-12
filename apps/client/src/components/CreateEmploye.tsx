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

export default function CreateEmploye() {
  const navigate = useNavigate();

  return (
    <div>
      <VStack width={"30%"} m={"auto"}>
        <Heading>Creer un Employe:</Heading>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Email" />
          <FormLabel>Password</FormLabel>
          <Input placeholder="Password" />
          <FormLabel>Nom</FormLabel>
          <Input placeholder="Nom" />
          <FormLabel>Prénom</FormLabel>
          <Input placeholder="Prénom" />
          <FormLabel>Role</FormLabel>
          <Select>
            <option value="ADMIN">ADMIN</option>
            <option value="CHAUFFEUR">CHAUFFEUR</option>
            <option value="OPERATEUR">OPERATEUR</option>
            <option value="CLIENT">CLIENT</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Adresse</FormLabel>
          <Input placeholder="Adresse" />
          <FormLabel>Tel</FormLabel>
          <Input placeholder="Tel" />
        </FormControl>
        <Button onClick={() => navigate("/")}>Valider</Button>
      </VStack>
    </div>
  );
}
