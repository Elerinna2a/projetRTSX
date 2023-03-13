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
import { Employe } from "../../types/employe.types";

export default function UpdateEmploye({}) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employe, setEmploye] = useState<Employe>();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const nomRef = useRef<HTMLInputElement | null>(null);
  const prenomRef = useRef<HTMLInputElement | null>(null);
  const adresseRef = useRef<HTMLInputElement | null>(null);
  const telRef = useRef<HTMLInputElement | null>(null);
  const roleRef = useRef<HTMLSelectElement | null>(null);

  const handleUpdateEmploye = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const nom = nomRef.current?.value;
    const prenom = prenomRef.current?.value;
    const adresse = adresseRef.current?.value;
    const tel = telRef.current?.value;
    const role = roleRef.current?.value;
    try {
      const response = await axios.put(`http://localhost:3000/employes/${id}`, {
        email,
        password,
        nom,
        prenom,
        adresse,
        tel,
        role,
      });
      navigate("/employes");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getEmploye = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/employes/${id}`
        );
        setEmploye(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getEmploye();
  }, [id]);

  return (
    <div>
      <VStack width={"30%"} m={"auto"}>
        <Heading>Modifier un Employe:</Heading>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder={employe?.email}
            type="email"
            ref={emailRef}
            defaultValue={employe?.email}
          />
          <FormLabel>Password</FormLabel>
          <Input
            placeholder={employe?.password}
            type="password"
            ref={passwordRef}
            defaultValue={employe?.password}
          />
          <FormLabel>Nom</FormLabel>
          <Input
            placeholder={employe?.nom}
            type="text"
            ref={nomRef}
            defaultValue={employe?.nom}
          />
          <FormLabel>Prenom</FormLabel>
          <Input
            placeholder={employe?.prenom}
            type="text"
            ref={prenomRef}
            defaultValue={employe?.prenom}
          />
          <FormLabel>Adresse</FormLabel>
          <Input
            placeholder={employe?.adresse}
            type="text"
            ref={adresseRef}
            defaultValue={employe?.adresse}
          />
          <FormLabel>Telephone</FormLabel>
          <Input
            placeholder={employe?.tel}
            type="text"
            ref={telRef}
            defaultValue={employe?.tel}
          />
          <FormLabel>Role</FormLabel>
          <Select
            placeholder={employe?.role}
            ref={roleRef}
            value={employe?.role}
          >
            <option value={"ADMIN"}>ADMIN</option>
            <option value={"CLIENT"}>CLIENT</option>
            <option value={"OPERATEUR"}>OPERATEUR</option>
            <option value={"CHAUFFEUR"}>CHAUFFEUR</option>
          </Select>
        </FormControl>
        <Button onClick={handleUpdateEmploye}>Modifier Employe</Button>
      </VStack>
    </div>
  );
}
