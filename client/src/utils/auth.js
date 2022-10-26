import decode from 'jwt-decode';

// Create the auth service class with necessary methods
class AuthService {
    // Get the user details
    getUser() {
        return decode(this.getToken());
    };

    // Check if a user is loggen in
    loggedIn() {
        const token = this.getToken();
        return token && !this.isTokenExpired(token) ? true : false;
    };

    // Check if the token is expired
    isTokenExpired(token) {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) {
          localStorage.removeItem('id_token');
          return true;
        }
        return false;
    }

    // Get the token from local storage
    getToken() {
        return localStorage.getItem('id_token');
    };

    login(idToken) {
        localStorage.setItem('id_token', idToken);
    };

    logout() {
        localStorage.removeItem('id_token');
        window.location.reload();
    };
};

export default new AuthService();