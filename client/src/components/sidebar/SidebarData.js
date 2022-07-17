import {DashboardOutlined, FileSearchOutlined, IdcardOutlined, ProfileOutlined} from '@ant-design/icons'

export const SidebarData = [
    {
        title:'Dashboard',
        path: '/',
        icon: <DashboardOutlined />,
        cName: 'nav-text'
    },
    {
        title:'Query',
        path: '/query',
        icon: <FileSearchOutlined />,
        cName: 'nav-text'
    },
    {
        title:'Register',
        path: '/register',
        icon: <IdcardOutlined />,
        cName: 'nav-text'
    },
    {
        title:'Profile',
        path: '/profile',
        icon: <ProfileOutlined />,
        cName: 'nav-text'
    }
]
