import axios from "axios";
import { UseUserContext } from "../../userContext";

const baseURL = "https://book-e-sell-node-api.vercel.app";

export default function createUser(registerdata) {

  let userContext = UseUserContext();

let newdata = {
    "firstName": registerdata.fname,
    "lastName": registerdata.lname,
    "email": registerdata.email,
    "roleId": registerdata.role,
    "password": registerdata.password
}
axios
.post(`${baseURL}/api/user`, newdata )
.then((response) => {
const _id = response.data.result._id;
const id = response.data.result.id;
console.log(`generated id is --- ${id}`);
console.log(`generated response is --- `);
console.log(response);
userContext.setUserData(response.data.result);


})
.catch((e) => {
    console.log("errororororo in createuser.js ");
    console.log(e);
    console.log("api urllll");
    console.log(`${baseURL}/api/user`)
});
}



