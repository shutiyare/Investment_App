
import { useNavigate } from "react-router-dom";
import {Button} from 'antd';

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div className="unauth">
      <div className="title">
        <h1>Unauthorized Access</h1>
      </div>
      <div className="infor">
        <p>You do not have access to the requested resources.</p>
      </div>
      <div className="action">
        <Button onClick={goBack} type="primary" shape="round" size="large">Go Back</Button>
      </div>
    </div>
  )
}

export default Unauthorized