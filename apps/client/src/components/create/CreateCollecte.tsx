import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Employes from "../../pages/Employes";

export default function CreateCollecte() {
  const navigate = useNavigate();

  const quantiteRef = useRef<HTMLInputElement | null>(null);
  const nomTiersRef = useRef<HTMLInputElement | null>(null);
  const formeCollecteRef = useRef<HTMLSelectElement | null>(null);
  const employeIdCollecteRef = useRef<HTMLInputElement | null>(null);
  const traitementIdCollecteRef = useRef<HTMLInputElement | null>(null);

  const handleCreateCollecte = async () => {
    const quantite = quantiteRef.current?.value;
    const nomTierCollecte = nomTiersRef.current?.value;
    const formeCollecte = formeCollecteRef.current?.value;
    const employeId = employeIdCollecteRef.current?.value;
    const traitementId = traitementIdCollecteRef.current?.value;
    try {
      if (
        quantite === undefined ||
        employeId === undefined ||
        traitementId === undefined
      ) {
        return;
      }
      const response = await axios.post("http://localhost:3000/collectes", {
        quantite: parseInt(quantite),
        nomTierCollecte,
        formeCollecte,
        employeId: parseInt(employeId),
        traitementId: parseInt(traitementId),
      });
      console.log(response);
      navigate("/collecte");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Flex gap={4} flexDirection={"column"}>
        <Flex width={"30%"} m={"auto"} flexDirection={"column"} gap={3}>
          <Heading>Creer une collecte:</Heading>
          <FormControl isRequired>
            <FormLabel>Quantité</FormLabel>
            <Input type="number" placeholder="Quantité" ref={quantiteRef} />
            <FormLabel>Nom du tiers</FormLabel>
            <Input type="text" placeholder="Nom du tiers" ref={nomTiersRef} />
            <FormLabel>Forme de la collecte</FormLabel>
            <Select ref={formeCollecteRef}>
              <option value="SAC">Sac</option>
              <option value="VRAC">Vrac</option>
              <option value="PALETTE">Palette</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Id du Chauffeur</FormLabel>
            <Input
              type="number"
              placeholder="Id du Chauffeur"
              ref={employeIdCollecteRef}
            />
            <FormLabel>ID Traitement lié à la collecte</FormLabel>
            <Input
              type="number"
              placeholder="Traitement lié à la collecte"
              ref={traitementIdCollecteRef}
            />
          </FormControl>
          <Button onClick={() => handleCreateCollecte()}>Valider</Button>
        </Flex>
        <Spacer />
        <Flex flexDirection={"column"}>
          <Employes />
        </Flex>
      </Flex>
    </div>
  );
}
