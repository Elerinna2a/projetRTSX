import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  VStack
} from "@chakra-ui/react";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Employes from "../../pages/Employes";

export default function CreateTournee() {
  const navigate = useNavigate();

  const chauffeurRef = useRef<HTMLInputElement | null>(null);
  const typeVehiculeRef = useRef<HTMLSelectElement | null>(null);
  const remorqueRef = useRef<HTMLSelectElement | null>(null);
  const dateTourneeRef = useRef<HTMLInputElement | null>(null);

  const handleCreateTournee = async () => {
    const chauffeur = chauffeurRef.current?.value;
    const typeVehicule = typeVehiculeRef.current?.value;
    const remorque = remorqueRef.current?.value;
    const dateTournee = dateTourneeRef.current?.value;

    try {
      if (chauffeur === undefined) {
        return;
      }
      const response = await axios.post("http://localhost:3000/tournees", {
        chauffeurId: parseInt(chauffeur),
        typeVehicule,
        remorque,
        dateTournee,
      });
      navigate("/tournees");
    } catch (error) {
      alert("Chauffeur déja assigné");
      console.log(error);
    }
  };

  return (
    <div>
      <VStack m={"auto"}>
        <Flex flexDirection={"column"} gap={4}>
          <Heading>Creer une tournee:</Heading>
          <FormControl>
            <FormLabel>ID du chauffeur</FormLabel>
            <Input type="number" placeholder="Quantité" ref={chauffeurRef} />
            <FormLabel>Date de la tournée</FormLabel>
            <Input type="date" placeholder="Quantité" ref={dateTourneeRef} />
            <FormLabel>Type du véhicule ?</FormLabel>
            <Select ref={typeVehiculeRef} mb={4}>
              <option value="FOURGON">Fourgon</option>
              <option value="NONARTICULE">Non-articule</option>
              <option value="SEMIREMORQUE">Semi-remorque</option>
            </Select>
            <FormLabel>Remorque ?</FormLabel>
            <Select ref={remorqueRef}>
              <option value="OUI">Oui</option>
              <option value="NON">Non</option>
            </Select>
          </FormControl>
          <Button onClick={handleCreateTournee}>Valider</Button>
        </Flex>
        <Flex gap={2} flexDirection={"column"}>
          <Box>
            <Employes />
          </Box>
        </Flex>
      </VStack>
    </div>
  );
}
