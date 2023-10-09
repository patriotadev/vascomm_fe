import {getCookie} from 'cookies-next'
import Jwt from 'jwt-decode';

export default function getUser() {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
        const decoded = Jwt(accessToken)
        return decoded;
    }
    return {};
}