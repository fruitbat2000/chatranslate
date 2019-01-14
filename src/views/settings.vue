<template>
  <div class="settings">
    <h1>Settings</h1>
    <p>contact/notification preferences etc will be here</p>
    <lang-selection/>
  </div>
</template>

<script>
import langSelection from '@/components/langSelection'

export default {
  name: 'settings',
  components: {
    langSelection,
  },
  data() {
    return {}
  },
  mounted() {
    console.log('settings mounted')
  },
  computed: {},
}
</script>
