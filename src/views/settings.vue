<template>
  <div class="settings">
    <h1>Settings</h1>
    <h3>Primary language:</h3>
    <lang-selection v-if="$store.state.user"/>
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
