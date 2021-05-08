# 金海九州官网

## 安装依赖

```bash
# 安装依赖
npm install
```

## 启动开发服务

```sh
npm run dev
```

## 发布

目前使用 nginx 部署，所以使用 nuxt generate 编译应用，并依据路由配置生成对应的 HTML 文件 (用于静态站点的部署)

```sh
# generate static project
# 开发环境
npm run generate:dev
# 测试环境
npm run generate:stage
# 产线环境
npm run generate:prod
```

执行完成后，在项目目录下将生成 jhjzfund-web-website-pc 文件夹，使用 nginx 部署。

添加 nginx 配置：

```nginx
location / {
    root   jhjzfund-web-website-pc;
    try_files $uri $uri/ /index.html;
    # static下的文件设置缓存1年，其他的协商缓存
    add_header Cache-Control 'no-cache';
    if ($request_uri ~* ^/static) {
        add_header Cache-Control 'max-age=31536000';
    }
}
```
