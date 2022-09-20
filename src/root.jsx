export default function Root() {
    return
      <div>
        <h2>Patients</h2>
        <div>
          <form id='search-patients' role='search'>
            <input
              id='patients'
              placeHolder='search for a patient'
              type='search'
              name='patsearch'/>
          </form>
        </div>
      </div>;
}