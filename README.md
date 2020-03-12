# Flask-React-ToDo
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/yeshan333/Flask-React-ToDoList/master) ![Netlify](https://img.shields.io/netlify/be5ea8e0-a8a8-4854-9a12-0aa0ba80f70f) ![GitHub issues](https://img.shields.io/github/issues-raw/yeshan333/Flask-React-ToDoList) [![Netlify Status](https://api.netlify.com/api/v1/badges/05c648e3-71bd-4be1-bd7a-bf6a2cafed5a/deploy-status)](https://app.netlify.com/sites/vibrant-benz-4eff09/deploys)

---

基于React和Flask的前后端分离项目入门级demo--ToDo App

![demo.png](https://img.vim-cn.com/f8/f359b94189d1d2e2f1e73bb03ee9ffd54fd10b.gif)

email: 1329441308@qq.com; password: 1234567890，资源未做保护
---

## 简介😘

一个基础的To-Do APP，实现了基本的CRUD功能，数据库使用的是MongDB。前端的React APP使用Ajax与后端的Flask RESTful APIs交互。

### 项目部署

- React APP部署在Netlify，👉[https://kind-mclean-15510a.netlify.com/](https://kind-mclean-15510a.netlify.com/)，[![Netlify Status](https://api.netlify.com/api/v1/badges/be5ea8e0-a8a8-4854-9a12-0aa0ba80f70f/deploy-status)](https://app.netlify.com/sites/kind-mclean-15510a/deploys)
- React + Ajax 部署在Netlify，👉[https://vibrant-benz-4eff09.netlify.com/](https://vibrant-benz-4eff09.netlify.com/)
- React + Ajax + 假的登录，[👉https://hardcore-swirles-fbea59.netlify.com/](https://hardcore-swirles-fbea59.netlify.com/)
- Flask RESTful APIs部署在Heroku，👉[https://flask-react-todo.herokuapp.com/api/v1/info](https://flask-react-todo.herokuapp.com/api/v1/info)

前端部署分支：[netlify-frontend-service](https://github.com/yeshan333/Flask-React-ToDoList/tree/netlify-frontend-service)

REST后端部署分支：[heroku-backend-service](https://github.com/yeshan333/Flask-React-ToDoList/tree/heroku-backend-service)

**REST 后端仍未做资源保护**

### 项目依赖

- 前端React部分主要依赖
  - Material UI 4.8.3
  - axios 0.19.1
  - React 16.12
  - React-Router-Dom 5.1.2
- 后端Flask部分主要依赖
  - Flask 1.1.1
  - pymongo 3.10.1
  - Jinja2 2.10.3
  - gunicorn 20.0.4
  - flask-cors 3.0.8
- 后端测试依赖
  - nose2 0.9.1

## 更新计划✅

- [ ] 前端性能优化
- [ ] 应用容器化部署
- [ ] 前端样式优化
- [x] 加个登录表单
- [ ] 现在的登录是假的，需要更换验证方式
- [ ] Ajax 处理不当，需改进代码

## 许可证📝

Apache 2.0

---

Start frontend development server

```shell
cd frontend
# install dependencies
npm install
# start front-end service
npm start  # served at http://localhost:3000/
```

Start backend development server

```shell
cd backend
# create virtual environment
virtualenv env
# activate virtual environment
source env/Scripts/activate
# install dependencies
pip install -r requirements.txt
# initial Mongo Database, .\mongod.exe --config .\mongod.conf
flask create-database  # drop database: flask drop-database name
# start flask service
flask run  # served at http://localhost:5000/
```