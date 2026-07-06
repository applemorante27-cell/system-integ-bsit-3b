<template>
  <div class="app">
    <div class="container">

      <!-- SEARCH -->
      <div class="search-box">
        <input 
          v-model="city" 
          @keyup.enter="getWeather"
          placeholder="Search city..."
        />
        <button @click="getWeather">Search</button>
      </div>

      <!-- LOADING -->
      <p v-if="loading">Loading...</p>

      <!-- ERROR -->
      <p v-if="error" class="error">{{ error }}</p>

      <!-- WEATHER NOW -->
      <div v-if="weather" class="card">
        <h2>{{ weather.name }}</h2>
        <p>{{ currentDate }}</p>

        <h1>{{ Math.round(weather.main.temp) }}°C</h1>
        <p>{{ weather.weather[0].description }}</p>
      </div>

      <!-- YESTERDAY -->
      <div v-if="yesterday" class="card">
        <h3>Yesterday</h3>
        <p>{{ yesterdayDate }}</p>
        <p>{{ Math.round(yesterday.temp) }}°C</p>
      </div>

      <!-- TOMORROW -->
      <div v-if="tomorrow" class="card">
        <h3>Tomorrow</h3>
        <p>{{ tomorrowDate }}</p>
        <p>{{ Math.round(tomorrow.temp) }}°C</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const city = ref('')
const weather = ref(null)
const yesterday = ref(null)
const tomorrow = ref(null)
const loading = ref(false)
const error = ref('')

// ✅ API KEY MO
const apiKey = "38182e2a89d4d08167d075e817d1f148"

// AUTO DATE
const currentDate = new Date().toLocaleString()
const yesterdayDate = new Date(Date.now() - 86400000).toLocaleDateString()
const tomorrowDate = new Date(Date.now() + 86400000).toLocaleDateString()

const getWeather = async () => {
  try {
    loading.value = true
    error.value = ''

    if (!city.value) {
      error.value = "Maglagay ng city"
      return
    }

    // CURRENT WEATHER
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`
    )
    const data = await res.json()

    if (data.cod !== 200) {
      error.value = "City not found"
      weather.value = null
      return
    }

    weather.value = data

    // FORECAST
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&appid=${apiKey}&units=metric`
    )
    const forecastData = await forecastRes.json()

    tomorrow.value = {
      temp: forecastData.list[0].main.temp
    }

    // SIMULATED YESTERDAY
    yesterday.value = {
      temp: weather.value.main.temp - 2
    }

  } catch (err) {
    console.error(err)
    error.value = "May error sa API"
  } finally {
    loading.value = false
  }
}

// ✅ AUTO LOAD
onMounted(() => {
  city.value = "Manila"
  getWeather()
})
</script>

<style>
.app {
  background: linear-gradient(to bottom, #0f172a, #1e293b);
  min-height: 100vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial;
}

.container {
  width: 350px;
}

.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  border: none;
  outline: none;
}

button {
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: #6366f1;
  color: white;
  cursor: pointer;
}

.card {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 15px;
  text-align: center;
}

.error {
  color: #f87171;
  margin-bottom: 10px;
}
</style>