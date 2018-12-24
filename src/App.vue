<template>
  <div id="app">
    {{msg}}
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      msg: 'hello webpack4'
    }
  }
}
</script>

