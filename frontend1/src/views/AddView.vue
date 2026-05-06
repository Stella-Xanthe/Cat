<template>
  <div class="page">
    <h2>➕ 给新猫咪建档</h2>
    
    <!-- 表单提交时，会触发 submitCat 函数 -->
    <form @submit.prevent="submitCat" class="add-form">
      
      <label>猫咪昵称：</label>
      <input v-model="formData.nickname" type="text" required placeholder="例如：大橘" />

      <label>健康状态：</label>
      <select v-model="formData.health_status">
        <option value="健康">🟢 健康</option>
        <option value="需救助">🟡 需救助</option>
        <option value="已领养">🔴 已领养</option>
      </select>

      <label>发现位置 (纬度 Latitude)：</label>
      <input v-model="formData.latitude" type="number" step="0.0001" required />

      <label>发现位置 (经度 Longitude)：</label>
      <input v-model="formData.longitude" type="number" step="0.0001" required />

      <button type="submit" class="submit-btn">💾 保存并上传</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue' // 👇 引入 onMounted
import { useRouter, useRoute } from 'vue-router' // 👇 引入 useRoute

const router = useRouter()
const route = useRoute() // 👇 获取当前路由信息的工具

const formData = ref({
  nickname: '',
  health_status: '健康',
  latitude: 31.9050, 
  longitude: 118.7850
})

// 👇 新增：页面一加载，就去看看网址里有没有传过来的经纬度
onMounted(() => {
  if (route.query.lat && route.query.lng) {
    formData.value.latitude = parseFloat(route.query.lat).toFixed(5);
    formData.value.longitude = parseFloat(route.query.lng).toFixed(5);
  }
})



// 点击保存按钮后执行的魔法
const submitCat = () => {
  // 呼叫我们刚才在后端写的那个 POST 接口
  fetch('http://localhost:3000/api/cats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // 把表单里的数据打包成 JSON 字符串发过去
    body: JSON.stringify(formData.value)
  })
  .then(response => response.json())
  .then(res => {
    if (res.status === 'success') {
      alert('🎉 ' + res.message) // 弹窗提示成功！
      // 成功后，像魔法一样自动跳转回“首页”地图！
      router.push('/')
    } else {
      alert('保存失败：' + res.message)
    }
  })
  .catch(err => {
    console.error(err)
    alert('网络请求失败，请检查后端是否运行')
  })
}
</script>

<style scoped>
.page {
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}
.add-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}
label {
  font-weight: bold;
  color: #333;
}
input, select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}
.submit-btn {
  margin-top: 20px;
  padding: 12px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}
.submit-btn:hover {
  background-color: #2563eb;
}
</style>