import React from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { GET_ME, SIGN_OUT } from "../../queries";
import { useNavigate } from "react-router-dom";

function SignOutButton() {
  const client = useApolloClient();
  const [signOut] = useMutation(SIGN_OUT, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    await navigate("/");
    await client.writeQuery({
      query: GET_ME,
      data: {
        me: null,
      },
    });
    await client.resetStore();
  }

  return <button onClick={handleSignOut}>Sign out</button>;
}

export default SignOutButton;
