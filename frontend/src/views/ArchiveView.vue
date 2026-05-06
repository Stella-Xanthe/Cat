<template>
  <div class="page">
    <h2 class="title">📚 猫咪档案库</h2>
    
    <!-- 如果没有数据，显示提示 -->
    <div v-if="cats.length === 0" class="empty-tip">
      <p>暂时还没有猫咪档案，快去地图上发现它们吧！</p>
    </div>

    <!-- 用网格布局展示猫咪卡片 -->
    <div class="cat-grid">
      <div v-for="cat in cats" :key="cat.cat_id" class="cat-card">
        <div class="cat-avatar">🐈</div> <!-- 暂时代替真实照片 -->
        <div class="cat-info">
          <h3>{{ cat.nickname }}</h3>
          <p class="status">
            状态：
            <!-- 根据状态动态改变颜色 -->
            <span :class="getStatusClass(cat.health_status)">
              {{ cat.health_status }}
            </span>
          </p>
          <p class="location">
            📍 {{ cat.latitude.toFixed(3) }}, {{ cat.longitude.toFixed(3) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 准备一个空数组，用来装从后端拿到的猫咪
const cats = ref([])

// 页面一加载，就去后端拉取数据（和地图页面的逻辑一模一样！）
onMounted(() => {
  fetch('http://localhost:3000/api/cats')
    .then(response => response.json())
    .then(res => {
      if (res.status === 'success') {
        cats.value = res.data; // 把拿到的数据塞进数组里
      }
    })
    .catch(err => console.error('获取档案失败:', err))
})

// 一个小魔法：根据健康状态返回不同的 CSS 类名，用来变色
const getStatusClass = (status) => {
  if (status === '健康') return 'text-green'
  if (status === '需救助') return 'text-yellow'
  if (status === '已领养') return 'text-red'
  return 'text-gray'
}
</script>

<style scoped>
.page {
  padding: 20px;
  /* 留出底部导航栏的空间，并允许滚动 */
  height: calc(100vh - 60px); 
  overflow-y: auto;
  background-color: #f9fafb;
}

.title {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.empty-tip {
  text-align: center;
  color: #888;
  margin-top: 50px;
}

.cat-grid {
  display: grid;
  /* 手机上每行1个，屏幕大点就自动变成一行多个 */
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 15px;
  padding-bottom: 20px;
}

.cat-card {
  background: white;
  border-radius: 12px;
  padding: 15px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: transform 0.2s;
}

.cat-card:hover {
  transform: translateY(-2px);
}

.cat-avatar {
  font-size: 40px;
  background: #f3f4f6;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 15px;
}

.cat-info h3 {
  margin: 0 0 5px 0;
  color: #111;
}

.cat-info p {
  margin: 3px 0;
  font-size: 14px;
  color: #666;
}

/* 状态颜色样式 */
.text-green { color: #65a30d; font-weight: bold; }
.text-yellow { color: #eab308; font-weight: bold; }
.text-red { color: #dc2626; font-weight: bold; }
</style>