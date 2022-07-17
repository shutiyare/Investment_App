import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';
import { useStateContext } from '../utils/state/StateContext';

function Homepage({ message }) {
  const [state] = useStateContext();
  const navdata = { logo: 'Dahabshiil Bank', userimg: state.user.userimg, username: state.user.username };
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
          <h1>CONTENT SECTION</h1>
          <p>{message}</p>
          <p>HELLO WORLD. THIS IS THE PAGE FOR CONTEX API</p>
        </div>
      </div>
    </div>

  )
}

export default Homepage