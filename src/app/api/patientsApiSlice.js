import { retry } from '@reduxjs/toolkit/query/react'
import { api } from './api'



const tagExtractor = (ans=[], _err, _id) =>
[
    ...ans.map( ({id}) => ({ type: 'Patients', id }) ),
    ({ type: 'Patients', id: 'PARTIAL-LIST' })
];

const transformPatients = (p) => p;


const patientsAdapter = createEntityAdapter({
    error: null,
});

export const postsApi = ({ urlPath }) => api.injectEndpoints({
    endpoints: (build) => ({
        getPatients: build.query({
            query:
                ({page, pageSize}={}) =>
                    `${urlPath}/` +
                        (
                            page && pageSize
                            ? `?skip=${page * pageSize}&limit=${pageSize}`
                            : ''
                        ),
            providesTags:
                tagExtractor,
        }),
        getPatientsByOrg: build.query({
            query:
                ({orgId, page, pageSize}) =>
                    `${urlPath}/?org_id=${orgId}` +
                        (
                            page && pageSize
                            ? `&skip=${page * pageSize}&limit=${pageSize}`
                            : ''
                        ),
            providesTags:
                tagExtractor,
        }),

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
    })
});

export const {
  useAddPostMutation,
  useDeletePostMutation,
  useGetPostQuery,
  useGetPostsQuery,
  useLoginMutation,
  useUpdatePostMutation,
  useGetErrorProneQuery,
} = postsApi

export const {
  endpoints: { login, getPost },
} = postsApi
