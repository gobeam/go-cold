const BASE_URL = 'http://localhost:7778/api';
const AUTH_PATH = '/oauth2/token';
const PROFILE_PATH = '/profile';
const LOGOUT_PATH = '/logout';

export default class ApiEndpoint {
	getBasePath = () => {
		return `${BASE_URL}`;
	};
	
	getLoginPath = () => {
		return `${BASE_URL + AUTH_PATH}`;
	};
	
	getProfilePath = () => {
		return `${BASE_URL + PROFILE_PATH}`;
	};
	
	getLogoutPath = () => {
		return `${BASE_URL + LOGOUT_PATH}`;
	};
	
	getRegisterPath = () => {
		return `${BASE_URL}/register`;
	};
	
	makeApiPayload = (method, token = null, payload = null) => {
		let jsonPayload = {
			method,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			}
		};
		if (payload !== null) {
			jsonPayload.body = JSON.stringify(payload);
		}
		return jsonPayload;
	};
	
	getLoginPayload = (email, password, refresh = false, refresh_token = null) => {
		let jsonPayload = {
			client_id: process.env.CLIENT_ID || '5d831ab0a414927452fcadca',
			client_secret: process.env.CLIENT_SECRET || '83a9de479797e64497bf4909b39a84a5'
		};
		if (refresh) {
			jsonPayload.grant_type = 'refresh_token';
			jsonPayload.refresh_token = refresh_token;
		} else {
			jsonPayload.grant_type = 'password';
			jsonPayload.username = email;
			jsonPayload.password = password;
			jsonPayload.scope = '*';
		}
		return jsonPayload;
	};
	
	
}
