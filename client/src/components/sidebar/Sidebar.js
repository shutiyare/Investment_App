import { SidebarData } from './SidebarData';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'
function Sidebar() {
    return (
        <>
            <ul className='menu-items'>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <NavLink to={item.path} activeclassname="active">
                                    {item.icon}
                                    <span className='navtxt'>{item.title}</span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
        </>
    );
}

export default Sidebar