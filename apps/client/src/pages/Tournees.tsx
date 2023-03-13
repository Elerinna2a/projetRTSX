import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tournee } from "../types/tournee.type";

export default function Tournees() {
  const [tournees, setTournees] = useState<Tournee[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/tournees")
      .then((res) => {
        setTournees(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div>
      <Flex>
        <Box>
          <Flex gap={3} justifyContent={"center"} mb={4}>
            <Heading>Tournees </Heading>
            <Link to="/create-tournee">
              <Button>
                <AddIcon />
              </Button>
            </Link>
          </Flex>

          {tournees.length === 0 ? (
            <p>Aucun tournee à faire</p>
          ) : (
            <>
              {tournees.map((tournee) => (
<<<<<<< HEAD
                <Flex key={tournee.idTournee}>
=======
                <>
>>>>>>> f17e9281fb353b8adf6960965551f9d2dbe7aa9c
                  <Flex mb={"4"} border={"1px solid gray"} p={"4"}>
                    <Flex alignItems={"center"} gap={4} justifyContent="center">
                      <Flex>
                        <Box>
                          <Heading size={"md"} mb={4}>
                            Collecte N°{tournee.idTournee}
                          </Heading>
                          <Box>
                            <p>
                              {" "}
                              <strong>Date</strong> : {tournee.dateTournee}{" "}
                            </p>
                            <p> Véhicule : {tournee.typeVehicule}</p>
                            <p> Remorque : {tournee.remorque}</p>
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
<<<<<<< HEAD
                </Flex>
=======
                </>
>>>>>>> f17e9281fb353b8adf6960965551f9d2dbe7aa9c
              ))}
            </>
          )}
        </Box>
      </Flex>
    </div>
  );
}
