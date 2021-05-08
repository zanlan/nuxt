// webpack创建一个以svg目录为上下文的require函数
const req = require.context('@/assets/icons', false, /\.svg$/)
// keys()会获取./svg下所有svg文件，加载
req.keys().map(req)
// console.log(req)
