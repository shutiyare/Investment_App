import axios from 'axios';


export function register(reg_data) {
    // console.log(typeof (reg_data));
    console.log("sending: ", reg_data);
    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    }
    console.log("in post", reg_data)
    return axios.post("/api/register", reg_data, config)
        // .then(res => {
        //     console.log("server response: ", res.data);
        //     return res.data
        // }).catch(err => {
        //     console.log("upload error");
        //     // throw new Error(err.message)
        //     return err.message
        // });
}
