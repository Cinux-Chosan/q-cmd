# q-cmd

该模块实现了一些常用的小功能，如
- 在当前目录开启http服务器与好友分享文件，接受好友上传文件到本地指定目录
- 项目文件自由的 `lf` 与 `crlf` 之间进行转换

## install

`npm i -g q-cmd`

## 命令介绍

下面是一些命令介绍，直接在终端运行即可

### server

功能 ： 本地开启 http 服务器

格式 ： `server [option]`

示例 ：

- `server -p 9000`
  - 指定服务器端口
- `server -u`
  - 开启文件上传，默认不能上传文件
- `server -h`
  - 查看命令帮助


### lf

功能 ： 将项目下面的文件在 `lf` 与 `crlf` 之间进行转换

格式 ： `lf [option]`

示例 ：

- `lf`
  - 将当前目录下面所有文件换行符转换为 `lf`
- `lf -c`
  - 将当前目录下面所有文件换行符转换为 `crlf`
- `lf -w ..`
  - 将转换的根目录设置为当前目录的上级目录
- `lf -a php`
  - 将扩展名为 `.php` 的文件加入转换队列
- `lf -d js`
  - 不转换扩展名为 `.js` 的文件
- `lf -N node_modules`
  - 不转换 `node_modules` 目录内的文件（该选项会递归，即只要文件绝对路径出现 `node_modules` 的都不会被转换）
- `lf -h`
  - 查看命令帮助
