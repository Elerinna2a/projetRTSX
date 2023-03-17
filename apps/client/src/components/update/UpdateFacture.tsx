import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Facture } from "../../store/facture.store";

export default function UpdateFacture({}) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [facture, setFacture] = useState<Facture>();

  const dateFactureRef = useRef<HTMLInputElement | null>(null);
  const montantRef = useRef<HTMLInputElement | null>(null);
  const datePaiementFactureRef = useRef<HTMLInputElement | null>(null);
  const tierCompacteIdRef = useRef<HTMLInputElement | null>(null);
  const tiersCollecteIdRef = useRef<HTMLInputElement | null>(null);

  const handleUpdateFacture = async () => {
    const dateFacture = dateFactureRef.current?.value;
    const montant = montantRef.current?.value;
    const datePaiementFacture = datePaiementFactureRef.current?.value;
    const tierCompacteId = tierCompacteIdRef.current?.value;
    const tiersCollecteId = tiersCollecteIdRef.current?.value;

    try {
      if (
        tierCompacteId === undefined ||
        montant === undefined ||
        tiersCollecteId === undefined
      ) {
        return alert("error");
      }
      const response = await axios.put(`http://localhost:3000/factures/${id}`, {
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

  useEffect(() => {
    const getFacture = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/factures/${id}`
        );
        setFacture(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getFacture();
  }, [id]);
  return (
    <div>
      <VStack width={"30%"} m={"auto"}>
        <Heading>Modifier une Facture:</Heading>
        <FormControl isRequired>
          <FormLabel>Date création de la facture</FormLabel>
          <Input
            type="date"
            ref={dateFactureRef}
            defaultValue={facture?.dateFacture}
          />
          <FormLabel>Montant</FormLabel>
          <Input
            type="number"
            placeholder="Quantite de corps étranger"
            ref={montantRef}
            defaultValue={facture?.montant}
          />
          <FormLabel>Date paiement de la facture</FormLabel>
          <Input
            type="date"
            ref={datePaiementFactureRef}
            defaultValue={facture?.datePaiementFacture}
          />
          <FormLabel>Id du tiers Compacte</FormLabel>
          <Input
            type="number"
            placeholder="Id du tiers Compacte"
            ref={tierCompacteIdRef}
            defaultValue={facture?.tierCompacteId}
          />
          <FormLabel>Id N°BL</FormLabel>
          <Input
            type="number"
            placeholder="Id N°BL"
            ref={tiersCollecteIdRef}
            defaultValue={facture?.tiersCollecteId}
          />
        </FormControl>
        <Button onClick={handleUpdateFacture}>Modifier Facture</Button>
      </VStack>
    </div>
  );
}
