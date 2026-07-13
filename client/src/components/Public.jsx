import { Navigate, Outlet, useLocation } from 'react-router-dom';
import getDecodedToken from '../utils/getUser';

export default function Public({ children }) {
	const location = useLocation();
	const user = getDecodedToken();

	if (user) {
		return <Navigate to="/dashboard" replace state={{ from: location }} />;
	}

	if (children) {
		return children;
	}

	return <Outlet />;
}
