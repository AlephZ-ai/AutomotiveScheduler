import graphqlDataProvider, 
{ 
    GraphQLClient,
    liveProvider as graphqlLiveProvider
 } from "@refinedev/nestjs-query"
import { createClient } from "graphql-ws";
import { fetchWrapper } from "./fetch-wrapper";

export const API_BASE_URL = 'https://api.crm.refine.dev'
export const API_URL = `${API_BASE_URL}/graphql` // Real graphQL API endpoint
export const WS_URL = 'wss://api.crm.refine.dev/graphql'

export const client = new GraphQLClient(API_URL, {
    fetch: (url: string, options: RequestInit) => {
        try {
            return fetchWrapper(url, options);
        } catch (error) {
            return Promise.reject(error as Error);
        }
    }
})

export const wsClient = typeof window !== "undefined" // Websocket for real time updates
    ? createClient({
        url: WS_URL,
        connectionParams: () => {
            const accessToken = localStorage.getItem('access_token');

            return {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        }
    })
    : undefined

export const dataProvider = graphqlDataProvider(client); // API specific data provider
export const liveProvider = wsClient ? graphqlLiveProvider(wsClient) : undefined; // API specific real time data provider