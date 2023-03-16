import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Tournee } from "../../types/tournee.type";

export default function TourneeDetails() {
  const [tournee, setTournee] = useState<Tournee>();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/tournees/${id}`)
      .then((res) => {
        setTournee(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]); // Ajouter id comme dépendance pour que l'effet s'exécute lorsque l'ID change

  return (
    <>
      <VStack>
        <Button onClick={() => navigate(-1)}> Retour en arrière</Button>
        <Heading>Detail de la tournee</Heading>
        {tournee && (
          <Flex flexDirection={"column"}>
            <Text>
              {" "}
              <strong>ID :</strong> {tournee.idTournee}
            </Text>
            <Text>
              {" "}
              <strong> Date de la tournee :</strong> {tournee.dateTournee}
            </Text>
            <Link to={`/employes/${tournee.chauffeurId}`}>
              <Text>Id de du chauffeur : {tournee.chauffeurId}</Text>
            </Link>
            <Text>Type de véhicule utilisé : {tournee.typeVehicule}</Text>
            <Text>Remorque : {tournee.remorque}</Text>
          </Flex>
        )}
      </VStack>
    </>
  );
}
