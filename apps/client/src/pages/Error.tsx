import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div>
      <p>Error 404 page not found...</p>
      <Button>
        <Link to="/">Home Page</Link>
      </Button>
    </div>
  );
}
