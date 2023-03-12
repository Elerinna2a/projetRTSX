import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Employe } from "../store/employe.store";

export default function employeDetails() {
  const [employe, setemploye] = useState<Employe>();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/employes/${id}`)
      .then((res) => {
        setemploye(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <>
      <VStack>
        <Button onClick={() => navigate(-1)}> Retour en arrière</Button>
        <Heading>Detail de la employe</Heading>
        {employe && (
          <Flex flexDirection={"column"}>
            <Text>ID : {employe.id}</Text>
            <Text>Nom : {employe.nom}</Text>
            <Text>Prenom : {employe.prenom}</Text>
            <Text>Adresse : {employe.adress}</Text>
            <Text>Téléphone : {employe.tel}</Text>
            <Text>Email : {employe.email}</Text>
            <Text> Role: {employe.role}</Text>
          </Flex>
        )}
      </VStack>
    </>
  );
}
