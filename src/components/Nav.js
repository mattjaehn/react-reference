
import { Link } from 'react-router-dom';


const Nav = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Main</Link>
        </li>
        <li>
          <Link to="/patients">Patients</Link>
        </li>
      </ul>
    </>
  );
};

export default Nav;