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
import {Col, Container, Row} from "reactstrap";

export default function DashboardPage() {
	const dispatch = useDispatch();
	const isLogged = () => dispatch(isLoggedAction());
	
	useInjectSaga({key: 'homePage', saga});
	
	useEffect(() => {
		// isLogged();
	}, []);
	
	return (
		<Container>
			<Row>
				<Col sm="12" md={{size: 6, offset: 3}}>This Is Dashboard!
				</Col>
			</Row>
		</Container>
	);
}
