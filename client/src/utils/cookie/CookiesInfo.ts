import Cookies from "universal-cookie";
const cookie = new Cookies();


export const getCurrentAccessToken = () => {
    const accessToken = cookie.get("accessToken");
    return accessToken;
}