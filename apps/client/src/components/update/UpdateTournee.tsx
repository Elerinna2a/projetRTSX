import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tournee } from "../../types/tournee.type";

export default function UpdateTournee({}) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [tournee, settournee] = useState<Tournee>();

  const typeVehiculeRef = useRef<HTMLSelectElement | null>(null);
  const dateTourneeRef = useRef<HTMLInputElement | null>(null);
  const remorqueRef = useRef<HTMLSelectElement | null>(null);
  const chauffeurIdRef = useRef<HTMLInputElement | null>(null);

  const handleUpdatetournee = async () => {
    const typeVehicule = typeVehiculeRef.current?.value;
    const dateTournee = dateTourneeRef.current?.value;
    const remorque = remorqueRef.current?.value;
    const chauffeurId = chauffeurIdRef.current?.value;

    try {
      if (chauffeurId === undefined || chauffeurId === null) {
        return alert("Veuillez choisir un chauffeur");
      }

      const response = await axios.put(`http://localhost:3000/tournees/${id}`, {
        typeVehicule,
        dateTournee,
        remorque,
        chauffeurId: parseInt(chauffeurId),
      });
      navigate("/tournees");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const gettournee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/tournees/${id}`
        );
        settournee(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    gettournee();
  }, [id]);
  return (
    <div>
      <VStack width={"30%"} m={"auto"}>
        <Heading>Modifier une tournee:</Heading>
        <FormControl isRequired>
          <FormLabel>Date tournée </FormLabel>
          <Input
            placeholder={tournee?.dateTournee}
            type="date"
            ref={dateTourneeRef}
            defaultValue={tournee?.dateTournee}
          />
          <FormLabel>Type Vehicule</FormLabel>
          <Select ref={typeVehiculeRef} defaultValue={tournee?.typeVehicule}>
            <option value="FOURGON">Fourgon</option>
            <option value="NONARTICULE">Non-Articule</option>
            <option value="SEMIREMORQUE">Semi-Remorque</option>
          </Select>
          <FormLabel>Remorque ?</FormLabel>
          <Select ref={remorqueRef} defaultValue={tournee?.remorque}>
            <option value="OUI">Oui</option>
            <option value="NON">Non</option>
          </Select>
        </FormControl>
        {/* <FormControl>
          <FormLabel>Chauffeur ID</FormLabel>
          <Input
            type="number"
            ref={chauffeurIdRef}
            defaultValue={tournee?.chauffeurId}
          />
        </FormControl> */}
        <Button onClick={handleUpdatetournee}>Modifier tournee</Button>
      </VStack>
    </div>
  );
}
