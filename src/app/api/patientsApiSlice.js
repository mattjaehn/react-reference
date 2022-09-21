import { api } from '../api'



const tagExtractor = (ans=[], _err, _id) =>
[
    ...ans.map( ({id}) => ({ type: 'Patients', id }) ),
    ({ type: 'Patients', id: 'PARTIAL-LIST' })
];

const transformPatients = (p) => p;





/*
mport { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi
*/




//const patientsAdapter = createEntityAdapter({ error: null, });

export const patientsApi = ({ urlPath }) => api.injectEndpoints({
    endpoints: (build) => ({
        getPatients: build.query({
            query:
                ({pageNumber, pageSize}={}) =>
                    `${urlPath}/` +
                        (
                            pageNumber && pageSize
                            ? `?skip=${pageNumber * pageSize}&limit=${pageSize}`
                            : ''
                        ),
            providesTags:
                tagExtractor,
        }),
        getPatientsByOrg: build.query({
            query:
                ({orgId, pageNumber, pageSize}) =>
                    `${urlPath}/?org_id=${orgId}` +
                        (
                            pageNumber && pageSize
                            ? `&skip=${pageNumber * pageSize}&limit=${pageSize}`
                            : ''
                        ),
            providesTags:
                tagExtractor,
        }),

        /*
        async onCacheEntryAdded(patientId,
                {
                    cacheDataLoaded,
                    getCacheEntry,
                    cacheDataRemoved,
                },)
        {

            try {
                await cacheDataLoaded;
                // ok now let us move this over into our adapter...
                patientsAdapter.upsertOne(getCacheEntry());

                await cacheDataRemoved;
                patientAdapter.remove()
            } catch (err) {
                ;
                //console.log(`error in onCacheEntryAdded callback - ${util.err}`)
            }
        }
        */
    })
});
