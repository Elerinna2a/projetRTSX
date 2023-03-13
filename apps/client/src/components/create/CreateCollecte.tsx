import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateCollecte() {
  const navigate = useNavigate();

  const quantiteRef = useRef<HTMLInputElement | null>(null);
  const nomTiersRef = useRef<HTMLInputElement | null>(null);
  const formeCollecteRef = useRef<HTMLSelectElement | null>(null);

  const handleCreateCollecte = async () => {
    const quantite = quantiteRef.current?.value;
    const nomTierCollecte = nomTiersRef.current?.value;
    const formeCollecte = formeCollecteRef.current?.value;
    try {
      if (quantite === null || quantite === undefined) {
        return;
      }
      const response = await axios.post("http://localhost:3000/collectes", {
        quantite: parseInt(quantite),
        nomTierCollecte,
        formeCollecte,
      });
      console.log(response);
      navigate("/collecte");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <VStack width={"30%"} m={"auto"}>
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
        <Button onClick={() => handleCreateCollecte()}>Valider</Button>
      </VStack>
    </div>
  );
}
