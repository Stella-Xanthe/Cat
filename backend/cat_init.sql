--
-- SQLiteStudio v3.4.18 生成的文件，周日 4月 26 23:11:04 2026
--
-- 所用的文本编码：System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- 表：cats
CREATE TABLE IF NOT EXISTS cats (
    cat_id           INTEGER PRIMARY KEY AUTOINCREMENT, -- 猫咪ID 
    nickname         TEXT    NOT NULL,                  -- 猫咪昵称 
    discovery_time   DATETIME,                          -- 发现时间 
    latitude         REAL    NOT NULL,                  -- 地理坐标(纬度) 
    longitude        REAL    NOT NULL,                  -- 地理坐标(经度) 
    appearance       TEXT,                              -- 外貌特征 
    health_status    TEXT    CHECK(health_status IN ('健康', '需救助', '已领养')), -- 健康状态 
    is_sterilized    INTEGER DEFAULT 0,                 -- 绝育情况 (0未, 1已) 
    personality      TEXT                               -- 性格 
);

-- 表：records
CREATE TABLE IF NOT EXISTS records (
    record_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    cat_id      INTEGER REFERENCES cats (cat_id),      -- 关联猫咪 
    event_type  TEXT    CHECK(event_type IN ('投喂', '救助')), -- 记录类型 [cite: 91]
    event_time  DATETIME DEFAULT CURRENT_TIMESTAMP,    -- 记录时间 [cite: 91]
    description TEXT                                   -- 备注 
);

-- 索引：idx_cat_location
CREATE INDEX IF NOT EXISTS idx_cat_location ON cats (latitude, longitude);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
