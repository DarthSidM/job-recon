import { cloneElement } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import getDecodedToken from '../utils/getUser';

export default function Protected({ children }) {
	const location = useLocation();
	const user = getDecodedToken();

	if (!user) {
		return <Navigate to="/login" replace state={{ from: location }} />;
	}

	if (children) {
		return cloneElement(children, { user });
	}

	return <Outlet context={{ user }} />;
}
