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
          <Flex gap={3} mb={4}>
            <Heading>Expeditions </Heading>
            <Link to="/create-expedition">
              <Button leftIcon={<AddIcon />} colorScheme="teal">
                Créer une expédition
              </Button>
            </Link>
          </Flex>

          <Flex justifyContent={"center"} flexWrap={"wrap"}>
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
              <>
                {expeditions.map((expedition) => (
                  <Flex
                    key={expedition.idNumBl}
                    mb={"4"}
                    border={"1px solid gray"}
                    p={"4"}
                    borderColor="teal"
                    borderRadius={"xl"}
                  >
                    <Flex
                      key={expedition.idNumBl}
                      alignItems={"center"}
                      gap={4}
                      justifyContent="center"
                    >
                      <Flex key={expedition.idNumBl}>
                        <Box>
                          <Heading size={"md"} mb={4}>
                            <Link to={`/expeditions/${expedition.idNumBl}`}>
                              BL N°{expedition.idNumBl}
                            </Link>
                          </Heading>
                          <Box key={expedition.idNumBl}>
                            <Text>
                              <strong> Date d'expédition </strong>:{" "}
                              {expedition.dateExpedition}{" "}
                            </Text>
                            <Text>
                              <strong> Destinataire </strong>:{" "}
                              {expedition.destinataire}{" "}
                            </Text>
                            <Text>
                              <strong> Nom de palette </strong>:{" "}
                              {expedition.nbPalette}{" "}
                            </Text>
                            <Text>
                              <strong>Poids Net total </strong>:{" "}
                              {expedition.poidNetTotal} kg{" "}
                            </Text>
                          </Box>
                        </Box>
                      </Flex>
                      <Flex gap={"4"} flexDirection="column">
                        <Button ml={6}>
                          <EditIcon color="teal" />
                        </Button>
                        <Button ml={6}>
                          <DeleteIcon color="crimson" />
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
              </>
            )}
          </Flex>
        </Box>
      </Flex>
    </div>
  );
}
