export default class AuthService {
	checkToken = () => {
		const token = this.getToken();
		const refreshToken = this.getRefreshToken();
		return !!token && !!refreshToken;
	};
	
	setTokenPayload = (payload) => {
		
		localStorage.setItem('expiry_in', payload.expires_in);
		localStorage.setItem('access_token', payload.access_token);
		localStorage.setItem('refresh_token', payload.refresh_token);
		return true;
	};
	
	unSetTokenPayload = () => {
		localStorage.removeItem('expiry_in');
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		return true;
	};
	
	getToken = () => {
		return localStorage.getItem('access_token');
	};
	
	getRefreshToken = () => {
		return localStorage.getItem('refresh_token');
	};
	
	getExpiry = () => {
		return localStorage.getItem('expiry_in');
	};
}
