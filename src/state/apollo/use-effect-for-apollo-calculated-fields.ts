import { useEffect } from "react";

import { useApolloClient } from "@apollo/react-hooks";

export function useEffectForApolloCalculatedFields(query: any, action: any) {
  const client = useApolloClient();

  useEffect(() => {
    client.watchQuery({ query }).subscribe(({ data }) => {
      action(data);
    });
  }, [client]);
}
