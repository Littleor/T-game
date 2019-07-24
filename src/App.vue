
<template>
  <div id="app">
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
  export default {
    name: "App",

  }
</script>

<style >
  body{
    padding: 0;
    margin: 0;
  }
  button{
    background-color: rgba(255, 255, 255, 0);
  }
</style>
