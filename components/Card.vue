<template>
    <div class="card">
        <div class="header text-primary">
            {{ !cityData.title ? city : cityData.title }}
        </div>
        <div v-if="loading" class="content">
            <loader />
        </div>
        <div v-else-if="!cityData.temp && !loading" class="content">
            <p class="error-text">Something went wrong</p>
            <button class="try-again-button" @click="setCityData(city)"> Try Again </button>
        </div>
        <div v-if="cityData.temp" class="content">
            <span :class="`temperature ${temperatureLevel}`">
                {{ cityData.temp }}º
            </span>
        </div>
        <div v-if="cityData.temp" class="footer">
            <div v-if="cityData.humidity || cityData.pressure" class="footer-item">
                <div v-if="cityData.humidity">
                    <p class="text-secondary">HUMIDITY</p>
                    <p class="text-primary">{{ cityData.humidity }}%</p>
                </div>
                <div v-if="cityData.pressure">
                    <p class="text-secondary">PRESSURE</p>
                    <p class="text-primary">{{ cityData.pressure }}<small>hPa</small></p>
                </div>
            </div>
            <div v-if="updated" class="footer-item">
                <small class="text-secondary">Updated at {{ updated }}</small>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from './Loader.vue'
export default {
    components: {
        Loader
    },
    props: {
        city: String,
    },
    data() {
        return {
            apiKey: 'd5f00963dfd32d41007957656c335a87',
            cityData: {},
            updated: '',
            loading: false
        }
    },
    computed: {
        temperatureLevel() {
            if (this.cityData.temp <= 5)
                return 'cold'
            if (this.cityData.temp <= 25)
                return 'warm'
            if (this.cityData.temp > 25)
                return 'hot'
            return ''
        }
    },
    mounted() {
        this.setCityData(this.city)
        setInterval( () => {this.getCityWeather(this.city)}, 600000 );
    },
    methods: {
    async setCityData(city) {
        let sucess
        try {
            this.cityData = {}
            this.loading = true
            const {name, country, lat, lon} = await this.geocodeCity(city)
            const {temp, humidity, pressure} = await this.getWeather(lat, lon)
            this.cityData = { 
                title: `${name}, ${country}`,
                temp: Math.round(temp),
                humidity: Math.round(humidity),
                pressure: Math.round(pressure),
            }
            sucess = true; 
        } catch {
            this.cityData = {
                title: city
            }
            sucess = false;
        } 
        const date = new Date()
        this.updated = date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        })
        this.loading = false
        return sucess
    },
    async geocodeCity(city) {
        try {
            const geocode = await this.$axios.$get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${this.apiKey}`)
            return geocode[0]
        } catch {
            return false
        }
    },
    async getWeather(lat, lon) {
        try {
            const weather = await this.$axios.$get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`)
            return weather.main
        } catch {
            return false
        }
    }
    }
}
</script>

<style lang="scss" src="../assets/scss/card.scss" scoped/>