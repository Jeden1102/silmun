<template>
  <nav>
    <img src="@/assets/silmun-logo.png" height="100" alt="" />
    <h1>SILMUN HELPER</h1>
  </nav>
  <div class="app-view">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.app-view {
  width: 90%;
  margin: 0 auto;
  padding: 20px;
}
nav {
  background: #032854;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  padding: 15px 0;
  h1 {
    color: white;
  }
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
