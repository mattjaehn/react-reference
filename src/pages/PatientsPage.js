


import Reach from 'react';
//import { PatientsList } from '../components/Patients';
import { usePatientsQuery } from '../app/api';
import { PatientsList } from '../components/Patients';




const PatientsPage = () => {

  return (
    <div>
      <h2>a page for patients</h2>
      <PatientsList />
    </div>
  )
};



const PxxatientsPage = ({ ...args }) => {

  const { data, error } = usePatientsQuery();

  console.log(`data: ${JSON.stringify(data)}.`);
  return (
      <div>
        <h1>ok computer!</h1>
        
        <ul>
          {Object.values(data).map(p => (
            <li key={p.id}>
              <span>name: {p.name}</span>
            </li>
          ))}
        </ul>
        <span>{JSON.stringify(data)}</span>
      </div>
    );
}

export default PatientsPage;