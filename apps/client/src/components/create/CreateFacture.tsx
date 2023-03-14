import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateFacture() {
  const navigate = useNavigate();

  const dateFactureRef = useRef<HTMLInputElement | null>(null);
  const montantRef = useRef<HTMLInputElement | null>(null);
  const nomTierCollecteRef = useRef<HTMLInputElement | null>(null);
  const nomTiersTompacteRef = useRef<HTMLInputElement | null>(null);
  const num_expeditionRef = useRef<HTMLInputElement | null>(null);

  const handleCreateFacture = async () => {
    const dateFacture = dateFactureRef.current?.value;
    const montant = montantRef.current?.value;
    const nomTierCollecte = nomTierCollecteRef.current?.value;
    const nomTiersTompacte = nomTiersTompacteRef.current?.value;
    const num_expedition = num_expeditionRef.current?.value;
    try {
      if (montant === undefined) {
        return;
      }
      const response = await axios.post("http://localhost:3000/factures", {
        dateFacture,
        montant: parseFloat(montant),
        nomTierCollecte,
        nomTiersTompacte,
        num_expedition,
      });
      navigate("/factures");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <VStack width={"30%"} m={"auto"}>
        <Heading>Creer une facture</Heading>
        <FormControl isRequired>
          <FormLabel>Date </FormLabel>
          <Input type="date" ref={dateFactureRef} />
          <FormLabel>Montant</FormLabel>
          <Input type="float" ref={montantRef} />
          <FormLabel>Id du tiers collecte</FormLabel>
          <Input type="text" ref={nomTierCollecteRef} />
          <FormLabel>Id du tiers compacte</FormLabel>
          <Input type="text" ref={nomTiersTompacteRef} />
          <FormLabel>Id Num BL</FormLabel>
          <Input type="text" ref={num_expeditionRef} />
        </FormControl>
        <Button onClick={handleCreateFacture}>Creer Facture</Button>
      </VStack>
    </div>
  );
}
