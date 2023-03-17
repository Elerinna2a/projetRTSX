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
  const datePaiementFactureRef = useRef<HTMLInputElement | null>(null);
  const tierCompacteIdRef = useRef<HTMLInputElement | null>(null);
  const tiersCollecteIdRef = useRef<HTMLInputElement | null>(null);

  const handleCreateFacture = async () => {
    const dateFacture = dateFactureRef.current?.value;
    const montant = montantRef.current?.value;
    const datePaiementFacture = datePaiementFactureRef.current?.value;
    const tierCompacteId = tierCompacteIdRef.current?.value;
    const tiersCollecteId = tiersCollecteIdRef.current?.value;
    try {
      if (
        montant === undefined ||
        tierCompacteId === undefined ||
        tiersCollecteId === undefined
      ) {
        return;
      }
      const response = await axios.post("http://localhost:3000/factures", {
        dateFacture,
        montant: parseFloat(montant),
        datePaiementFacture,
        tierCompacteId: parseInt(tierCompacteId),
        tiersCollecteId: parseInt(tiersCollecteId),
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
          <FormLabel>Date création de la facture</FormLabel>
          <Input type="date" ref={dateFactureRef} />
          <FormLabel>Montant</FormLabel>
          <Input type="float" ref={montantRef} />
          <FormLabel>Date paiement de la facture</FormLabel>
          <Input type="date" ref={datePaiementFactureRef} />
          <FormLabel>Id du tiers compacte</FormLabel>
          <Input type="number" ref={tierCompacteIdRef} />
          <FormLabel>Id Num BL</FormLabel>
          <Input type="number" ref={tiersCollecteIdRef} />
        </FormControl>
        <Button onClick={handleCreateFacture}>Creer Facture</Button>
      </VStack>
    </div>
  );
}
