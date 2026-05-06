<template>
  <!-- 👇 加上 @contextmenu.prevent 阻止系统原生菜单弹出 -->
  <div id="map" class="map-container" @contextmenu.prevent></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router' // 引入路由钩子，用于页面跳转
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// 获取路由实例
const router = useRouter()

onMounted(() => {
  // 1. 初始化地图
  const map = L.map('map').setView([31.906, 118.784], 16)
  
  // 加载底图
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map)

  // ---------------- 新增：点击地图获取经纬度 ----------------
  // ---------------- 新增：长按/右键地图获取经纬度 ----------------
  // 👇 把 'click' 改成 'contextmenu'
  map.on('contextmenu', (e) => {
    // 获取点击位置的经纬度，并保留5位小数
    const lat = e.latlng.lat.toFixed(5)
    const lng = e.latlng.lng.toFixed(5)
    
    // 在点击的位置弹出一个提示框 (Popup)
    const popupContent = `
      <div style="text-align: center; min-width: 120px;">
        <div style="margin-bottom: 8px;"><b>📍 选定位置</b></div>
        <div style="font-size: 12px; color: #666;">
          纬度: ${lat}<br>
          经度: ${lng}
        </div>
        <button id="quick-add-btn" style="margin-top: 10px; padding: 6px 12px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; width: 100%;">
          在这里建档
        </button>
      </div>
    `;

    L.popup()
      .setLatLng(e.latlng)
      .setContent(popupContent)
      .openOn(map);
  })

  // 监听弹出框打开事件，给里面的按钮绑定点击跳转逻辑
  map.on('popupopen', (e) => {
    const btn = document.getElementById('quick-add-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const lat = e.popup._latlng.lat;
        const lng = e.popup._latlng.lng;
        // 跳转到建档页面，并通过网址参数(query)把经纬度传过去！
        router.push({ path: '/add', query: { lat: lat, lng: lng } });
      });
    }
  })
  // --------------------------------------------------------

  // 2. 请求后端猫咪数据 (之前的代码保持不变)
  fetch('http://localhost:3000/api/cats')
    .then(response => response.json())
    .then(res => {
      if (res.status === 'success') {
        const cats = res.data;
        cats.forEach(cat => {
          let pointColor = '#65a30d'; 
          if (cat.health_status === '需救助') pointColor = '#eab308'; 
          if (cat.health_status === '已领养') pointColor = '#dc2626'; 

          L.circleMarker([cat.latitude, cat.longitude], {
            color: 'white',
            weight: 2,
            fillColor: pointColor,
            fillOpacity: 1,
            radius: 10
          }).addTo(map)
          .bindPopup(`
            <div style="text-align: center;">
              <b>${cat.nickname}</b><br>
              <span style="color: ${pointColor}">●</span> ${cat.health_status}
            </div>
          `);
        });
      }
    })
    .catch(error => console.error('获取猫咪数据失败:', error));
})
</script>

<style scoped>
.map-container {
  width: 100vw;
  height: calc(100vh - 60px); /* 减去底部 60px 导航栏的高度 */
  background-color: #f0f0f0; /* 给个浅灰色底色，如果地图没加载出来能看到这块区域 */
}
</style>