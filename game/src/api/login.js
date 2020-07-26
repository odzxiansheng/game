import axios  from './axios';
// 登陆
export function login(data){
    return axios({
        url:'/login',
        method:'post',
        data
    })
};
// 注册
export function request(data){
    return axios({
        url:'/request',
        method:'post',
        data
    })
};
// 获取角色信息
export function role(data){
    return axios({
        url:'/role',
        method:'post',
        data
    })
};
// 读取角色信息
export function read(data){
    return axios({
        url:'/read',
        method:'post',
        data
    })
};
// 获取怪物信息
export function master(data){
    return axios({
        url:'/master',
        method:'post',
        data
    })
};

export function existence(data){
    return axios({
        url:'/existence',
        method:'post',
        data
    })
};
// 获得经验
export function gainExperience(data){
    return axios({
        url:'/gainExperience',
        method:'post',
        data
    })
};
// 获得经验
export function goodsList(data){
    return axios({
        url:'/goodsList',
        method:'post',
        data
    })
};
// 关卡保存
export function checkpoint(data){
    return axios({
        url:'/checkpoint',
        method:'post',
        data
    })
};
 
