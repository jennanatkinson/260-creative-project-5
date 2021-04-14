<template>
  <div class="home">
    <div id="main-page-row1">
      <div class="large-image" id="main-page-image"></div>
      <div id="main-page-title">
        <h1> "Let Them Eat Cake" </h1>
        <h4>BAKERY</h4>
        <p id="established-tag">EST. 1793</p>
      </div>
    </div>
    <div id="main-page-row2">
      <div id="main-page-about">
        <h2>GORMET GLUTEN-FREE BAKING</h2>
        <p>We created this bakery to introduce luxury into allergen friendly baking.</p>
      </div>
      <div class="large-image" id="main-page-about-image"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
<style scoped>
#main-page-row1 {
  display: block;
}
#main-page-title {
  background-image: url("~@/assets/images/marie-antoinette-in-the-park-box.jpg");
  background-size: cover;

  text-align: center;
  padding-top: 200px;
  padding-bottom: 100px;
}
#establised-tag {
  margin-top: 100px;
}
#main-page-row2 {
  display: block;
  margin-top: 50px;
}
#main-page-about {
  background-image: url("~@/assets/images/pexels-tove-liu-box.jpg");
  background-size: cover;

  height: auto;
  text-align: center;
  padding-left: 100px;
  padding-right: 100px;
  padding-top: 200px;
  padding-bottom: 200px;
}

@media screen and (min-width: 400px) {
}

@media screen and (min-width: 800px) {
  #main-page-row1 {
    display: flex;
    height: 800px;
  }
  #main-page-image {
    background-image: url("~@/assets/images/marie-antoinette-in-the-park.jpg");
    width: 60%;
    height: auto;
    background-size: cover;
    margin: 0px;
  }
  #main-page-title {
    background-image: none;
    width: 40%;
    height: auto;
    text-align: center;
    padding-top: 300px;
    padding-bottom: 0px;
    padding-left: 25px;
    padding-right: 25px;
  }
  #establised-tag {
    margin-top: 100px;
  }
  #main-page-row2 {
    display: flex;
    height: 800px;
    margin-top: 0px;
  }
  #main-page-about {
    background-image: none;
    width: 60%;
    height: auto;
    text-align: center;
    padding-top: 300px;
    padding-bottom: 0px;
    padding-left: 50px;
    padding-right: 50px;
  }
  #main-page-about-image {
    background-image: url("~@/assets/images/pexels-tove-liu.jpg");
    width: 40%;
    height: auto;
    background-size: cover;
    background-position: center;
    margin: 0px;
  }
}
</style>
