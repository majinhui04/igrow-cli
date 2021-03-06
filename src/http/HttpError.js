/**
 * HTTP 请求错误信息集合
 */
const HttpError = {
    default: '网络走神了,请稍后再试',
    repeat: '请求频率过快',
    cancel: '请求已取消',
    network: '网络异常或服务器连接失败',
    aborted: '请求被中止',
    timeout: '请求服务器响应超时，请求已经被中断',

    // 3xx: 重定向，需要进一步的操作以完成请求
    301: '请求的资源已被永久的移动到新URI',
    302: '请求的资源临时被移动，请重新发送请求',
    303: '请求的资源已被永久的移动到新URI，使用GET和POST请求查看',
    304: '所请求资源未变动，已使用本地缓存资源进行访问',
    305: '所请求的资源必须通过代理访问',
    306: '请求的资源已被移动',
    307: '请求的资源临时被移动，使用GET请求重定向',

    // 4xx: 客户端错误
    400: '客户端请求发生语法错误，服务器无法处理该请求',
    401: '被请求的页面需要进行身份验证',
    402: '未知客户端错误',
    403: '所请求页面的禁止访问',
    404: 'Not Found，所请求地址不存在',
    405: '请求中指定的方法被禁止使用',

    406: '服务器无法根据客户端请求的内容特性完成请求',
    407: '用户必须首先使用代理服务器进行验证并授权',
    408: '服务器等待客户端发送的请求已超时',
    409: '由于冲突，请求无法被完成',
    410: '指定请求的页面已经被移动或不存在',

    411: '服务器无法处理客户端发送的不带 Content-Length 的请求信息',
    412: '请求失败，请求中前提条件有错误',
    413: '由于所请求的实体的太大，服务器拒绝处理该请求',
    414: '请求的URI过长（URI通常为网址），服务器无法处理',
    415: '服务器无法处理请求附带的媒体格式',

    416: '客户端请求的范围 Range 无效',
    417: '服务器无法满足 Expect 的请求头信息',

    // 5xx: 服务器错误
    500: '服务器内部错误，无法完成请求',
    501: '服务器不支持所请求的功能，无法完成请求',
    502: '充当网关或代理的服务器，从远端服务器接收到了一个无效的请求',
    503: '由于超载或系统维护，服务器暂时的无法处理客户端的请求',
    504: '充当网关或代理的服务器，未及时从远端服务器获取请求',
    505: '服务器不支持请求中指明的HTTP协议版本'
};

/**
 * 将新的提示错误描述信息覆盖旧的信息
 * @param {Object} options 新的错误信息配置，如{404:'页面未找到'}
 */
HttpError.merge = options => {
    Object.assign(HttpError, options);
};

/**
 * 根据 HTTP 错误对象分析对应的错误详细内容
 * @param {{request,response:{status}}} error
 * @returns {string}
 */
HttpError.info = error => {
    const type = typeof error;

    // err.response.status
    switch (type) {
        case 'undefined': {
            return formatError(HttpError.network);
        }
        case 'object': {
            if (error.response && error.response.status && HttpError[error.response.status]) {
                return formatError(`[${error.response.status}] ${HttpError[error.response.status]}`, 'server');
            } else if (error instanceof Error) {
                // 超时
                if (/^timeout of/i.test(error.message)) {
                    return formatError(HttpError.timeout, 'timeout');
                } else if (/^network/i.test(error.message)) {
                    return formatError(HttpError.network, 'network');
                } else {
                    return formatError(error.message);
                }
            } else if (/^cancel/i.test(error.toString())) {
                let name = error['message'];
                // 如果提供关键字 e.g 'repeat'
                if (HttpError.hasOwnProperty(name)) {
                    return formatError(HttpError[name], name);
                } else {
                    return formatError(HttpError.cancel);
                }

            }

            return formatError(HttpError.default);
        }
        case 'string': {
            return formatError(error);
        }
        default: {
            return formatError(HttpError.default);
        }
    }
};

function formatError(message, name = 'error') {
    let result = {
        message,
        name,
        type: 'error'
    };
    return result;
}

export default HttpError;
