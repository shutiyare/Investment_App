
import Navbar from '../../components/navbar/Navbar';
import { useStateContext } from '../../utils/state/StateContext';
import NavData from '../../utils/data/navData';


function Admin() {
  const {state} = useStateContext();
  const navdata = NavData(state);
  return (
    <div className='admin'>
      <div className='header'>
        <Navbar navdata={navdata} />
      </div>
      <div className='admin-page'>
          <div>Admin Page</div>
      </div>
    </div>
    
  )
}

export default Admin