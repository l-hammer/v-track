<template>
  <div id="app">
    <header>
      <h1>v-track</h1>
      <div class="command">yarn add v-track or npm add v-track --save</div>
      <nav>
        <a href="https://unpkg.com/v-track/dist/v-track.min.js"
          ><img
            src="http://img.badgesize.io/https://unpkg.com/v-track/dist/v-track.min.js?compression=gzip&style=flat-square"
            alt="Gzip Size"
        /></a>
        <a href="https://www.npmjs.com/package/v-track"
          ><img
            src="https://img.shields.io/npm/v/v-track.svg?colorB=brightgreen&style=flat-square"
        /></a>
        <a href="https://github.com/facebook/jest"
          ><img src="https://img.shields.io/badge/tested_with-jest-99424f.svg"
        /></a>
        <a href="http://hits.dwyl.io/l-hammer/v-track" alt="hit count"
          ><img src="http://hits.dwyl.io/l-hammer/v-track.svg"
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

    <router-view />

    <section class="footer">
      <div class="section-content mini">
        Copyright © 2019-present LHammer
      </div>
    </section>
  </div>
</template>

<style lang="scss">
@import "./assets/index.scss";

body {
  background: white;
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
header {
  background: $primary-color;
  padding: 32px;
  padding-bottom: 8px;
  nav,
  .description {
    text-align: center;
  }
  .description {
    color: white;
    margin-top: 8px;
  }
}
section {
  .section-content {
    margin: 0 42px;
    padding: 64px 0;
    box-sizing: border-box;
    &.small {
      padding: 32px 0;
    }
    &.mini {
      padding: 16px 0;
    }
  }
  &.nav {
    text-align: center;
    background: $primary-color;
    padding: 24px;
    padding-bottom: 35px;
    @include h-box;
    @include box-center;
    a {
      display: inline-block;
      padding: 8px 16px;
      color: white;
      background: lighten($primary-color, 10%);
      border-radius: 3px;
      &:hover {
        background: lighten($primary-color, 20%);
      }
      &:not(:last-child) {
        margin-right: 8px;
      }
    }
  }
}
.collapse {
  .section-content {
    padding: 12px 0 64px 0;
  }
}
h1 {
  color: white;
  font-weight: normal;
  text-align: center;
  margin: 0 0 32px;
}
h2 {
  &:first-child {
    margin-top: 0;
  }
  font-weight: normal;
}
a {
  color: $primary-color;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: lighten($primary-color, 10%);
  }
}
button,
input {
  font-size: inherit;
  font-family: inherit;
  border: none;
  outline: none;
  padding: 12px 24px;
  border-radius: 2px;
}
button {
  color: $md-grey;
  background: white;
  border: solid 2px $md-grey;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  transition: background 0.3s;
  &:hover {
    background: lighten($md-grey, 30%);
  }
}
.btn {
  padding: 6px 12px;
  display: inline-block;
  background: $primary-color;
  color: white;
  cursor: pointer;
  border-radius: 3px;
  &:hover {
    color: white;
    background: lighten($primary-color, 10%);
  }
}
input {
  background: white;
  display: block;
  margin-bottom: 12px;
  width: 100%;
  box-sizing: border-box;
  border-bottom: solid 2px $md-grey-300;
  border-right: solid 1px $md-grey-100;
  text-align: left;
  &:focus {
    border-bottom-color: $primary-color;
  }
}
label input {
  display: inline-block;
  width: auto;
}
.form {
  margin-bottom: 12px;
}
.tooltip {
  display: block !important;
  z-index: 10000;
  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }
  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
  }
  &[x-placement^="top"] {
    margin-bottom: 5px;
    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }
  &[x-placement^="bottom"] {
    margin-top: 5px;
    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }
  &[x-placement^="right"] {
    margin-left: 5px;
    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }
  &[x-placement^="left"] {
    margin-right: 5px;
    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }
  &[aria-hidden="true"] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }
  &[aria-hidden="false"] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }
  &.info {
    $color: rgba(#004499, 0.9);
    .tooltip-inner {
      background: $color;
      color: white;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, 0.1);
      max-width: 250px;
    }
    .tooltip-arrow {
      border-color: $color;
    }
  }
  &.popover {
    $color: #f9f9f9;
    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, 0.1);
    }
    .popover-arrow {
      border-color: $color;
    }
  }
  &.tooltip-loading {
    .tooltip-inner {
      color: #77aaff;
    }
  }
}
.v-popover {
  &.inline {
    display: inline-block;
    &:not(:last-child) {
      margin-right: 12px;
    }
  }
}
.command {
  background: darken($primary-color, 10%);
  color: white;
  font-family: monospace;
  max-width: 500px;
  margin: 20px auto;
  border-radius: 2px;
  padding: 12px 24px;
  box-sizing: border-box;
  text-align: center;
}
.plus {
  text-align: center;
  color: $primary-color;
  font-size: 32px;
  margin: 12px;
}
.demo,
.snippets {
  margin: 0 42px;
}
.snippet + .snippet {
  margin-top: 20px;
}
.snippet:last-child {
  margin-bottom: 39px;
}

.snippets {
  background: #f9f9f9;
  border-radius: 0 0 3px 3px;
}
.demo {
  background: #eee;
  margin-top: 42px;
  border-radius: 3px 3px 0 0;
  .section-content {
    text-align: center;
    max-width: 560px;
    margin: auto;
  }
  h2 {
    margin-bottom: 24px;
  }
  button {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    padding: 0;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 16px;
    transform: rotate(-20deg);
    &.b2 {
      transform: rotate(30deg);
    }
    &.b3 {
      transform: rotate(-5deg);
    }
    &.popover-btn {
      background: #333;
      color: #eee;
      border-color: #999;
    }
  }
}
.footer {
  font-size: 14px;
  text-align: center;
  background: lighten($primary-color, 45%);
}
</style>
