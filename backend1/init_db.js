const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'cat_map.db');
const sqlPath = path.join(__dirname, 'cat_init.sql');

const db = new sqlite3.Database(dbPath);

// 读取 SQL 文件内容
const sqlScript = fs.readFileSync(sqlPath, 'utf8');

// 执行 SQL 脚本
db.exec(sqlScript, (err) => {
    if (err) {
        console.error('❌ 数据库初始化失败:', err.message);
    } else {
        console.log('✅ cat_init.sql 导入成功！数据表和初始数据已就绪。');
    }
    db.close();
});