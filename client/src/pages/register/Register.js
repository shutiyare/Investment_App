import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useStateContext } from '../../utils/state/StateContext';
import Registerinvestment from "../../components/register/Registerinvestment";
import NavData from '../../utils/data/navData';

function Register() {
  const {state} = useStateContext();
  const navdata = NavData(state);
  return (
    <div>
      <div className='header'>
        <Navbar navdata={navdata} />
      </div>
      <div className='page'>
        <div className='sidebar'>
          <Sidebar />
        </div>
        <div className='content'>
          <Registerinvestment username={navdata.username}/>
        </div>
      </div>
    </div>

  );
}

export default Register;
