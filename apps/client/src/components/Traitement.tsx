import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { Traitement as Traitements } from "../types/traitement.type";

export default function Traitement() {
  const [cookies] = useCookies(["sessionid"]);
  const [traitements, setTraitements] = useState<Traitements[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/traitement")
      .then((res) => setTraitements(res.data))
      .catch((err) =>
        setError(
          "Impssible d'acceder a cette page car vos droit ne le permettant pas"
        )
      );
  }, []);

  return (
    <div>
      <Flex>
        <Box>
          <Flex gap={3} justifyContent={"center"} mb={4}>
            <Heading>Traitement </Heading>
            <Link to="">
              <Button>
                <AddIcon />
              </Button>
            </Link>
          </Flex>
          {traitements.length === 0 ? (
            <p>Aucun traitement à faire</p>
          ) : (
            <>
              {traitements.map((traitement) => (
                <div key={traitement.idTraitement}>
                  <Flex mb={"4"} border={"1px solid gray"} p={"4"}>
                    <Flex alignItems={"center"} gap={4} justifyContent="center">
                      <Flex>
                        <Box>
                          <Heading size={"md"}>
                            Traitement N°{traitement.idTraitement}
                          </Heading>
                          <Box>
                            <p> {traitement.dateTraitement} </p>
                            <p> {traitement.qualite} KG</p>
                            <p> {traitement.quantiteCorpsEtranger}</p>
                            <p> {traitement.scoringBonusMalus}</p>
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
                </div>
              ))}
            </>
          )}
        </Box>
      </Flex>
    </div>
  );
}
