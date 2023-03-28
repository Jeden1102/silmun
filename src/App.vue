<template>
  <nav>
    <img src="@/assets/silmun-logo.png" height="100" alt="" />
    <h1>SILMUN HELPER</h1>
  </nav>
  <div class="app-view">
    <router-view></router-view>
  </div>
  <div class="bottom-nav-container">
    <router-link :to="{ name: 'list' }">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
        <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"
        />
      </svg>
    </router-link>
    <router-link :to="{ name: 'add' }">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
        <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
        />
      </svg>
    </router-link>
    <router-link :to="{ name: 'event' }">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
        />
      </svg>
    </router-link>
  </div>
</template>
<script setup>
import { computed, ref, onMounted } from "vue";
const attendants = ref(null);
function refreshList() {
  attendants.value = JSON.parse(localStorage.getItem("silmun__attendants"));
}
onMounted(() => {
  refreshList();
});
</script>
<style lang="scss">
* {
  color: #2c3e50;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-height: 100vh;
}
.Vue-Toastification__icon,
.Vue-Toastification__toast-body {
  color: white !important;
  margin: 0 10px 0 0 !important;
  path {
    color: white !important;
  }
}
.app-view {
  width: 90%;
  margin: 0 auto;
  padding: 20px;

  padding-bottom: 100px;
  overflow-x: hidden;
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
}
.bottom-nav-container {
  position: fixed;
  left: 0;
  bottom: 0;
  border-radius: 14px 14px 0 0;
  box-shadow: 1px -21px 83px -40px #42445a;
  display: flex;
  height: 100px;
  gap: 20px;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  background: white;
  a {
    font-weight: bold;
    width: 80px;
    height: 80px;
    color: white;
    display: grid;
    place-content: center;
    border-radius: 12px;
    padding: 15px;
    background: #eef0ff;
    padding: 17px;
    border-radius: 15px;
    color: #7996ed;
    svg {
      fill: #7996ed;
    }
    svg {
      height: 40px;
    }
    &.router-link-exact-active {
      background: #7996ed;
      svg {
        fill: white;
      }
    }
  }
}
@supports (-webkit-appearance: none) or (-moz-appearance: none) {
  .checkbox-wrapper {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .checkbox-wrapper input[type="checkbox"] {
    --active: #275efe;
    --active-inner: #fff;
    --focus: 2px rgba(39, 94, 254, 0.3);
    --border: #bbc1e1;
    --border-hover: #275efe;
    --background: #fff;
    --disabled: #f6f8ff;
    --disabled-inner: #e1e6f9;
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 21px;
    outline: none;
    display: inline-block;
    vertical-align: top;
    position: relative;
    margin: 0;
    cursor: pointer;
    border: 1px solid var(--bc, var(--border));
    background: var(--b, var(--background));
    transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
  }
  .checkbox-wrapper input[type="checkbox"]:after {
    content: "";
    display: block;
    left: 0;
    top: 0;
    position: absolute;
    transition: transform var(--d-t, 0.3s) var(--d-t-e, ease),
      opacity var(--d-o, 0.2s);
  }
  .checkbox-wrapper input[type="checkbox"]:checked {
    --b: var(--active);
    --bc: var(--active);
    --d-o: 0.3s;
    --d-t: 0.6s;
    --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
  }
  .checkbox-wrapper input[type="checkbox"]:disabled {
    --b: var(--disabled);
    cursor: not-allowed;
    opacity: 0.9;
  }
  .checkbox-wrapper input[type="checkbox"]:disabled:checked {
    --b: var(--disabled-inner);
    --bc: var(--border);
  }
  .checkbox-wrapper input[type="checkbox"]:disabled + label {
    cursor: not-allowed;
  }
  .checkbox-wrapper input[type="checkbox"]:hover:not(:checked):not(:disabled) {
    --bc: var(--border-hover);
  }
  .checkbox-wrapper input[type="checkbox"]:focus {
    box-shadow: 0 0 0 var(--focus);
  }
  .checkbox-wrapper input[type="checkbox"]:not(.switch) {
    width: 21px;
  }
  .checkbox-wrapper input[type="checkbox"]:not(.switch):after {
    opacity: var(--o, 0);
  }
  .checkbox-wrapper input[type="checkbox"]:not(.switch):checked {
    --o: 1;
  }
  .checkbox-wrapper input[type="checkbox"] + label {
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    margin-left: 4px;
  }

  .checkbox-wrapper input[type="checkbox"]:not(.switch) {
    border-radius: 7px;
  }
  .checkbox-wrapper input[type="checkbox"]:not(.switch):after {
    width: 5px;
    height: 9px;
    border: 2px solid var(--active-inner);
    border-top: 0;
    border-left: 0;
    left: 7px;
    top: 4px;
    transform: rotate(var(--r, 20deg));
  }
  .checkbox-wrapper input[type="checkbox"]:not(.switch):checked {
    --r: 43deg;
  }
  .checkbox-wrapper input[type="checkbox"].switch {
    width: 38px;
    border-radius: 11px;
  }
  .checkbox-wrapper input[type="checkbox"].switch:after {
    left: 2px;
    top: 2px;
    border-radius: 50%;
    width: 17px;
    height: 17px;
    background: var(--ab, var(--border));
    transform: translateX(var(--x, 0));
  }
  .checkbox-wrapper input[type="checkbox"].switch:checked {
    --ab: var(--active-inner);
    --x: 17px;
  }
  .checkbox-wrapper input[type="checkbox"].switch:disabled:not(:checked):after {
    opacity: 0.6;
  }
}

.checkbox-wrapper * {
  box-sizing: inherit;
}
.checkbox-wrapper *:before,
.checkbox-wrapper *:after {
  box-sizing: inherit;
}
input[type="text"] {
  border: 0;
  outline: 0;
  color: rgb(60, 66, 87);
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
    rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px,
    rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
    rgb(0 0 0 / 0%) 0px 0px 0px 0px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  padding: 4px 8px;
  min-height: 28px;
  vertical-align: middle;
  transition: background-color 0.24s, box-shadow 0.24s;
  transition-property: background-color, box-shadow;
  transition-duration: 0.24s, 0.24s;
  transition-timing-function: ease, ease;
  transition-delay: 0s, 0s;
  :focus {
    box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px,
      rgb(58 151 212 / 36%) 0px 0px 0px 4px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
      rgb(60 66 87 / 16%) 0px 0px 0px 1px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
      rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px;
  }
}

/* CSS */
button {
  appearance: button;
  backface-visibility: hidden;
  background-color: #405cf5;
  border-radius: 6px;
  border-width: 0;
  box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
    rgba(50, 50, 93, 0.1) 0 2px 5px 0, rgba(0, 0, 0, 0.07) 0 1px 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue",
    Ubuntu, sans-serif;
  font-size: 100%;
  height: 44px;
  line-height: 1.15;
  margin: 5px 0 0;
  outline: none;
  overflow: hidden;
  padding: 0 25px;
  position: relative;
  text-align: center;
  text-transform: none;
  transform: translateZ(0);
  transition: all 0.2s, box-shadow 0.08s ease-in;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: fit-content;
  &.danger {
    background: rgb(255, 70, 70);
  }
}

button:disabled {
  cursor: default;
}

button:focus {
  box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
    rgba(50, 50, 93, 0.2) 0 6px 15px 0, rgba(0, 0, 0, 0.1) 0 2px 2px 0,
    rgba(50, 151, 211, 0.3) 0 0 0 4px;
}
</style>
