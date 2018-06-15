
Page({
    /**
     * 页面的初始数据
     */
    data: {
        indicator: '#baf0e6',
        activeIndicator: '#11dcb7',
        storeImgs: [//banner
            {
                src:'https://img-shop.qmimg.cn/u2153/videos/2018/06/15/e5c0523ef3b6ed4d.mp4',
                type:1 //为视频
            },{
                src:'https://img-shop.qmimg.cn/u2153/images/2018/06/15/2b87a0b710f38a7b.png'
            }
        ],
        current: 0,//banner当前的index
        isPlay: false,//是否播放视屏
        isGet: false,//是否收藏
        
    },
    onReady: function (res) {
        this.videoContext = wx.createVideoContext('myVideo')
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },
    
    //播放视屏
    play: function () {
        this.setData({
            isPlay: true
        })
        this.videoContext.play()
    },

    //banner改变时
    bannerChage: function (event) {
        this.setData({
            isPlay: false
        })
    },

    //视频播放时，选择下一页
    goNext: function (event) {
        this.setData({
            current: 1
        })
    },

    //视频播放时，选择上一页
    goPrev: function (event) {
        this.setData({
            current: this.data.storeImgs.length - 1
        })
    },

    //图片预览(banner)
    preview: function (event) {
        let url = event.currentTarget.dataset.url
        let urls = []
        if (this.data.storeImgs.length > 0) {
            this.data.storeImgs.forEach(item => {
                urls.push(item.src)
            })
        }
        wx.previewImage({
            current: url, // 当前显示图片的http链接
            urls: urls // 需要预览的图片http链接列表
        })
    },

    
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        let that = this
        return {
            title: that.data.storeInfo.name,
            path: `/pages/shopDetail/shopDetail?id=${that.data.id}`
        }
    }
})