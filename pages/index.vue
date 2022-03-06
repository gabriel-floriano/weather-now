<template>
  <div>
    <app-header />
    <div class="main">
      <card
        v-for="city in cities"
        :key="city"
        :city="city"
      />
    </div>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue';
import Card from '~/components/Card.vue';
export default {
  components: {
    Card,
    AppHeader
  },
  data() {
    return {
      cities: ['Nuuk, GL', 'Urubici, BR', 'Nairobi, KE'],
    }
  },
  head() {
    return {
      title: 'Weather Now',
      meta: [
          {
            hid: 'main',
            name: 'home',
            content: 'See the Weather Now',
          }
      ],
    }
  },
}

</script>
