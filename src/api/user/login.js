import {request} from "../../api/request";
export function login(loginForm) {
    return request({
        method:'post',
        url:'user/login',
        data:{
            uname:loginForm.username,
            pwd:loginForm.password
        }
    })

}