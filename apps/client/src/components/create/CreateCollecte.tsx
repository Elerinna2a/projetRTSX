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
  const nomTiers = useRef<HTMLInputElement | null>(null);
  const formeCollecte = useRef<HTMLSelectElement | null>(null);

  const handleCreateCollecte = async () => {
    const quantite = quantiteRef.current?.value;
    const nomTierCollecte = nomTiers.current?.value;
    const formeColecte = formeCollecte.current?.value;
    try {
      const response = await axios.post("http://localhost:3000/collectes", {
        quantite,
        nomTierCollecte,
        formeColecte,
      });
      navigate("/collectes");
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
          <Input type={"number"} placeholder="Quantité" ref={quantiteRef} />
          <FormLabel>Nom du tiers</FormLabel>
          <Input placeholder="Nom du tiers" ref={nomTiers} />
          <FormLabel>Forme de la collecte</FormLabel>
          <Select ref={formeCollecte}>
            <option value="sac">Sac</option>
            <option value="vrac">Vrac</option>
            <option value="palette">Palette</option>
          </Select>
        </FormControl>
        <Button onClick={() => navigate("/")}>Valider</Button>
      </VStack>
    </div>
  );
}
