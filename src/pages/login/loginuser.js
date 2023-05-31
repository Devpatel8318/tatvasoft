import axios from "axios";
import { UseUserContext } from "../../userContext";

const baseURL = "https://book-e-sell-node-api.vercel.app";

export default function loginUser(logindata) {

let userContext = UseUserContext();


let userdata = {
    "email": logindata.email,
    "password": logindata.password
}

axios
.post(`${baseURL}/api/user/login`, userdata )
.then((response) => {
const _id = response.data.result._id;
const id = response.data.result.id;
console.log(`loggedin users id is --- ${id}`);
console.log(`generated response is --- `);
console.log(response);
userContext.setUserData(response.data.result);
})
.catch((e) => {
    console.log("errororororo in loginuser.js ");
    console.log(e);
    console.log("api urllll");
    console.log(`${baseURL}/api/user/login`)
});
}



