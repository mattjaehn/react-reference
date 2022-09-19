import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import _ from 'lodash';

const DEFAULT_PAGE_SIZE=  64;



/*
 * here, we are assuming a list of objects, each of which
 * has an id attribute called `id`. and we are normalizing
 * in the sense expected by `createEntityAdapter`.
 */
export async function normalizeApiData(entities) {
    return _
        .chain(entities)
        .clone(true)
        .reduce(
            ({ ids, entities }, val) =>
                ({ ids: [ ...ids, val.id ],
                    entities: {
                        ...entities,
                        [val.id]: val } }),
                {ids:[], entities:{}})
        .value();
}



/**
 * generalized CRUD endpoints, based on rtk-query.
 *
 * builds endpoint elements in the manner taken
 * by `apiSlice::injectEndpoints`.
 *
 * @param {Object} params
 * @param {String} params.urlPath the url path for the resource, relative. NOTE that there should be NO trailing slash.
 * @param {String} params.singular the name for one of this kind of resource, capitalized.
 * @param {String} params.plural the name for multiple of this kind of resource, capitalized.
 */
export const consUEndpoints =
    ({
        urlPath,
        singular,
        plural,
    }) => (build) => ({

        [`get${plural}`]: build.query({
            query:
                ({page, pageSize}={}) =>
                    `${urlPath}/` +
                        (
                            page && pageSize
                            ? `?skip=${page * pageSize}&limit=${pageSize}`
                            : ''
                        ),
            providesTags:
                (ans=[]) =>
                    [
                        ...ans.map( ({id}) => ({ type: plural, id }) ),
                        ({ type: plural, id: 'PARTIAL-LIST' })
                    ]
        }),

        [`get${singular}`]: build.query({
            query:
                (id) => `${urlPath}/${id}`,
            providesTags:
                (_ignoreItems, _err, id) => [ { type: plural, id } ],
        }),

        [`add${singular}`]: build.mutation({
            query: (body) => ({
                url: `${urlPath}/`,
                method: 'POST',
                body,
            }),
            invalidatesTags: (_ignoreItems, _err, id) =>
                [{ type: plural, id }]
        }),

        [`update${singular}`]: build.mutation({
            query: (data) => {
                const { id, ...body } = data;
                return {
                    url: `${urlPath}/${id}`,
                    method: 'PUT',
                    body };
                },
            invalidatesTags: (_ignoreItems, _err, id) => [{ type: plural, id }]
        }),

        [`delete${singular}`]: build.mutation({
            query: (id) => ({
                url: `${urlPath}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_ignoreItems, _err, id) => [{ type: plural, id }]
        }),
    });





