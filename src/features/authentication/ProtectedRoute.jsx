import styled from "styled-components";
import Spinner from "../../ui/Spinner";

import { useCurrentUser } from "./useCurrentUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Container = styled.div`
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isLoading && !isAuthenticated) {
        console.log("HELOOO");
        navigate("/login", { replace: true });
      }
    },
    [isLoading, isAuthenticated, navigate]
  );

  if (isLoading)
    return (
      <Container>
        <Spinner />
      </Container>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
