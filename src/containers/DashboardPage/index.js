/**
 *
 * HomePage
 *
 */

import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useInjectSaga} from 'utils/injectSaga';
// Import Actions
import {isLoggedAction} from 'containers/DashboardPage/actions';

import saga from 'containers/DashboardPage/saga';

export default function DashboardPage() {
	const dispatch = useDispatch();
	const isLogged = () => dispatch(isLoggedAction());
	
	useInjectSaga({key: 'homePage', saga});
	
	useEffect(() => {
		// isLogged();
	}, []);
	
	return (
		<h1>Dashboard</h1>
	);
}
