// 引入axios
import axios from "axios";
// 创建request函数 传入基本配置，返回axios实例对象
export function request(config) {
    const instance = axios.create({
        baseURL:'http://localhost:3000',
        timeout:5000
    })
    //拦截器

    // 发送网络请求
    return instance(config)
}