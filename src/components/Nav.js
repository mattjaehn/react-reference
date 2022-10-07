
import { Link } from 'react-router-dom';
import { Login } from './AuthComponents'

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
        <li>
          <Link to="/secure/secret">secrets!</Link>
        </li>
      </ul>
    </>
  );
};

export default Nav;