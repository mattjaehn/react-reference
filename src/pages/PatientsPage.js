


import Reach from 'react';
//import { PatientsList } from '../components/Patients';
import { patientsApi } from '../app/api';





const PatientsPage = ({ ...args }) => {

  const { data, error } = patientsApi.endpoints.getPatients.useQuery();

  console.log(`data: ${JSON.stringify(data)}.`);
  return
    error
    ? (<h1>FREAKING ERROR!</h1>)
    : (
      <div>
        <h1>ok computer!</h1>
        <span>{JSON.stringify(data)}</span>
        <ul>
          {Object.values(data).map(p => (
            <li key={p.id}>
              <span>name: {p.name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default PatientsPage;