import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { withApollo } from "next-with-apollo";
import { getDataFromTree } from '@apollo/client/react/ssr';
import { endPoint } from "../config";

function createClient({ headers, initialState }) {
    const cache = new InMemoryCache({
        typePolicies: {}
    }).restore(initialState || {});

    return new ApolloClient({
        ssrMode: true,
        link: createHttpLink({
            uri: endPoint,
            fetchOptions: {
                credentials: 'include'
            },
            headers
        }),
        cache
    });
}

export default withApollo(createClient, { getDataFromTree });