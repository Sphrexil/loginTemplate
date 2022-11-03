import request from "../utils/request";

export function mygoodCount(to) {
    return request({
        url: '/sendMail',
        method: 'post',
        params: {to: to}
    })
}
