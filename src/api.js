import { getBaseUrl } from "./Helper/GetBaseURL";


const baseurl=getBaseUrl();
console.log(baseurl,"baseurl");
export const apis={
    USER_REGISTRATION:`${baseurl}/api/user/register`,
    USER_LOGIN:`${baseurl}/api/user/login`,
    RIDER_REGISTRATION:`${baseurl}/api/rider/register`,
    RIDER_LOGIN:`${baseurl}/api/rider/login`,
}