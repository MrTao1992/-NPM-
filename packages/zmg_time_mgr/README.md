时间管理组件 v0.0.1
getDiffTime 获取本地时间和服务器时间差（保证本地时间与服务器一致）
注:服务器需要有接口可以获取服务器时间

getCurTime 获取当前时间

formatTime 格式化时间显示，可选参数
列:显示2020年12月30日 TimeMgr.formatTime(time,'Y年M月D日')

getTimeByArr 数组转时间戳
列:显示2020年12月30日时间戳 TimeMgr.getTimeByArr([2020,12,30])

getTimeData 获取时间数据json格式
timeStart 开始计时
timeEnd 结束计时
