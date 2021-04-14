<template>
  <div id="app">
    <head>
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Prata&display=swap" rel="stylesheet">
    </head>
    <div class="top-bar">
      <div id="navigation-icon" v-if="mobileView" @click="toggleNav">
        <img src="~@/assets/hamburger-menu-icon.png" />
      </div>
      <div id="navigation" v-if="!mobileView || showNav">
        <p id="account"><router-link to="/account">account</router-link></p>
        <ul id="nav-list" v-bind:class="{ flexDisplay: !mobileView, center: !mobileView }">
          <li><router-link to="/"><img src="~@/assets/images/golden-spoon.png"></router-link></li>
          <li><router-link to="/">HOME</router-link></li>
          <li><router-link to="/about">ABOUT</router-link></li>
          <li><router-link to="/shop">SHOP</router-link></li>
          <li><router-link to="/custom-order">CUSTOM ORDER</router-link></li>
          <li><router-link to="/catering">CATERING</router-link></li>
        </ul>
      </div>
    </div>

    <div class="content">
      <router-view/>
    </div>

    <!--Footer-->
    <div class="footer">
      <p>© Jenna Atkinson, 2021</p>
      <a href="https://github.com/jsunshine321/260-creative-project-4">Git Hub Repository</a>
    </div>
  </div>
</template>

<script>

export default {
  data: () => {
    return {
      mobileView: false,
      showNav: false
    };
  },
  created() { //add get logged in user for lab5
    window.addEventListener("resize", this.handleView);
    this.handleView();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleView);
  },
  methods: {
    handleView() {
      this.mobileView = (window.innerWidth <= 800);
    },
    toggleNav() {
      this.showNav = !this.showNav;
    }
  }
}
</script>

<style>
. {
  font-family: 'Montserrat', sans-serif;
  /*padding: 0 !important;
  margin: 0 !important;*/
}
a {
  color: grey;
}
a:hover {
  color: black;
}
a:visited {
  color: grey;
}
/* Nav bar */

#navigation-icon {
  cursor: pointer;
}
#navigation-icon img {
  width: 5%;
}
.top-bar {
  /*background-color: #f8f9fa;*/
  font-family: 'Prata', serif;
  padding-left: 10px;
}
ul#nav-list {
	min-width: 696px;
	list-style: none;
  padding: 0;
  padding-left: 30px;
  padding-bottom: 10px;
}
ul#nav-list li {
  padding-bottom: 10px;
}
#navigation a {
  text-decoration: none;
}
#account {
  position: absolute;
  right: 30px;
  top: 7px;
}
#nav-list {
  display: block;
}
.flexDisplay {
  display: flex;
}
ul.flexDisplay li {
	display: inline;
  padding: 20px;
}
ul#nav-list.flexDisplay.center {
  padding: 0;
}
/*End of Nav bar*/
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  text-align: center;
}
.pageHeader {
  background:#EBF2F1;
  padding-top: 50px;
  padding-bottom: 50px;
  margin-top: 0px;
  margin-bottom: 0px;
}
.large-image {
  width: 100%;
  height: auto;
  margin-top: 50px;
  margin-bottom: 50px;
}
h1, h2, h3, h4 {
  font-family: 'Prata', serif;
}
.break {
  flex-basis: 100%;
  height: 0;
}
.footer {
  padding-top: 20px;
  padding-bottom: 20px;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  background-color: #C2B8B1;
}
.footer a {
  color: white;
}

@media screen and (min-width: 400px) {
}
@media screen and (min-width: 900px) {

}

</style>
