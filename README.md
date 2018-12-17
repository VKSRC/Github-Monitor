# VIPKID GITHUB MONITOR

[![License](https://img.shields.io/aur/license/yaourt.svg)](./LICENSE)
[![](https://img.shields.io/badge/python-3.5 |3.6 | 3.7-yellow.svg)]
(https://www.python.org/)

-----

**GITHUB MONITOR** 是vipkid安全研发团队打造的用于监控Github代码仓库、及时发现企业内部代码泄露、从而降低由于代码泄露导致的一系列安全风险。用户通过简单的任务配置，即可在分钟级发现代码泄露的情况。项目后端使用**[django-rest-framework](https://www.django-rest-framework.org/)**开发，前端使用**[react](https://reactjs.org/)**和**[antd-pro](https://pro.ant.design/)**开发。

## 系统特点
* 分钟级监控
* 简单且灵活的任务配置
* 邮件提醒
* github token管理
* 运行十分稳定

## 安装指南


首先将代码clone到本地：

 ```git clone https://github.com/VKSRC/Github-Monitor.git```


### 1. docker 部署

我们推荐使用`Docker`进行部署, 相对于源码部署更为简单和快速。

部署前请务必先安装`Docker`及`docker-compose`。

#### 修改配置文件

 首先复制根目录的`.env.sample`并重命名为`.env`，修改其中的`Email Settings`和`initial Administrator`配置。这两个配置分别控制邮件提醒，以及初始管理帐号密码。
 
#### 一键启动
 
 ```
 docker-compose up -d
 ```
 
访问`http://127.0.0.1:8001`即可看到页面。
 
#### 修改启动端口

如果想修改启动端口，可以修改`docker-compose.yaml`文件中`web`容器的`ports`。

默认为`8001:80`，必须要修改为`8080`端口可改为`8080:80`。

### 2. 源码部署:
项目运行依赖 **redis**, 请在运行服务前启动**redis-server**

----

首先将`.env.sample`复制一份重命名为`.env`，并按照自己的要求修改配置:

```
# Django Settings
DEBUG="True"  # Django后台是否以debug模式运行, 可选True/False
ALLOWED_HOSTS="127.0.0.1,localhost"  # 配置Django Allowed_Hosts

# Database Settings
# DATABASE choice is mysql or sqlite
DATABASE="sqlite"  # 数据库类型, 可选sqlite或mysql
DB_NAME="github"  # 数据库名称
DB_HOST="127.0.0.1"  # mysql host
DB_PORT="3306"  # mysql port
DB_USER="root"  # mysql用户名
DB_PASSWORD="vipkid@2018"  # mysql密码

# Email Settings
# If you do not fill it in, it is None/False
EMAIL_HOST="smtp.example.com"  # smtp host
EMAIL_PORT="25"  # smtp port
FROM_EMAIL="secuirty@example.com"  # 发件人
EMAIL_HOST_USER="security@example.com"  # email user, 如为匿名发送，将值设为空字符即可
EMAIL_HOST_PASSWORD="password123!@#"  # email password, 如为匿名发送，将值设为空字符即可
EMAIL_USE_TLS=
EMAIL_USE_SSL=

# initial Administrator
INIT_ADMIN_USERNAME="admin"  # 初始化系统用户使用的用户名
INIT_ADMIN_PASSWORD="password123!@#"  # 初始化系统用户使用的用户密码


```


- 后端代码运行部署:

> 测试环境可以使用django runserver的方式来进行部署，生产环境建议使用uwsgi + Nginx的方式部署，配置文件的示例可以参考 [配置](./conf) 目录下的文件。

1. 进入项目根目录下的server目录
2. 配置virtualenv环境（建议）
3. 在mysql里创建数据库(如使用sqlite、请忽略此步): 

	> 登录进mysql后， 执行 ```CREATE DATABASE IF NOT EXISTS github DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_bin;```

4. 在server目录下执行如下脚本:

```
# 安装python依赖
pip3 install -r requirements.pip -i http://pypi.doubanio.com/simple --trusted-host pypi.doubanio.com
# 初始化数据库
python3 manage.py migrate
# 初始化用户账号
python3 manage.py init_admin
# 启动web后端服务:
python3 manage.py runserver 127.0.0.1:8001
# 启动监控任务服务:
python3 manage.py monitor_task_service
```
----

- 前端代码部署:

> 测试环境可以使用 ```npm run start``` 方式启动, 生产环境建议先通过 ```npm run build```生成静态文件，然后通过nginx做转发来做。

1. 进入项目根目录下的client目录
2. 如果后端接口地址不为 ```127.0.0.1:8001```, 需要修改```config/config.local.js```, 将target修改为后端地址即可
3. 执行: ```npm install && npm run start```

