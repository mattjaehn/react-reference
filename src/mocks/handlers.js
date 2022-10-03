import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { baseApiUrl } from '../app/config';
import fakePatients from './fakePatients';
import  { uCopyDeep } from '../uUtil'; 

const getPatientsPath = `${baseApiUrl}/patients`



export const handlers = [
    rest.get(getPatientsPath, async (req, res, ctx) => {

        console.log(`rest.get(${getPatientsPath}) begin...\n`);
        const [pageNumber, pageSize, orgId] = ['pageNumber', 'pageSize', 'orgId']
            .map(
                x => req.url.searchParams.get(x)
            );

        const ansPats = uCopyDeep(fakePatients);

        // we apply paging first (kinda arbitrarily, sortof)
        let offset, limit;
        try {
            limit = parseInt(pageSize);
            offset = parseInt(pageNumber) * limit;
            ansPats = ansPats.slice(offset, limit);
        } catch (e) { ; }

        try {
            orgId = parseInt(orgId);
            ansPats = ansPats.filter(x => x.orgId == orgId);
        } catch (e) { ; }

        return res(
            ctx.json(ansPats.slice(0,7)));
    }),
];


//const fakeServer = setupServer(...handlers);
//export default fakeServer;