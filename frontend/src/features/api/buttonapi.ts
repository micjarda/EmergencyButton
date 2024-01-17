import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { IBazaarData } from "./types/bazaardata";

// Define a service using a base URL and expected endpoints
export const buttonApi: any = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_HOST}/${import.meta.env.VITE_CONTEXT_PATH}/${import.meta.env.VITE_AWID}/`,
  }),
  tagTypes: ["allbuttondata"],
  endpoints: (builder) => ({
    callList: builder.mutation<IBazaarData[], string>({
      query: () => ({
        url: "patient/list",
        method: 'GET'
      }),
    }),
    callList1: builder.query<IBazaarData[], string>({
      query: () => `patient/list`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCallListMutation, useCallList1Query } = buttonApi;
export default buttonApi.reducer;
