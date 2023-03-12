import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Collecte } from "../store/collecte.store";

export default function CollecteDetails() {
  const [collecte, setCollecte] = useState<Collecte>();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/collectes/${id}`)
      .then((res) => {
        setCollecte(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]); // Ajouter id comme dépendance pour que l'effet s'exécute lorsque l'ID change

  return (
    <>
      <VStack>
        <Button onClick={() => navigate(-1)}> Retour en arrière</Button>
        <Heading>Detail de la collecte</Heading>
        {collecte && (
          <Flex flexDirection={"column"}>
            <Text>ID : {collecte.idNumLot}</Text>
            <Text>Quantite : {collecte.quantite}</Text>
            <Text>Forme de la collecte : {collecte.formeCollecte}</Text>
            <Text>Id de l'opérateur : {collecte.traitementId}</Text>
            <Text>Date de la collecte : {collecte.dateCollecte}</Text>
          </Flex>
        )}
      </VStack>
    </>
  );
}
