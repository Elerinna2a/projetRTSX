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
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Traitement } from "../../types/traitement.type";

export default function UpdateTraitement({}) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [traitement, setTraitement] = useState<Traitement>();

  const qualiteRef = useRef<HTMLSelectElement | null>(null);
  const quantiteRef = useRef<HTMLInputElement | null>(null);
  const scoringBonMalRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);

  const handleUpdateTraitement = async () => {
    const qualite = qualiteRef.current?.value;
    const quantiteCorpsEtranger = quantiteRef.current?.value;
    const scoringBonusMalus = scoringBonMalRef.current?.value;
    const dateTraitement = dateRef.current?.value;

    try {
      if (
        quantiteCorpsEtranger === undefined ||
        quantiteCorpsEtranger === null ||
        scoringBonusMalus === undefined ||
        scoringBonusMalus === null
      ) {
        return alert("error");
      }
      const response = await axios.put(
        `http://localhost:3000/Traitements/${id}`,
        {
          qualite,
          quantiteCorpsEtranger: parseInt(quantiteCorpsEtranger),
          scoringBonusMalus: parseInt(scoringBonusMalus),
          dateTraitement,
        }
      );
      navigate("/Traitements");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getTraitement = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/Traitements/${id}`
        );
        setTraitement(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getTraitement();
  }, [id]);
  return (
    <div>
      <VStack width={"30%"} m={"auto"}>
        <Heading>Modifier une Traitement:</Heading>
        <FormControl isRequired>
          <FormLabel>Qualité</FormLabel>
          <Select ref={qualiteRef} defaultValue={traitement?.qualite}>
            <option value="PURE">Pure</option>
            <option value="POLLUEE">Poluée</option>
            <option value="NONRECYCLABLE">Non recyclable</option>
          </Select>
          <FormLabel>Quantite de corps étranger</FormLabel>
          <Input
            type="number"
            placeholder="Quantite de corps étranger"
            ref={quantiteRef}
            defaultValue={traitement?.quantiteCorpsEtranger}
          />
          <FormLabel>Scoring bonus/malus</FormLabel>
          <Input
            type="number"
            placeholder="Scoring bonus/malus"
            ref={scoringBonMalRef}
            min={1}
            max={10}
            defaultValue={traitement?.scoringBonusMalus}
          />
          <FormLabel>Date du traitement</FormLabel>
          <Input
            type={"date"}
            ref={dateRef}
            defaultValue={traitement?.dateTraitement}
          />
        </FormControl>
        <Button onClick={handleUpdateTraitement}>Modifier Traitement</Button>
      </VStack>
    </div>
  );
}
