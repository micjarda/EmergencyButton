import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { IBazaarData } from "./types/bazaardata";

// Define a service using a base URL and expected endpoints
export const shopApi: any = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://loaclhost:8080/api/`,
  }),
  tagTypes: ["allshopdata"],
  endpoints: (builder) => ({
    getLists: builder.query<IBazaarData[], string>({
      query: () => `bazaar/InitData`,
    }),
    getUsers: builder.query<IBazaarData[], string>({
      query: () => `bazaar/InitData`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetListsQuery, useGetUsersQuery } = shopApi;
export default shopApi.reducer;
