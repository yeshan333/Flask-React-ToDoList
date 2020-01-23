# Flask-React-ToDo
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/yeshan333/Flask-React-ToDoList/master) ![Netlify](https://img.shields.io/netlify/be5ea8e0-a8a8-4854-9a12-0aa0ba80f70f) ![GitHub issues](https://img.shields.io/github/issues-raw/yeshan333/Flask-React-ToDoList) [![Netlify Status](https://api.netlify.com/api/v1/badges/05c648e3-71bd-4be1-bd7a-bf6a2cafed5a/deploy-status)](https://app.netlify.com/sites/vibrant-benz-4eff09/deploys)

---

基于React和Flask的前后端分离项目入门级demo--ToDo App

![demo.png](https://img.vim-cn.com/d8/ed37d4d96c57240861dc92aef664137112104d.png)

---

## 简介😘

一个基础的To-Do APP，实现了基本的CRUD功能，数据库使用的是MongDB。前端的React APP使用Ajax与后端的Flask RESTful APIs交互。

### 项目部署

- React APP部署在Netlify，👉[https://kind-mclean-15510a.netlify.com/](https://kind-mclean-15510a.netlify.com/)，[![Netlify Status](https://api.netlify.com/api/v1/badges/be5ea8e0-a8a8-4854-9a12-0aa0ba80f70f/deploy-status)](https://app.netlify.com/sites/kind-mclean-15510a/deploys)
- React + Ajax 部署在Netlify，👉[https://vibrant-benz-4eff09.netlify.com/](https://vibrant-benz-4eff09.netlify.com/)
- Flask RESTful APIs部署在Heroku，👉[https://flask-react-todo.herokuapp.com/api/v1/info](https://flask-react-todo.herokuapp.com/api/v1/info)

### 项目依赖

- 前端React部分主要依赖
  - Material UI 4.8.3
  - axios 0.19.1
  - React 16.12
- 后端Flask部分主要依赖
  - Flask 1.1.1
  - pymongo 3.10.1
  - Jinja2 2.10.3
  - gunicorn 20.0.4
  - flask-cors 3.0.8
- 后端测试依赖
  - nose2 0.9.1

## 更新计划✅

- [ ] 前端性能优化，由于Ajax处理不当，React APP体验不太好
- [ ] 应用容器化部署
- [ ] 前端样式优化
- [ ] 考虑加入用户认证功能

## 许可证📝

Apache 2.0