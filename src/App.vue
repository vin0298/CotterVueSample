<template>
  <div id="app" class="small-container">
    <!-- <LoginForm /> -->
    <CotterForm />
  </div>
</template>

<script>
import CotterForm from './components/CotterForm.vue'

 export default {
    name: 'App',
        components: {
            CotterForm
        }
}
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    button {
        background: #009435;
        border: 1px solid #009435;
    }

</style>
