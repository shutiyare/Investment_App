import { Input } from 'antd'
import { useState } from 'react';
import Queryresult from '../../components/queryresult/Queryresult';
import Querydata from '../../utils/data/InvData.json'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useStateContext } from '../../utils/state/StateContext';
import NavData from '../../utils/data/navData';
import './Query.css'
const { Search } = Input;

function Query() {
  const {state} = useStateContext();
  const navdata = NavData(state);
  const [searchError, setSearchError] = useState(false);
  const [showResults, setShowResults] = useState(false)
  // console.log(Querydata[0]);
  const onSearch = val => {
    if (!val.trim() || !(/^[0-9]*$/.test(val))) {
      setSearchError(true);
      setShowResults(false);
    }
    else {
      setSearchError(false);
      setShowResults(true);
      console.log('No error found, proceed to query')
    }
  }
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

          <div className='query'>
            <h2>Query Customer</h2>
            <div className='params'>
              <h3>Customer Account No </h3>
              <Search placeholder="Enter Customer Account" size='large'
                onSearch={onSearch} enterButton />
              {searchError && <label className='error'>Invalid Account No</label>}
            </div>
            {showResults && <Queryresult dataSource={[Querydata[2]]} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Query;
