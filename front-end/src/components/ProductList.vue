<template>
  <div class="content">
    <div class="product" v-for="product in products" :key="product.id">
      <div class="shop-item center">
        <h4>{{ product.name }}</h4>
        <p>${{ product.price }}</p>
        <button v-if="accountCreated" class="shopButton"
        @click="toggleFavorite(product)">
          {{getFavoriteMessage(product)}}
        </button>
      </div>
      <div class="shop-item-picture small-image center" :id="'product' + product.id">
        <img :src="require('../assets/images/shop/' + product.image)"/>
      </div>
      <div class="break"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "ProductList",
  props: {
    products: Array
  },
  data() {
    return {
    }
  },
  computed: {
    accountCreated() {
      return !(this.$root.$data.user === null || this.$root.$data.user === undefined);
    }
  },
  methods: {
    async toggleFavorite(item) {
      if (!this.accountCreated) {
        return;
      }
      try {
        if (item.favorite) { //send unfavorite request
          await this.unfavoriteItem(item);
        }
        else { //send favorite request
          await this.favoriteItem(item);
        }
        this.$parent.getSafeFoods();
        this.$parent.getFavorites();
        this.$parent.getAllProducts();
      } catch (error) {
        console.log(error);
      }
    },
    async favoriteItem(item) {
      try {
        let response = await axios.put(`/api/users/${this.$root.$data.user._id}/favorite/${item._id}`);
        this.$root.$data.user = response.data.user;
      } catch (error) {
        console.log(error);
      }
    },
    async unfavoriteItem(item) {
      try {
        let response = await axios.put(`/api/users/${this.$root.$data.user._id}/unfavorite/${item._id}`);
        this.$root.$data.user = response.data.user;
      } catch (error) {
        console.log(error);
      }
    },
    getFavoriteMessage(item) {
      if (item.favorite) {
        return "Unfavorite";
      }
      else {
        return "Favorite";
      }
    },
  }
};
</script>

<style scoped>
h4 {
  font-size: 20px;
  font-weight: 300;
}
.small-image {
  width: 300px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-size: cover;
}
.content {
  display: block;
  margin-top: 30px;
  margin-bottom: 100px;
}
.content h4 {
  text-transform: uppercase;
}
.break {
  margin-top: 150px;
}
.shopButton {
  background-color: #3F5957;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 4px 2px;
  cursor: pointer;
}
.shopButton:hover {
  background-color: #73908F;
}
.shop-favorite-selected {
  border: 2px;
  border-color: #73908F;
}
.shop-nutrition {
  margin-top: 20px;
}
.product img {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  object-fit: cover;
}

@media screen and (min-width: 400px) {
}

@media screen and (min-width: 800px) {
  h4 {
    font-size: 25px;
  }
  .product {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0px;
    height: auto;
  }
  .shop-item {
    height: 300px;
    width: 50%;
    padding-top: 200px;
  }
  .shop-item-pic {
    width: 600px;
  }
  .small-image {
    width: 40%;
  }
  .break {
    margin-top: 50px;
    flex-basis: 100%;
    height: 0;
  }
}

</style>