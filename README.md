# 校园流浪猫地图平台 - 系统架构说明

## 项目简介
本项目旨在通过数字化地图手段，解决校园流浪猫信息记录与救助协作问题。核心功能包括猫咪点位标记、健康档案管理及投喂记录追踪。

## 技术栈
* **前端**: Vue 3 / 墨刀原型设计成果
* **后端**: Node.js (Express 框架)
* **数据库**: SQLite 3 (使用 SQLiteStudio 建模)
* **版本控制**: Git (GitHub/Gitee)

## 启动步骤
1. **数据库初始化**: 
   - 使用 SQLiteStudio 打开 `cat_map.db`。
   - 导入并运行根目录下的 `cat_init.sql` 脚本以创建表结构及索引。
2. **后端启动**: 在 `backend` 文件夹执行 `npm start`。
3. **前端预览**: 在 `frontend` 文件夹执行 `npm run dev`。

## 接口入口
- 详细定义请参考根目录下的 `API_Standard.md` 文件。