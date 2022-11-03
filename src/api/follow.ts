import request from "../utils/request";

export function addFollow(to) {
    return request({
        url: '/sendMail',
        method: 'post',
        params: {to: to}
    })
}
export function deleteFollow(to) {
    return request({
        url: '/sendMail',
        method: 'post',
        params: {to: to}
    })
}

export function followAndFanCount(to) {
    return request({
        url: '/sendMail',
        method: 'post',
        params: {to: to}
    })
}
export function myFollow(to) {
    return request({
        url: '/sendMail',
        method: 'post',
        params: {to: to}
    })
}
