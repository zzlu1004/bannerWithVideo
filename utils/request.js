var app = getApp()
var config = require('../config.js')
var extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}


class Request {

    constructor() {

    }
    /*
    * 需要用户个人信息的get请求
    * @param {* 请求地址} url
    * @param {* 请求数据} data
    * @param {* 回调函数} cb
    * @param {* 回调函数} dropDown true为常规获取数据，false为下拉刷新
    */
    GetPrivate(url, data, dropDown, cb) {
        if (!extConfig.appid) {
            wx.showToast({
                title: '数据加载错误',
                icon: 'loading',
                duration: 1000
            })
            return;
        }
        // if (dropDown) {
        //     wx.showLoading({
        //         title: '加载中',
        //     })
        // }
        data.appid = extConfig.appid;
        wx.request({
            method: 'GET',
            url: config.HTTP_BASE_URL + url,
            data: data,
            header: {
                'Authorization': 'Bearer ' + (app.globalData.userInfo.token || ''),
                'store-id': app.globalData.store_id
            },
            success: (res) => {
                if (res.code == '-1') {
                    wx.redirectTo({
                        url: '/pages/template/placeholder',
                    })
                }
                // wx.hideLoading()
                typeof cb == "function" && cb(res.data, "");
            },
            fail: (err) => {
                wx.showLoading({
                    title: err.errMsg,
                })
                setTimeout(() => {
                    wx.hideLoading()
                }, 2000)
            }
        });
    };
    /*
    * 无需用户个人信息的get请求
    * @param {* 请求地址} url
    * @param {* 请求数据} data
    * @param {* 回调函数} cb
    * @param {* 回调函数} dropDown true为常规获取数据，false为下拉刷新
    */
    Get(url, data, dropDown, cb) {
        if (!extConfig.appid) {
            wx.showToast({
                title: '数据加载错误',
                icon: 'loading',
                duration: 1000
            })
            return;
        }
        // if (dropDown) {
        //     wx.showLoading({
        //         title: '加载中',
        //     })
        // }
        data.appid = extConfig.appid;
        wx.request({
            method: 'GET',
            url: config.HTTP_BASE_URL + url,
            data: data,
            success: (res) => {
                if (res.code == '-1') {
                    wx.redirectTo({
                        url: '/pages/template/placeholder',
                    })
                }
                // wx.hideLoading()
                typeof cb == "function" && cb(res.data, "");
            },
            fail: (err) => {
                wx.showLoading({
                    title: err.errMsg,
                })
                setTimeout(() => {
                    wx.hideLoading()
                }, 2000)
            }
        });
    };
    /*
    * 需要用户个人信息的post请求
    * @param {* 请求地址} url
    * @param {* 请求数据} data
    * @param {* 回调函数} cb
    */
    PostPrivate(url, data, cb) {
        if (!extConfig.appid) {
            wx.showToast({
                title: '数据加载错误',
                icon: 'loading',
                duration: 1000
            })
            return;
        }
        // wx.showLoading({
        //     title: '加载中',
        // })
        data.appid = extConfig.appid;
        wx.request({
            method: 'POST',
            url: config.HTTP_BASE_URL + url,
            data: data,
            header: {
                'Authorization': 'Bearer ' + (app.globalData.userInfo.token || ''),
                'store-id': app.globalData.store_id
            },
            success: (res) => {
                if (res.code == '-1') {
                    wx.redirectTo({
                        url: '/pages/template/placeholder',
                    })
                }
                // wx.hideLoading()
                typeof cb == "function" && cb(res.data, "");
            },
            fail: (err) => {
                wx.showLoading({
                    title: err.errMsg,
                })
                setTimeout(() => {
                    wx.hideLoading()
                }, 2000)
            }
        });
    };
    /*
    * 无需用户个人信息的post请求
    * @param {* 请求地址} url
    * @param {* 请求数据} data
    * @param {* 回调函数} cb
    */
    Post(url, data, cb) {
        if (!extConfig.appid) {
            wx.showToast({
                title: '数据加载错误',
                icon: 'loading',
                duration: 1000
            })
            return;
        }
        // wx.showLoading({
        //     title: '加载中',
        // })
        data.appid = extConfig.appid;
        wx.request({
            method: 'POST',
            url: config.HTTP_BASE_URL + url,
            data: data,
            success: (res) => {
                if (res.code == '-1') {
                    wx.redirectTo({
                        url: '/pages/template/placeholder',
                    })
                }
                // wx.hideLoading()
                typeof cb == "function" && cb(res.data, "");
            },
            fail: (err) => {
                wx.showLoading({
                    title: err.errMsg,
                })
                setTimeout(() => {
                    wx.hideLoading()
                }, 2000)
            }
        });
    };
    /*
    * 需要用户个人信息的delete请求
    * @param {* 请求地址} url
    * @param {* 请求数据} data
    * @param {* 回调函数} cb
    */
    Delete(url, data, cb) {
        data._method = 'DELETE'
        // wx.showLoading({
        //     title: '加载中',
        // })
        wx.request({
            method: 'post',
            url: config.HTTP_BASE_URL + url,
            data: data,
            header: {
                'Authorization': 'Bearer ' + (app.globalData.userInfo.token || ''),
                'store-id': app.globalData.store_id
            },
            success: (res) => {
                if (res.code == '-1') {
                    wx.redirectTo({
                        url: '/pages/template/placeholder',
                    })
                }
                // wx.hideLoading()
                typeof cb == "function" && cb(res.data, "");
            },
            fail: (err) => {
                wx.showLoading({
                    title: err.errMsg,
                })
                setTimeout(() => {
                    wx.hideLoading()
                }, 2000)
            }
        });
    };

}


export { Request }