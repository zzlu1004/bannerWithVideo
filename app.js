//app.js

App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        var that = this;
    },
    // 判断当前页面是否为动态设置的导航条
    isTabBar: function (goUrl) {
        let allTabBar = extConfig.tabBarList
        let isFind = allTabBar.find(value => {
            return value.pagePath == goUrl
        })
        if (isFind) {//是，为动态设置的导航条时
            return true
        } else {//否
            return false
        }
    },
    
})