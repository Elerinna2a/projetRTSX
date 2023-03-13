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
      <Flex justifyContent="center">
        <Box>
          <Flex gap={3} mb={4}>
            <Heading>Expeditions </Heading>
            <Link to="/create-expedition">
              <Button>
                <AddIcon />
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
<<<<<<< HEAD
              <>
=======
              <Flex>
>>>>>>> f17e9281fb353b8adf6960965551f9d2dbe7aa9c
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
                            <Link to={`/expeditions/${expedition.idNumBl}`}>
                              BL N°{expedition.idNumBl}
                            </Link>
                          </Heading>
                          <Box>
                            <Text>
<<<<<<< HEAD
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
=======
                              Date d'expédition : {expedition.dateExpedition}{" "}
                            </Text>
                            <Text>
                              Destinataire : {expedition.destinataire}{" "}
                            </Text>
                            <Text>
                              Nom de palette : {expedition.nbPalette}{" "}
                            </Text>
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
>>>>>>> f17e9281fb353b8adf6960965551f9d2dbe7aa9c
                            </Text>
                          </Box>
                        </Box>
                      </Flex>
                      <Flex gap={"4"} flexDirection="column">
                        <Button ml={6}>
<<<<<<< HEAD
                          <EditIcon color="teal" />
                        </Button>
                        <Button ml={6}>
                          <DeleteIcon color="crimson" />
=======
                          <EditIcon />
                        </Button>
                        <Button ml={6}>
                          <DeleteIcon />
>>>>>>> f17e9281fb353b8adf6960965551f9d2dbe7aa9c
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
<<<<<<< HEAD
              </>
=======
              </Flex>
>>>>>>> f17e9281fb353b8adf6960965551f9d2dbe7aa9c
            )}
          </Flex>
        </Box>
      </Flex>
    </div>
  );
}
