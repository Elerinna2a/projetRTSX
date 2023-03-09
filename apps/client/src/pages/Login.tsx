import { Button, Flex, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useRef } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { setEmploye } from "../store/employe.store";

const Login = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["sessionid"]);

  function onClickSubmitForm() {
    try {
      axios
        .post("http://localhost:3000/auth/login", {
          email: emailRef?.current?.value,
          password: passwordRef?.current?.value,
        })
        .then((res) => {
          console.log(res.data);
          setCookie("sessionid", res.data.sessionid);
          setEmploye(res.data.employe);
          navigate("/");
        })
        .catch((err) => {
          console.log("Password or email is incorrect" + err.message);
          alert("Password or email is incorrect");
        });
    } catch (err) {
      console.log("error on login");
      alert("Error on login");
    }
  }

  return (
    <>
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        width="50%"
        m={"auto"}
        gap={4}
        height={"30vh"}
      >
        <Text fontSize={"4xl"}>Login</Text>
        <Input ref={emailRef} type="text" placeholder="Email" />
        <Input ref={passwordRef} type="text" placeholder="Password" />
        <Button onClick={onClickSubmitForm}>Connexion</Button>
      </Flex>
    </>
  );
};

export default Login;
