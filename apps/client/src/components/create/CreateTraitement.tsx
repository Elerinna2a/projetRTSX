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

export default function CreateTraitement() {
  const navigate = useNavigate();

  const qualiteRef = useRef<HTMLSelectElement | null>(null);
  const quantiteCeRef = useRef<HTMLInputElement | null>(null);
  const scoringBonMalRef = useRef<HTMLInputElement | null>(null);
  const dateTraitementRef = useRef<HTMLInputElement | null>(null);

  const handleCreationTraitement = async () => {
    const qualite = qualiteRef.current?.value;
    const quantiteCorpsEtranger = quantiteCeRef.current?.value;
    const scoringBonusMalus = scoringBonMalRef.current?.value;
    const dateTraitement = dateTraitementRef.current?.value;
    try {
      if (
        quantiteCorpsEtranger === undefined ||
        scoringBonusMalus === undefined
      ) {
        return;
      }
      const response = await axios.post("http://localhost:3000/traitements", {
        qualite,
        quantiteCorpsEtranger: parseInt(quantiteCorpsEtranger),
        scoringBonusMalus: parseInt(scoringBonusMalus),
        dateTraitement,
      });
      navigate("/traitements");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <VStack width={"30%"} m={"auto"}>
        <Heading>Creer un Traitement:</Heading>
        <FormControl isRequired>
          <FormLabel>Qualité</FormLabel>
          <Select ref={qualiteRef}>
            <option value="PURE">Pure</option>
            <option value="POLLUEE">Poluée</option>
            <option value="NONRECYCLABLE">Non recyclable</option>
          </Select>
          <FormLabel>Quantite de corps étranger</FormLabel>
          <Input
            type="number"
            placeholder="Quantite de corps étranger"
            ref={quantiteCeRef}
          />
          <FormLabel>Scoring bonus/malus</FormLabel>
          <Input
            type="number"
            placeholder="Scoring bonus/malus"
            ref={scoringBonMalRef}
            min={1}
            max={10}
          />
          <FormLabel>Date du traitement</FormLabel>
          <Input type={"date"} ref={dateTraitementRef} />
        </FormControl>
        <Button onClick={handleCreationTraitement}>Valider</Button>
      </VStack>
    </div>
  );
}
