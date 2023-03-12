import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Employe } from "../store/employe.store";

export default function Employes() {
  const [employes, setEmployes] = useState<Employe[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/employes")
      .then((res) => setEmployes(res.data))
      .catch((err) =>
        setError(
          "Impssible d'acceder a cette page car vos droit ne le permettant pas"
        )
      );
  }, []);

  const f = new Intl.DateTimeFormat("fr-fr", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <div>
      <Flex>
        <Box>
          <Flex gap={3} justifyContent={"center"} mb={4}>
            <Heading>Employes </Heading>
            <Link to="/create-employe">
              <Button>
                <AddIcon />
              </Button>
            </Link>
          </Flex>

          {employes.length === 0 ? (
            <>
              <Text>Voulez vous en créer un ?</Text>
              <AddIcon />
            </>
          ) : (
            <>
              {employes.map((employe) => (
                <>
                  <Flex mb={"4"} border={"1px solid gray"} p={"4"}>
                    <Flex alignItems={"center"} gap={4} justifyContent="center">
                      <Flex>
                        <Box>
                          <Heading size={"md"} mb={4}>
                            employe N°{employe.id}
                          </Heading>
                          <Box>
                            <Text>Nom : {employe.nom} </Text>
                            <Text>Prénom : {employe.prenom} </Text>
                            <Text>Adresse : {employe.adress} </Text>
                            <Text>Téléphone : {employe.tel} </Text>
                            <Text>Role : {employe.role} </Text>
                          </Box>
                        </Box>
                      </Flex>
                      <Flex gap={"4"} flexDirection="column">
                        <Button ml={6}>
                          <EditIcon />
                        </Button>
                        <Button ml={6}>
                          <DeleteIcon />
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                </>
              ))}
            </>
          )}
        </Box>
      </Flex>
    </div>
  );
}
