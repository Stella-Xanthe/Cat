<template>
  <div class="page">
    <!-- 头部：用户基本信息 -->
    <div class="user-header">
      <div class="avatar">👩‍🎓</div>
      <div class="info">
        <h2>同学，你好！</h2>
        <p>校园流浪猫守护者</p>
      </div>
    </div>

    <!-- 标签页切换器 -->
    <div class="tabs">
      <button 
        :class="{ active: currentTab === 'cats' }" 
        @click="currentTab = 'cats'"
      >
        我提交的猫咪
      </button>
      <button 
        :class="{ active: currentTab === 'feedings' }" 
        @click="currentTab = 'feedings'"
      >
        我的投喂记录
      </button>
    </div>

    <!-- 动态内容展示区 -->
    <div class="content">
      <!-- 列表1：我提交的猫咪 -->
      <div v-if="currentTab === 'cats'" class="list-container">
        <!-- 如果没有数据就显示提示 -->
        <p v-if="myCats.length === 0" class="empty-tip">你还没有建档过猫咪哦~</p>
        
        <div v-for="cat in myCats" :key="cat.id" class="item-card">
          <div class="card-icon">🐈</div>
          <div class="card-info">
            <h3>{{ cat.nickname }}</h3>
            <p>📍 发现地: {{ cat.location }}</p>
            <p class="time">🕒 {{ cat.date }}</p>
          </div>
        </div>
      </div>

      <!-- 列表2：我的投喂记录 -->
      <div v-if="currentTab === 'feedings'" class="list-container">
        <p v-if="myFeedings.length === 0" class="empty-tip">最近还没有投喂记录呢~</p>

        <div v-for="record in myFeedings" :key="record.id" class="item-card">
          <div class="card-icon">🥫</div>
          <div class="card-info">
            <h3>投喂：{{ record.catName }}</h3>
            <p>🍖 食物: {{ record.food }}</p>
            <p class="time">🕒 {{ record.time }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 当前激活的标签页，默认显示 'cats' (猫咪)
const currentTab = ref('cats')

// --- 模拟数据 (以后改成从后端 fetch) ---

// 模拟：我建档的猫咪
const myCats = ref([
  { id: 1, nickname: '大橘', location: '图书馆门口', date: '2024-04-10' },
  { id: 2, nickname: '煤球', location: '三食堂后巷', date: '2024-04-15' }
])

// 模拟：我的投喂记录
const myFeedings = ref([
  { id: 1, catName: '大橘', food: '全价猫粮 + 鸡肉冻干', time: '今天 12:30' },
  { id: 2, catName: '三花', food: '猫条', time: '昨天 18:15' }
])
</script>

<style scoped>
.page {
  padding: 20px;
  background-color: #f9fafb;
  height: calc(100vh - 60px); 
  overflow-y: auto;
}

/* 头部样式 */
.user-header {
  display: flex;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  margin-bottom: 20px;
}
.avatar {
  font-size: 50px;
  background: #e5e7eb;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}
.info h2 { margin: 0 0 5px 0; color: #1f2937; }
.info p { margin: 0; color: #6b7280; font-size: 14px; }

/* 标签页样式 */
.tabs {
  display: flex;
  margin-bottom: 15px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}
.tabs button {
  flex: 1;
  padding: 12px 0;
  border: none;
  background: transparent;
  font-size: 16px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}
.tabs button.active {
  background: #3b82f6;
  color: white;
  font-weight: bold;
}

/* 列表卡片样式 */
.item-card {
  display: flex;
  background: white;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}
.card-icon {
  font-size: 30px;
  margin-right: 15px;
}
.card-info h3 { margin: 0 0 5px 0; font-size: 16px; }
.card-info p { margin: 3px 0; font-size: 14px; color: #4b5563; }
.card-info .time { color: #9ca3af; font-size: 12px; }
.empty-tip { text-align: center; color: #9ca3af; margin-top: 30px; }
</style>