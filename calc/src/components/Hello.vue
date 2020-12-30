<template>
  <div class="test">
    <h1>{{Message}}</h1>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Hello',
    props: {
      msg: String,
    },
    setup() {
      const msg = 'good';
      return {
        msg,
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>