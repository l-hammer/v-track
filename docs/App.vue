<template>
  <div id="app">
    <header>
      <h1>v-track</h1>
      <div class="command">yarn add v-track or npm add v-track --save</div>
      <nav>
        <a href="https://travis-ci.org/l-hammer/v-track"
          ><img
            alt="Travis (.org) branch"
            src="https://img.shields.io/travis/l-hammer/v-track/master.svg?logoColor=%23666666&style=flat-square"
        /></a>
        <a href="https://unpkg.com/v-track/dist/v-track.min.js"
          ><img
            src="http://img.badgesize.io/https://unpkg.com/v-track/dist/v-track.min.js?compression=gzip&style=flat-square"
            alt="Gzip Size"
        /></a>
        <a href="https://www.npmjs.com/package/v-track"
          ><img
            src="https://img.shields.io/npm/v/v-track.svg?colorB=brightgreen&style=flat-square"
        /></a>
        <a href="https://github.com/l-hammer/v-track/tree/master/tests/unit"
          ><img
            src="https://img.shields.io/badge/tested_with-jest-99424f.svg?style=flat-square"
        /></a>
        <a href="javascript:void(0);" alt="hit count"
          ><img src="http://hits.dwyl.io/l-hammer/v-track.svg"
        /></a>
        <a href="javascript:void(0);" alt="downloads"
          ><img
            src="https://img.shields.io/npm/dt/v-track.svg?style=flat-square"
        /></a>
        <a href="https://github.com/l-hammer/v-track"
          ><img
            src="https://img.shields.io/github/stars/l-hammer/v-track.svg?style=social&label=Star"
        /></a>
      </nav>
      <div class="description">
        🕹一个基于Vue指令实现的埋点插件~
      </div>
    </header>

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <section class="footer">
      <div class="section-content mini">
        Copyright © 2019-present LHammer
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "./assets/index.scss";
</style>
