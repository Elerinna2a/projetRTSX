import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Mainlayout = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth={"full"} gap={4}>
        <Outlet />
      </Container>
    </>
  );
};

export default Mainlayout;
