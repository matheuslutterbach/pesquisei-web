export const authService = {
    authHeader,
    authHeaderFile
};

function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.access_token) {
        return { headers: { 'Authorization': 'Bearer ' + user.access_token } };
    } else {
        return 'ok';
    }
}

function authHeaderFile() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.access_token) {
        return { headers: { 'Authorization': 'Bearer ' + user.access_token, responseType: 'arraybuffer' } };
    } else {
        return 'ok';
    }
}