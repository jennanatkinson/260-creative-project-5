<template>
  <div class="about">
    <div class="pageHeader">
      <h1 class="center">ABOUT</h1>
    </div>

    <div id="about-page-row1">
      <div class="center" id="about-story">
        <img id="separator" src="~@/assets/images/golden-spoon-favicon.png">
        <p>We created this bakery for those excluded at luncheons, at picnics and at potlucks.
          For the weddings and graduations, celebrating those with dietary restrictions.
          Everything we create is gluten-free, and most of our products are dairy-free as well.
          We hope to make your day special with delicious, gourmet baked goods.</p>
      </div>
      <div id="about-image-1"></div>
    </div>
    <div id="about-page-row2">
      <div id="about-image-2"></div>
      <div class="center" id="about-contact-info">
        <p>E 17th St & Union Square W<br>New York, NY 10003</p>
        <p>MWF 7:30AM–5PM</p>
        <p>(212) 555-0044</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.center {
  width: 65%;
}
#about-page-row1 {
  display: block;
}
#separator {
  margin-bottom: 20px;
}
#about-story {
  padding-top: 50px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 50px;
}
#about-image-1 {
  background-image: url("~@/assets/images/shop-1.jpg");
  background-size: cover;
  height: 150px;
}
#about-page-row2 {
  display: block;
  margin-top: 50px;
}
#about-image-2 {
  background-image: url("~@/assets/images/shop-2.jpg");
  background-size: cover;
  height: 150px;
}
#about-contact-info {
  padding-top: 50px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 50px;
}

@media screen and (min-width: 400px) {
}

@media screen and (min-width: 800px) {
  #about-page-row1 {
    display: flex;
    height: 400px;
  }
  #about-story {
    width: 60%;
    padding-top: 100px;
    padding-left: 100px;
    padding-right: 100px;
    padding-bottom: 100px;
  }
  #about-image-1 {
    width: 40%;
    height: auto;
    background-size: cover;
    margin: 0px;
  }
  #about-page-row2 {
    display: flex;
    height: 400px;
    margin-top: 0px;
  }
  #about-image-2 {
    width: 60%;
    height: auto;
    background-size: cover;
    margin: 0px;
  }
  #about-contact-info {
    width: 40%;
    padding-top: 100px;
    padding-left: 100px;
    padding-right: 100px;
    padding-bottom: 100px;
  }
}

</style>
