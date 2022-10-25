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
        return token ? true : false;
    };

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