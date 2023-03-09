import { Button, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { removeEmploye } from "../store/employe.store";

export default function Error() {
  const [cookies, , removeCookie] = useCookies(["sessionid"]);
  const navigate = useNavigate();

  function onClickLogout() {
    axios
      .post("http://localhost:3000/auth/logout/", {
        sessionId: cookies.sessionid,
      })
      .then(() => {
        removeCookie("sessionid");
        removeEmploye();
        navigate("/login");
      })
      .catch((err) => {
        console.log("error" + err);
      });
  }
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      gap={4}
      flexDirection={"column"}
      height={"30vh"}
    >
      <p>Error 404 page not found...</p>
      <Button onClick={onClickLogout}>
        <Link to="/">Home Page</Link>
      </Button>
    </Flex>
  );
}
