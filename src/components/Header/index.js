import React, {useEffect, useState} from 'react';
import HeaderLink from 'components/Header/HeaderLink';
import {isLoggedAction, logoutAction} from 'containers/App/actions';
import {useDispatch, useSelector} from "react-redux";
import {useInjectSaga} from "utils/injectSaga";
import saga from "containers/App/saga";
import {createStructuredSelector} from "reselect";
import {makeIsLoggedSelector, makeLoggedInUserSelector} from "containers/App/selectors";
import {faHome, faTachometerAlt, faSign, faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import FontAwesomeWrapper from 'components/FontAwesomeWrapper';
import {
	Collapse,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Nav,
	Navbar,
	NavbarToggler,
	NavItem,
	UncontrolledDropdown
} from 'reactstrap';

export const publicNavs = [
	{
		url: '/login',
		name: 'Login',
		icon: <FontAwesomeWrapper icon={faSign}/>
	},
	{
		url: '/register',
		name: 'Register',
		icon: <FontAwesomeWrapper icon={faSignInAlt}/>
	},
	
];

export const privateNav = [
	{
		url: '/dashboard',
		name: 'Dashboard',
		icon: <FontAwesomeWrapper icon={faTachometerAlt}/>
	}
];

const key = 'global';

const stateSelector = createStructuredSelector({
	user: makeLoggedInUserSelector(),
	isLogged: makeIsLoggedSelector()
});

function Header() {
	const dispatch = useDispatch();
	const checkIfLogged = () => dispatch(isLoggedAction());
	const onLogout = () => dispatch(logoutAction());
	const [isOpen, setIsOpen] = useState(false);
	
	useInjectSaga({key: key, saga});
	
	const {user, isLogged} = useSelector(
		stateSelector,
	);
	
	const toggle = () => {
		setIsOpen(!isOpen);
	};
	
	useEffect(() => {
		checkIfLogged();
	}, []);
	
	return (
		<div>
			<Navbar color="light" light expand="md">
				<HeaderLink to="/" >
					<FontAwesomeWrapper icon={faHome}/>
					Home
				</HeaderLink>
				<NavbarToggler onClick={toggle}/>
				
				<Collapse isOpen={isOpen} navbar>
					
					<Nav className="ml-auto" navbar>
						{ isLogged ?
							privateNav.map((navItem, i) => {
								return <NavItem key={i}>
									<HeaderLink to={navItem.url} activeClassName="selected">
										{navItem.icon} {navItem.name}
									</HeaderLink>
								</NavItem>;
							}) :
							publicNavs.map((navItem, i) => {
								return <NavItem key={i}>
									<HeaderLink to={navItem.url} activeClassName="selected">
										{navItem.name}
									</HeaderLink>
								</NavItem>;
							})
						}
						
						{ isLogged ?
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									{user.email}
								</DropdownToggle>
								<DropdownMenu right>
									<DropdownItem>
										Option 1
									</DropdownItem>
									<DropdownItem>
										Option 2
									</DropdownItem>
									<DropdownItem divider/>
									<DropdownItem onClick={onLogout}>
										Logout
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown> : ''}
					</Nav>
				</Collapse>
			</Navbar>
		
		</div>
	);
}

export default Header;
