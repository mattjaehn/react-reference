import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { baseApiUrl } from '../app/config';
import fakePatients from './fakePatients';
import  { uCopyDeep } from '../uUtil'; 

const patsPath = `${baseApiUrl}/patients`

const _pp = JSON.parse(JSON.stringify(fakePatients))

console.log(`number of fake patients: ${_pp.length}`)


const ids = fakePatients.map(p => p.id)
const patsDb = fakePatients.reduce(
  (acc, { id, ...p }) => ({ ...acc, [id]: { ...p, id }}),
  {})
const max = ll => ll.reduce((acc, x) => x > acc ? x : acc, ll[0])


export const handlers = [
    rest.get(patsPath, async (req, res, ctx) => {

        console.log(`rest.get(${patsPath}) begin...\n`);
        const [pageNumber, pageSize, orgId] = ['page', 'page_size', 'org_id']
            .map(
                x => req.url.searchParams.get(x)
            );
        
        console.log(`page: ${pageNumber}\npage_size: ${pageSize}\npatsDb: ${patsDb}`)

        let ansPats = []
        let ids = []
        for (const id in patsDb) ids.push(id)
        
        ids.sort()
        ansPats = ids.map(x => patsDb[x])

        console.log(`ansPats.length: ${ansPats.length}`)
        
        //ansPats.push(patsDb[id]) 

        // we apply paging first (kinda arbitrarily, sortof)
        let offset, limit;
        try {
            limit = parseInt(pageSize)
            offset = (parseInt(pageNumber) -1) * limit;
            ansPats = ansPats.slice(offset, offset + limit);
        } catch (e) { ; }

        console.log(`limit: ${limit}\noffset: ${offset}\nansPats.length: ${ansPats.length}`)

        ///try {
        //    orgId = parseInt(orgId);
        //    ansPats = ansPats.filter(x => x.orgId == orgId);
        //} catch (e) { ; }

        return res(
            ctx.json(ansPats));
    }),

    rest.get(`${patsPath}/:id`, async (req, res, ctx) => {
      const { id }= req.params
      if (! (id in patsDb))
        return res(ctx.status(404))
      return res(ctx.json(patsDb[id]))
    }),

    rest.post(patsPath, async (req, res, ctx) => {
      const newId = max(ids) + 1
      ids.push(newId)

      const newPat = { ...req.json(), id: newId }
      patsDb[newPat.id] = newPat
      return res(
        ctx.status(201),
        ctx.json(newPat),
      )
    }),

    rest.put(`${patsPath}/:id`, async(req, res, ctx) => {
      const { id } = req.params
      if (! (id in patsDb) )
        return res(ctx.status(404),)

      const updatedPat = req.json()
      if (updatedPat.id != id)
        return res(ctx.status(422))

      patsDb[id] = updatedPat

      return res(ctx.status(204))
    }),

    rest.delete(`${patsPath}/:id`, async (req, res, ctx) => {
      const {id} = req.params
      delete patsDb[id]
      ids.remove(id)

      return res(ctx.status(200))
    }),
];


//const fakeServer = setupServer(...handlers);
//export default fakeServer;