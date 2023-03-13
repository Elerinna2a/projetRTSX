import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Expedition } from "../types/expedition.type";

export default function Expeditions() {
  const [expeditions, setExpeditions] = useState<Expedition[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/expeditions")
      .then((res) => {
        setExpeditions(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div>
      <Flex>
        <Box>
          <Flex gap={3} justifyContent="center" mb={4}>
            <Heading>Expeditions </Heading>
            <Link to="/create-expedition">
              <Button>
                <AddIcon />
              </Button>
            </Link>
          </Flex>

          {expeditions.length === 0 ? (
            <Box>
              <Text>Voulez vous en créer un ?</Text>
              <Link to="/create-expedition">
                <Button>
                  <AddIcon />
                </Button>
              </Link>
            </Box>
          ) : (
            <Box>
              {expeditions.map((expedition) => (
                <Flex
                  key={expedition.idNumBl}
                  mb={"4"}
                  border={"1px solid gray"}
                  p={"4"}
                >
                  <Flex alignItems={"center"} gap={4} justifyContent="center">
                    <Flex>
                      <Box>
                        <Heading size={"md"} mb={4}>
                          BL N°{expedition.idNumBl}
                        </Heading>
                        <Box>
                          <Text>
                            Date d'expédition : {expedition.dateExpedition}{" "}
                          </Text>
                          <Text>Destinataire : {expedition.destinataire} </Text>
                          <Text>Nom de palette : {expedition.nbPalette} </Text>
                          <Text>
                            Poids Net total : {expedition.poidNetTotal} kg{" "}
                          </Text>
                          <Text>
                            ID tiers compacte : {expedition.tiersCompacteId}{" "}
                          </Text>
                          <Text>
                            ID du traitement :{" "}
                            <Link to={`expedition/${expedition.idNumBl}`}>
                              {expedition.traitementId}
                            </Link>{" "}
                          </Text>
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
              ))}
            </Box>
          )}
        </Box>
      </Flex>
    </div>
  );
}
