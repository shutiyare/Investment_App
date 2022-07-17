import { Button, Typography } from 'antd';
import { useStateContext } from '../../utils/state/StateContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const { Text, Link } = Typography;
function Navbar({ navdata }) {
    console.log("navigation data =>", navdata)
    const { setState } = useStateContext();
    const navigate = useNavigate();
    const logout = () => {
        setState({});
        navigate("/");

    }
    return (
        <div className='navbar'>
            <div className="logo"><Link href="/">{navdata.logo}</Link></div>
            <div>
                <div className='user'>
                    <img src={`/api/rsc/images/${navdata.userphoto}`} alt='user' />
                    <Text className='username'>{navdata.username}</Text>
                    <Button type="link" onClick={logout}>Logout</Button>
                </div>
            </div>
        </div>
    );
}

export default Navbar