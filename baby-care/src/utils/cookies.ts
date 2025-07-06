import Cookies from "js-cookie";

export const getTokenFromCookie = () => Cookies.get("token");
export const setTokenToCookie = (token: string) => 
    Cookies.set("token", token, { secure: true, expires: 7, sameSite: 'strict', path: '/' });
export const removeTokenCookie = () => Cookies.remove("token", { path: '/' });
export const getUserFromCookie = () => Cookies.get("user");
export const setUserToCookie = (user: string) => Cookies.set("user", user, { sameSite: 'strict', path: '/' });
