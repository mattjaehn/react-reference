
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { createEntityAdapter } from '@reduxjs/toolkit';

import { baseApiUrl } from './config';


const patientsAdapter = createEntityAdapter({
  sortComparer: (a,b) => `${a.id}`.localeCompare(`${b.id}`),
})

/*
interface Patient {
  id: string
  firstName: string
  lastName: string
  providerOrgId string
  orderIds string[]
}

interface Page<T> {
  page: number
  per_page: number
  total_pages: number
  data: T[]
}

*/



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
  tagTypes: ['Patient',],
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   * If you want all endpoints defined in the same file, they could be included here instead
   */
  endpoints: (builder) => ({

    patients: builder.query({
      query: (page=1) => `patients?page=${page}&page_size=${10}}`,
      providesTags: (result, err, qryArg) => {
        console.log(`result - ${JSON.stringify(result)}`)
        return result
        ? [
            {type: 'Patient', id: '*'},
            //...result.map(({id}) => ({type: 'Patient', id}))
        ]
        : [{type: 'Patient', id: '*'},]
      },
      //transformResponse: (resp) =>
      //  patientsAdapter.addMany(
      //      patientsAdapter.getInitialState(),
      //      resp),
    }),
    patient: builder.query({
      query: (id) => `patient/${id}`,
      providesTags: (result, err, qryArg) =>
        result
        ? [{ type: 'Patient', id: qryArg }]
        : [],
      //transformResponse: (resp) =>
        //patientsAdapter.addOne(resp),
    }),

    createPatient: builder.mutation({
      query: ({ ...p }) => ({
        url: `patients`,
        method: 'POST',
        body: p,
      }),
      invalidatesTags: (result, err, qryArg) =>
        result ? [{type: 'Patient', id: '*'}] : [],
      //transformResponse: (resp) =>
        //patientsAdapter.addOne(resp),
    }),

    updatePatient: builder.mutation({
      query: ({ id, ...p }) => ({
        url: `patients/${id}`,
        method: 'PUT',
        body: p,
      }),
      invalidatesTags: (result, err, qryArg) =>
        result
        ? [{ type: 'Patient', id: qryArg }]
        : [],

      //transformResponse: (resp) =>
        //patientsAdapter.addOne(resp),
    }),
    deletePatient: builder.mutation({
      query: (id) => ({
        url: `patients/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_ignoreItems, _err, id) =>
        [{type: 'Patient', id: id}],

      //transformResponse: (resp) =>
      //  patientsAdapter.removeOne(resp),
    }),

  }),
})




export const {
  useUpdatePatientMutation,
  usePatientsQuery,
  usePrefetch,
} = patientsApi;




/*
export const enhancedApi = api.enhanceEndpoints({
    endpoint: () => ({
        healthCheck: () => 'ok computer',
    })
});
*/
