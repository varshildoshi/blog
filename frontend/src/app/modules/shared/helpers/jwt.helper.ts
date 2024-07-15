import jwt_decode from 'jwt-decode';

export const getUserDetails = (token: any) => {
    try {
        let decodedToken = jwt_decode(token);
        return decodedToken
    }
    catch (error) {
        //alert('on redirect')
        redirectToLogin();
    }
}

export const redirectToLogin = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/auth/login';
    return false;
}


export const getLoginUserInfo = () => {
    let token: any = localStorage.getItem('access_token');
    try {
        return jwt_decode(token);
    }
    catch (error) {
        return {};
    }
}
