const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
// 开启跨域允许，让前端(5173端口)可以访问后端(3000端口)
app.use(cors());
// 允许后端接收 JSON 格式的数据
app.use(express.json());

// 1. 连接 SQLite 数据库
const dbPath = path.join(__dirname, 'cat_map.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('数据库连接失败:', err.message);
    } else {
        console.log('✅ 成功连接到 SQLite 数据库 cat_map.db');
        
        // 【关键修复】：自动创建 cats 数据表（如果它还不存在的话）
        const createTableSql = `
            CREATE TABLE IF NOT EXISTS cats (
                cat_id INTEGER PRIMARY KEY AUTOINCREMENT,
                nickname TEXT NOT NULL,
                latitude REAL NOT NULL,
                longitude REAL NOT NULL,
                health_status TEXT
            )
        `;
        db.run(createTableSql, (err) => {
            if (err) {
                console.error('创建数据表失败:', err.message);
            } else {
                console.log('✅ cats 数据表已准备就绪！');
            }
        });
    }
});

// 2. 各种接口路由
// 测试接口
app.get('/api/status', (req, res) => {
    res.json({ status: 'success', message: '后端服务器运行正常！' });
});

// 获取所有猫咪点位数据的接口
app.get('/api/cats', (req, res) => {
    const sql = 'SELECT * FROM cats'; 
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ status: 'error', message: err.message });
            return;
        }
        res.json({
            status: 'success',
            data: rows
        });
    });
});

// 接收前端提交的新猫咪数据接口
app.post('/api/cats', (req, res) => {
    const { nickname, latitude, longitude, health_status } = req.body;
    
    const sql = `INSERT INTO cats (nickname, latitude, longitude, health_status) VALUES (?, ?, ?, ?)`;
    
    db.run(sql, [nickname, latitude, longitude, health_status], function(err) {
        if (err) {
            console.error('保存猫咪失败:', err);
            res.status(500).json({ status: 'error', message: err.message });
            return;
        }
        res.json({ 
            status: 'success', 
            message: '猫咪建档成功！', 
            cat_id: this.lastID 
        });
    });
});

// 3. 启动服务器（注意：app.listen 最好放在代码最下面）
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 后端服务器已启动，正在运行: http://localhost:${PORT}`);
});