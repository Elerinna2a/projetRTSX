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
import { Collecte as Collectes } from "../../types/collecte.type";

export default function UpdateCollecte({}) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [collecte, setCollecte] = useState<Collectes>();

  const idNumLotRef = useRef<HTMLInputElement | null>(null);
  const nomTierCollecteRef = useRef<HTMLInputElement | null>(null);
  const quantiteRef = useRef<HTMLInputElement | null>(null);
  const formeRef = useRef<HTMLSelectElement | null>(null);
  const dateCollecteRef = useRef<HTMLInputElement | null>(null);
  const traitementIdRef = useRef<HTMLInputElement | null>(null);
  const employeIdRef = useRef<HTMLInputElement | null>(null);
  const tiersCollecteRef = useRef<HTMLInputElement | null>(null);

  const handleUpdateCollecte = async () => {
    const idNumLot = idNumLotRef.current?.value;
    const nomTierCollecte = nomTierCollecteRef.current?.value;
    const quantite = quantiteRef.current?.value;
    const formeCollecte = formeRef.current?.value;
    // const traitementId = traitementIdRef.current?.value;
    // const employeId = employeIdRef.current?.value;
    // const TierCollecte = tiersCollecteRef.current?.value;
    try {
      if (quantite === null || quantite === undefined) {
        return;
      }
      const parsedQuantite = parseInt(quantite);
      if (isNaN(parsedQuantite)) {
        return;
      }
      const response = await axios.put(
        `http://localhost:3000/collectes/${id}`,
        {
          idNumLot,
          nomTierCollecte,
          quantite: parsedQuantite,
          formeCollecte,
          // traitementId,
          // employeId,
          // TierCollecte,
        }
      );
      navigate("/collectes");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getCollecte = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/collectes/${id}`
        );
        setCollecte(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCollecte();
  }, [id]);
  return (
    <div>
      <VStack width={"30%"} m={"auto"}>
        <Heading>Modifier une collecte:</Heading>
        <FormControl isRequired>
          <FormLabel>Nom du tier</FormLabel>
          <Input
            placeholder={collecte?.nomTierCollecte}
            type="text"
            ref={nomTierCollecteRef}
            defaultValue={collecte?.nomTierCollecte}
          />
          <FormLabel>Quantite</FormLabel>
          <Input
            type="number"
            ref={quantiteRef}
            defaultValue={collecte?.quantite}
          />
          <FormLabel>Forme</FormLabel>
          <Select
            placeholder={collecte?.formeCollecte}
            ref={formeRef}
            defaultValue={collecte?.formeCollecte}
          >
            <option value="SAC">Sac</option>
            <option value="VRAC">Vrac</option>
            <option value="PALETTE">Palette</option>
          </Select>
          {/* <FormLabel>ID du traitement</FormLabel>
          <Input
            type="number"
            ref={traitementIdRef}
            defaultValue={collecte?.traitementId}
          />
          <FormLabel>Id de l'employé</FormLabel>
          <Input
            type="text"
            ref={employeIdRef}
            defaultValue={collecte?.employeeId}
          />
          <FormLabel>Tier collecté</FormLabel>
          <Input
            ref={tiersCollecteRef}
            value={collecte?.tierCollecte?.toString()}
          /> */}
        </FormControl>
        <Button onClick={handleUpdateCollecte}>Modifier collecte</Button>
      </VStack>
    </div>
  );
}
