PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- 表：cats
CREATE TABLE IF NOT EXISTS cats (
    cat_id          INTEGER PRIMARY KEY AUTOINCREMENT, 
    nickname        TEXT    NOT NULL,                  
    discovery_time  DATETIME,                          
    latitude        REAL    NOT NULL,                  
    longitude       REAL    NOT NULL,                  
    appearance      TEXT,                              
    health_status   TEXT    CHECK(health_status IN ('健康', '需救助', '已领养')), 
    is_sterilized   INTEGER DEFAULT 0,                 
    personality     TEXT                               
);

-- 表：records
CREATE TABLE IF NOT EXISTS records (
    record_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    cat_id      INTEGER REFERENCES cats (cat_id),      
    event_type  TEXT    CHECK(event_type IN ('投喂', '救助')), 
    event_time  DATETIME DEFAULT CURRENT_TIMESTAMP,    
    description TEXT                                   
);

-- 索引：idx_cat_location
CREATE INDEX IF NOT EXISTS idx_cat_location ON cats (latitude, longitude);

-- 插入测试猫咪数据
INSERT INTO cats (nickname, discovery_time, latitude, longitude, appearance, health_status, is_sterilized, personality) VALUES
('可可', '2026-04-20 10:00:00', 31.906, 118.783, '英短白蓝猫', '健康', 1, '温顺'),
('心心', '2026-04-21 14:00:00', 31.907, 118.785, '橘猫', '需救助', 0, '调皮'),
('蕾蕾', '2026-04-22 09:00:00', 31.904, 118.786, '狸花猫', '已领养', 1, '高冷');

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;