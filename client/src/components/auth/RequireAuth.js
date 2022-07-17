import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from '../../utils/state/StateContext';

const RequireAuth = ({ allowedRoles }) => {
    const {state} = useStateContext();
    const location = useLocation();
    return (
        allowedRoles?.includes(state?.auth?.role)
            ? <Outlet />
            : state?.auth
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;