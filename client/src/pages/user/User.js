import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useStateContext } from '../../utils/state/StateContext';
import NavData from '../../utils/data/navData';

function User() {
  const [state] = useStateContext();
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
          <div>
            <h1>User Regiseration Page</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
