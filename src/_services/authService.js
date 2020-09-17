export const authService = {
    authHeader
};

function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.access_token) {
        return { headers: { 'Authorization': 'Bearer ' + user.access_token } };
    } else {
        return 'ok';
    }
}