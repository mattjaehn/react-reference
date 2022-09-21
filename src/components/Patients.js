import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { patientsApi } from '../app/api';


import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  List,
  ListIcon,
  ListItem,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
  } from '@chakra-ui/react'






const consFiltersApplier = (filters) => (data) => {
  //TODO filter logic here
  /*p => {
    for ([k,v] in patientFilters) {
      if (p[k] != patientFilters[k])
          return false;
    }
    return true; */
  return true;
};




//const onSelect = (id) => { console.log(`onselect(${id})`) }



const PatientListItem = (p) =>
  <>
    <span>patientId: {p.id}</span>
    <span>orgId: {p.orgId}</span>
    <span>name: {p.name}</span>
  </>;

export const PatientsList = ({ orgId }) => {
  /*
   * useSelector is how we link up the redux -> react
   * flow of data.  selectPatients will pull the
   * patients out of the redux state (specifically,
   * the patients slice) and we then assign to a local
   * variable that we can use in the react elements.
   *
   * what useSelector does for us particularly is to
   * trigger re-render of this component whenever the
   * value of what is selected changes.
   */
  //const patients = useSelector(patientsSelector);
  const args = orgId ? { orgId } : {};
  const navigate = useNavigate();
  /*const { data } = orgId
              ? useGetPatientsByOrgQuery(orgId)
              : useGetPatientsQuery();
  */

  /*
    * useDispatch gives us the other direction of data
    * flow, react -> redux.  the redux state can only
    * be changed by dispatching actions.  and since
    * there is only ever one store for an application,
    * all components can access it the way in this
    * direction (react -> redux), i.e. by dispatching
    * actions.
    *
   */
  const dispatch = useDispatch();

  /*
    * not all state needs to be stored in redux.  in fact,
    * as a rule, no more state than is necessary should be stored
    * in redux.  redux state is more about representing
    * the actual model being displayed by a given react
    * component.  A great example would be the frontend
    * for a RESTful-ish API with the usual sort of CRUD
    * operations.  in our case here, a /patients api.
    * the patients api serves up a list of distinct,
    * persistent resources, specifically patients, and
    * these are pulled into the UI by the thunk actions
    * (such as fetchPatients) that we dispatch to the redux
    * store.
    *
    * further, since this state mirrors the state of the
    * backend RESTful-ish resources, of which there is only
    * one authoritative state at any given time, it is not
    * only "ok" but actually desirable that the redux state
    * hold this "globally" (in the sense that there is only
    * one per application.
    *
    * filtering the list of patients is a good example of
    * what should rather go into the react state - and
    * by react state what we mean specifically is the component
    * state, by which we mean even more specifically the local
    * variables closured into the component returned by
    * our functional component function.
    *
    * if the user of this component wants to filter out
    * patients with a status of "inactive" (for example),
    * that does nothing to change the state of any
    * actual patient.
    *
    * further, there may be other components displaying
    * patients from our patients slice, and we would like them
    * to have their own view state independent of the state
    * of this one (and conversely).
    *
    * the way we access the "local state of the component" is
    * through the `useState` hook.  the state is stored in
    * closured local variables, but in order to trigger
    * re-render of the component when these change, we need
    * some kind of hook to let react know to check.
    * so, somewhat analogous to the way `useSelector` hook
    * triggers re-render on redux state changes, `useState`
    * triggers re-render on react state changes.
   */

  //const doFiltering = consFiltersApplier(patientFilters);
  /**
   * RULES of Hooking:
   *
   * 1. NO CONDITIONAL EXECUTION: react tracks hooks by the order in which they are executed.
   * for this reason, it is very important that every hook execute each time a component
   * is rendered, and that the hooks are executed in the same order each render.  conditional
   * rendering could break that, since if a hook were conditionally NOT executed, then
   * that would mess up react s tracking for that hook, as well as every hook executed after it.
   *
   * 2. HOOKS MAY ONLY BE CALLED FROM THE TOP LEVEL OF A COMPONENT FUNCTION (never in for example,
   * an inner function), or from the top level of a custom hook.  (don t worry about custom hooks
   * now).
   *
   * 3. PREFIX ALL HOOK FUNCTION NAMES WITH `use`.  this is strictly a convention, but
   * it is one that facebook is very clear needs to be followed.  alot of the tools in
   * the react ecosystem assume this convention, apparently, and violating this simple
   * and reasonable convention brings risk of breaking only Marky Zuck knows what...
   */
  

  //const [readVariable, setFunction] = useState({});
  const [selected, select] = useState();
  const [patientFilters, setPatientFilters] = useState({});
  

  /**
    * for redux slices created using `createApiSlice` from the rtk-query/react
    * package (which is what patientsApi is),
    * creates hooks for the endpoints we define in such slices automatically.
    *
    * keep in mind, the motivation for these api slices is to reduce (redux pun intended)
    * boilerplate for CRUD interactions with RESTful-ish resources (webservices).
    *
    * here data is the selector - we use it like any other variable, and when 
    * its value changes, re-render of this component is triggered.  (this will
    * automatically cause any child components to re-render, cuz that is
    * what react does anyway.)
    */

   const { data, error } = patientsApi.endpoints.getPatients.useQuery();



  return (
    error
      ? (<>error trying to getPatients from api - {`${error}`}</>)
      : !data ? (
        <>loading...</>
      ) : (
        <>
        {selected && <span>you selected {selected} - good choice!</span>}
          <ul>
            {data.map((p) => (
              <li key={p.id}>
                <button onClick={() => select(`[${p.id}] - post.name`)}>{p.name}</button>
              </li>
            ))}
          </ul>
        </>
      )
  );
};


const yyy = ({doFiltering, data, onSelect}) => {
  //const navigate = useNavigate();
  
  return (
  <section>
    <ul>
      {
          data.filter(doFiltering).map(p => (
              <PatientListItem
                  key={p.id}
                  data={p}
    //              onSelect={(id) => navigate(`/patients/${id}}`)}
              />

          ))
      }
    </ul>
  </section>
);
}

const OrderListItem = ({ order: { id, ...o } }) => (
  <HStack>
    <span>id: {id}</span>
    <span>status: {o.status}</span>
  </HStack>
);

export const PatientDetail = ({ p }) => {
  <Flex>
  <Box>
    <Heading size="sm">
      {p.name}
    </Heading>
    <Divider />
    <HStack>
      <span>id: {p.id}</span>
      <span>orgId: {p.orgId}</span>
    </HStack>
    <ul>
      {p.orders.map(o => <OrderListItem key={o.id} order={o} />)}
    </ul>
  </Box>
  </Flex>
};



const Patients = () => {

  const { data, error, isLoading } = patientsApi.useGetPatientsQuery()
  return  (
  <div>
    <span>here are some patients:</span>
    <div>{JSON.stringify(data)}</div>
  </div>);
};

const x = () => {
  return (
  <div color="purple">
    <div><PatientsList />
      <span>NANCY MADE ME TAKE DOWN THE WEBSITE WRONG!</span>
    </div>
  </div>
  )
};


//const Patients = (<span><h2>How many times did you reboot?</h2></span>)


export default Patients