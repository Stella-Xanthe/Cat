<template>
  <div id="map" class="map-container"></div>
</template>
<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
onMounted(() => {
  const map = L.map('map').setView([31.906, 118.784], 16)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map)
})
</script>
<style scoped>
.map-container { width: 100vw; height: calc(100vh - 60px); } /* 减去底部导航栏的高度 */
</style>