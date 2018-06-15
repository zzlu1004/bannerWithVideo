var config = require('../config.js')
var app = getApp()
var extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}
import { Request } from 'request.js';
var http = new Request()
class Common {

    constructor() {

    }
    /*
    * 需要用户个人信息时，上传文件
    * @param {* 请求地址} url
    * @param {* 要上传文件资源的路径} file
    * @param {* HTTP 请求中其他额外的 form data} data
    * @param {* 回调函数} cb
    */
    UploadPrivate(url, file, data, cb) {
        wx.showLoading({
            title: '上传中...',
            mask: true
        })
        wx.uploadFile({
            url: config.HTTP_BASE_URL + url,
            filePath: file,
            name: "file",
            header: {
                'Authorization': 'Bearer ' + (app.globalData.userInfo.token || ''),
                'store-id': app.globalData.store_id
            },
            formData: data,
            success: (res) => {
                if (typeof (res.data) == "string") {
                    typeof cb == "function" && cb(JSON.parse(res.data), "");
                } else {
                    typeof cb == "function" && cb(res.data, "");
                }

            },
            fail: (err) => {
                typeof cb == "function" && cb(null, err.errMsg);
            },
            complete: (res) => {
                wx.hideLoading();
            }

        });
    };

    /*
    * 无需用户个人信息时，上传文件
    * @param {* 请求地址} url
    * @param {* 要上传文件资源的路径} file
    * @param {* HTTP 请求中其他额外的 form data} data
    * @param {* 回调函数} cb
    */
    Upload(url, file, data, cb) {
        wx.showLoading({
            title: '上传中...',
        })
        wx.uploadFile({
            url: config.HTTP_BASE_URL + url,
            filePath: file,
            name: "file",
            formData: data,
            success: (res) => {
                if (typeof (res.data) == "string") {
                    typeof cb == "function" && cb(JSON.parse(res.data), "");
                } else {
                    typeof cb == "function" && cb(res.data, "");
                }

            },
            fail: (err) => {
                typeof cb == "function" && cb(null, err.errMsg);
            },
            complete: (res) => {
                wx.hideLoading();
            }

        });
    };

    /*
    * 选择图片
    * @param {* 选择图片数量} count
    * @param {* 回调函数} cb
    */
    addPictures(count, cb) {
        count = count && typeof count == 'number' ? count : 1;
        if (count > 9) count = 9;
        wx.chooseImage({
            count: count,
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有 ['original', 'compressed']
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: (res) => {
                typeof cb == "function" && cb(res, "");
            },
            fail: (res) => {
                console.log(res.errMsg);
            }
        })
    }
    /*
    * 图片预览
    * @param {* 当前图片路径} current_img
    * @param {* 需要预览的图片列表} urls
    */
    previewImage(current_img, urls) {
        if (typeof (urls) == 'string') urls = [urls];

        if (urls.length > 0) {
            wx.previewImage({
                current: current_img, // 当前显示图片的http链接
                urls: urls // 需要预览的图片http链接列表
            })
        }

    }
    /*
    * 图片裁剪
    * @param {* 图片地址} urls
    */
    image(url, width = 200, height = 200, pictype = 0) {
        url = url + '?imageView2/' + pictype + '/w/' + width + '/h/' + height + '';
        return url;
    }

    /*
    * 判断是否手机号
    * @param {* 手机号} str
    */
    isMobile(str) {
        let reg = /^1[3-9]\d{9}$/
        return reg.test(str);
    };
    /*
     * 判断是否为空
     * @param {* 字符串} str
     */
    isEmpty(str) {
        let empty = /^\s*$/;
        return empty.test(str)
    };

    /*
    * 错误Toast
    * @param {* 错误信息} message
    */
    error(message) {
        message = message || '操作失败';
        wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1500
        })
        setTimeout(function () {
            wx.hideToast()
        }, 1000)
    }

    /*
      * 错误信息提示
    */
    errorMsg(message) {
        wx.showToast({
            title: message,
            image: '/image/error1.png',
            duration: 2000
        })
    }
    /*
      * 信息提示
      * that 出入当前页面this
      * word 提示信息的文案
    */
    message(that, word) {
        that.setData({
            message: {
                isMessageShow: true,
                word: word,
            }
        })
        setTimeout(() => {
            that.setData({
                message: {
                    isMessageShow: false,
                    word: '',
                }
            })
        }, 1000)
    }

    /*
    * 成功Toast
    * @param {* 成功} message
    * @param {* 成功回调函数} cb
    */
    success(message, cb) {
        message = message || '操作成功';
        wx.showToast({
            title: message,
            icon: 'success',
            duration: 500
        });
        setTimeout(function () {
            wx.hideToast();

            if (!cb) {
                wx.navigateBack();
            } else {
                wx.navigateTo({
                    url: cb,
                })
            }
        }, 1000)
    }

    //倒计时
    countDown(time, str) {
        if (typeof _time === "string") {
            var _time = new Date(time).getTime()
        } else {
            _time = time * 1000;
        }
        var beginTime, endTime, nowTime;
        nowTime = new Date().getTime();
        beginTime = _time > nowTime ? nowTime : _time;
        endTime = _time > nowTime ? _time : nowTime;
        var left_seconds = (endTime - beginTime) / 1000;
        if (left_seconds > 0) {
            var day = Math.floor((left_seconds / 3600) / 24);
            var hour = Math.floor((left_seconds / 3600) % 24);
            var minute = Math.floor((left_seconds / 60) % 60);
            var second = Math.floor(left_seconds % 60);
            hour = (hour < 10 ? '0' : '') + hour.toString();
            minute = (minute < 10 ? '0' : '') + minute.toString();
            second = (second < 10 ? '0' : '') + second.toString();
            return !!str ? (day && day + '天') + (hour && hour + '时') + (minute && minute + '分') + (second && second + '秒') : [day, hour, minute, second];
        } else {
            return !!str ? '已过期' : [0, 0, 0, 0];
        }
    }

    //结束倒计时
    endcountDown(time, str) {
        if (typeof _time === "string") {
            var _time = new Date(time).getTime()
        } else {
            _time = time * 1000;
        }
        var beginTime, endTime, nowTime;
        nowTime = new Date().getTime();
        beginTime = nowTime;
        endTime = _time;
        var left_seconds = (endTime - beginTime) / 1000;
        if (left_seconds > 0) {
            var day = Math.floor((left_seconds / 3600) / 24);
            var hour = Math.floor((left_seconds / 3600) % 24);
            var minute = Math.floor((left_seconds / 60) % 60);
            var second = Math.floor(left_seconds % 60);
            hour = (hour < 10 ? '0' : '') + hour.toString();
            minute = (minute < 10 ? '0' : '') + minute.toString();
            second = (second < 10 ? '0' : '') + second.toString();
            return !!str ? (day && day + '天') + (hour && hour + '时') + (minute && minute + '分') + (second && second + '秒') : [day, hour, minute, second];
        } else {
            return !!str ? '已过期' : [0, 0, 0, 0];
        }
    }
    //将时间戳转化为字符串
    parseTime(time, cFormat) {
        if (arguments.length === 0) {
            return null;
        }
        const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
        let date;
        if (typeof time == 'object') {
            date = time;
        } else {
            if (('' + time).length === 10) time = parseInt(time) * 1000;
            date = new Date(time);
        }
        const formatObj = {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            i: date.getMinutes(),
            s: date.getSeconds(),
            a: date.getDay()
        };
        const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
            let value = formatObj[key];
            if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
            if (result.length > 0 && value < 10) {
                value = '0' + value;
            }
            return value || 0;
        });
        return time_str;
    }

    //获取绑定微信的手机号码
    getPhoneNumber(e, that) {
        //判断是否登录
        if (app.globalData.userInfo == null) {
            app.getUserInfo(function (userInfo) {
                that.setData({
                    userInfo: app.globalData.userInfo
                });
                this.dealPhoneNumber(e, that)
            })
        } else {
            this.dealPhoneNumber(e, that)
        }
    }
    //获取手机号码
    dealPhoneNumber(e, that) {
        let $this = this
        //已绑定手机号
        if (app.globalData.userInfo.mobile != '') {
            return;
        }
        //拒绝授权
        if (typeof (e.detail.encryptedData) == 'undefined' || typeof (e.detail.iv) == 'undefined') {
            wx.navigateTo({
                url: '/pages/welfare/bindMobile',
            })
            return;
        }
        if (!extConfig.appid) {
            extConfig.appid = config.APPID
        }
        var data = {
            appid: extConfig.appid,
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv
        }
        wx.showLoading({
            title: '请稍后',
            mask: true
        })
        http.GetPrivate("/user/wx-bind-mobile", data, function (res) {
            // wx.hideLoading();
            if (res.status) {
                app.globalData.userInfo.mobile = res.data.mobile;
                that.setData({
                    userInfo: app.globalData.userInfo
                });
                wx.showToast({
                    title: '绑定成功',
                    icon: 'success',
                    duration: 1000
                })
            } else {
                wx.showToast({
                    title: '绑定失败',
                    icon: 'loading',
                    duration: 1000
                })
            }
        });

    }

}


export { Common }