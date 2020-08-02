<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  text-shadow: .1875rem .5rem .4375rem grey;
  font: italic small-caps bold 16px/2em arial, verdana;
}

@media only screen and (max-width: 1024px), only screen and (max-device-width: 1024px) {
	html,
	body {
		font-size: 51.2px;
	}
}
@media only screen and (max-width: 768px), only screen and (max-device-width: 768px) {
	html,
	body {
		font-size: 38.4px;
	}
}
@media only screen and (max-width: 414px), only screen and (max-device-width: 414px) {
	html,
	body {
		font-size: 20.7px;
	}
}

@media only screen and (max-width: 411px), only screen and (max-device-width: 411px) {
	html,
	body {
		font-size: 20.55px;
	}
}

@media only screen and (max-width: 400px), only screen and (max-device-width: 400px) {
	html,
	body {
		font-size: 20px;
	}
}

@media only screen and (max-width: 375px), only screen and (max-device-width: 375px) {
	html,
	body {
		font-size: 18.75px;
	}
}

@media only screen and (max-width: 360px), only screen and (max-device-width: 360px) {
	html,
	body {
		font-size: 18px;
	}
}

@media only screen and (max-width: 320px), only screen and (max-device-width: 320px) {
	html,
	body {
		font-size: 16px;
	}
}

@media only screen and (max-width: 240px), only screen and (max-device-width: 240px) {
	html,
	body {
		font-size: 12px;
	}
}

body,
html,
div,
span,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
ol,
li,
a,
input,
select,
textarea,
p,
img {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

a {
	display: inline-block;
	text-decoration: none;
	color: #666;
 /* 去掉点击后的阴影 */
	-webkit-tap-highlight-color: transparent;
}

ul,
ol {
	list-style: none;
}
</style>
