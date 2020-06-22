import HomePage from "containers/HomePage/Loadable";
import DashboardPage from "containers/DashboardPage/Loadable";

export const routes = [
	{
		'path': '/',
		'component': HomePage,
		'exact': true
	},
	{
		'path': '/dashboard',
		'component': DashboardPage,
		'exact': true
	},
];
