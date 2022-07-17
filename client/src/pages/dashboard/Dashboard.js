import { Statistic, Card } from 'antd';
import BarChart from '../../components/charts/BarChart';
import LineaChart from '../../components/charts/LineaChart';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import NavData from '../../utils/data/navData';
import { useStateContext } from '../../utils/state/StateContext';
import './Dashboard.css'

function Dashboard() {
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

          <div className='dashboard'>
            <h1>Investment Analytics</h1>
            <div className='client-stats'>
              <Card className='card'>
                <Statistic title="Served Clients" value={1278} />
              </Card>
              <Card className='card'>
                <Statistic title="Total Investment" value={8345678} valueStyle={{ color: '#3f8600' }} prefix="$" />
              </Card>
            </div>
            <div>
              <div className='client-charts'>
                <h2>Last year's served customers</h2>
                <BarChart />
              </div>
              <div className='client-charts'>
                <h2>12 Months Investment plot</h2>
                <div className='chart'>
                  <LineaChart />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
