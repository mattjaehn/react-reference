
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

import { baseApiUrl } from './config';


// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: baseApiUrl,
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 })

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const patientsApi = createApi({
  /**
   * `reducerPath` is optional and will not be required by most users.
   * This is useful if you have multiple API definitions,
   * e.g. where each has a different domain, with no interaction between endpoints.
   * Otherwise, a single API definition should be used in order to support tag invalidation,
   * among other features
   */
  reducerPath: 'patientsApi',
  /**
   * A bare bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
   */
  baseQuery: baseQuery,  //baseQueryWithRetry,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  tagTypes: ['Patients', 'Orders',],
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   * If you want all endpoints defined in the same file, they could be included here instead
   */
  endpoints: (builder) => ({

    patients: builder.query({
      query: () => `patients`,
    }),
    patient: builder.query({
      query: (id) => `patient/${id}`,
    }),

    updatePatient: builder.mutation({
      query: ({ id, ...p }) => ({
        url: `/patients/${id}`,
        method: 'PUT',
        body: p,
      })
    }),
    deletePatient: builder.mutation({
      query: (id) => ({
        url: `/patients/${id}`,
        method: 'DELETE',
      })
    })

  }),
})




export const {
  usePatientsQuery,
} = patientsApi;




/*
export const enhancedApi = api.enhanceEndpoints({
    endpoint: () => ({
        healthCheck: () => 'ok computer',
    })
});
*/
