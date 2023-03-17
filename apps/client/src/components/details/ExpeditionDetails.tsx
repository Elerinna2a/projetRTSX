import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Expedition } from "../../store/expedition.store";

export default function ExpeditionDetails() {
  const [expedition, setExpedition] = useState<Expedition>();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/expeditions/${id}`)
      .then((res) => {
        setExpedition(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <>
      <VStack>
        <Button onClick={() => navigate(-1)}> Retour en arrière</Button>
        <Heading>Detail de la expedition</Heading>
        {expedition && (
          <Flex flexDirection={"column"}>
            <Text>ID : {expedition.idNumBl}</Text>
            {/* <Text>Date de l'expédition : {expedition.dateExpedition}</Text> */}
            <Text>Destinataire : {expedition.destinataire}</Text>
            <Text>Nombre de palettes : {expedition.nbPalette}</Text>
            <Text>Poids net Total : {expedition.poidNetTotal}kg</Text>
            {/* si {expedition.traitementId} est vide alors n'affiche rien  */}
            {expedition.traitementId && (
              <Link to={`traitements/${expedition.traitementId}`}>
                <Text>ID du traitement : {expedition.traitementId}</Text>
              </Link>
            )}
            {expedition.tiersCompacteId && (
              <Link to={`tierscompactes/${expedition.tiersCompacteId}`}>
                <Text>ID du tiers Compacte : {expedition.tiersCompacteId}</Text>
              </Link>
            )}
            {expedition.factureId && (
              <Link to={`factures/${expedition.factureId}`}>
                <Text>ID de la facture : {expedition.factureId}</Text>
              </Link>
            )}
          </Flex>
        )}
      </VStack>
    </>
  );
}
