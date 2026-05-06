<template>
  <!-- 动态显示的页面内容会放在这里 -->
  <router-view></router-view>

  <!-- 底部导航栏 -->
  <nav class="bottom-nav">
    <router-link to="/" class="nav-item">🏠 首页</router-link>
    <router-link to="/archive" class="nav-item">📚 档案</router-link>
    <router-link to="/add" class="nav-item">➕ 建档</router-link>
    <router-link to="/profile" class="nav-item">👤 我的</router-link>
  </nav>
</template>

<style>
/* 全局样式重置 */
html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; }

/* 底部导航栏样式 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
  z-index: 1000; /* 保证导航栏浮在最上层 */
}

.nav-item {
  text-decoration: none;
  color: #666;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.router-link-active {
  color: #3b82f6;
  font-weight: bold;
}
</style>