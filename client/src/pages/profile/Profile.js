import { Tabs } from 'antd';
import Changephoto from '../../components/editprofile/Changephoto';
import Changepassword from '../../components/editprofile/Changepassword';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useStateContext } from '../../utils/state/StateContext';
import NavData from '../../utils/data/navData';
import './Profile.css'

const { TabPane } = Tabs;

function Profile() {
  const {state, setState} = useStateContext();
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
          <div className='profile'>
            <h1>Edit user Profile</h1>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Change Profile Photo" key="1">
                <Changephoto state={state} setState={setState}/>
              </TabPane>
              <TabPane tab="Change Password" key="2">
                <Changepassword />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
