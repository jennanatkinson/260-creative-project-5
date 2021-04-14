<template>
  <div class="shop">
    <div class="pageHeader">
      <h1 class="center">SHOP</h1>
    </div>
    <div class="content">
      <div id="filterSelector" class="center">
        <p>Display:</p>
        <div id="filterOptions" class="center">
          <div class="center">
            <input type="radio" id="all" value="all" v-model="displayAllRadio" checked="checked" @click="displayAll">
            <label for="all">All</label>
          </div>
          <div class="center" v-if="accountCreated">
            <input type="radio" id="favorites" value="favorites" v-model="displayFavoritesRadio" @click="displayFavorites">
            <label for="favorites">Favorites</label>
          </div>
          <div class="center" v-if="accountCreated">
            <input type="radio" id="dietarySafe" value="dietarySafe" v-model="displaySafeFoodsRadio" @click="displaySafeFoods">
            <label for="dietarySafe">Dietary Safe</label>
          </div>
        </div>
      </div>
      <ProductList :products="products" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProductList from "../components/ProductList.vue"
export default {
  name: 'Shop',
  components: {
    ProductList
  },
  data() {
    return {
      displayAllRadio: true,
      displayFavoritesRadio: false,
      displaySafeFoodsRadio: false,
    }
  },
  created() {
    this.getSafeFoods();
    this.getFavorites();
    this.getAllProducts();
  },
  computed: {
    products() {
      if (this.displayFavoritesRadio) {
        return this.$root.$data.products.favorites;
      }
      if (this.displaySafeFoodsRadio) {
        return this.$root.$data.products.safe;
      }
      return this.$root.$data.products.all;
    },
    accountCreated() {
      return !(this.$root.$data.user === null || this.$root.$data.user === undefined);
    },
  },
  methods: {
    async displayAll() {
      this.displayFavoritesRadio = false;
      this.displaySafeFoodsRadio = false;
      this.getAllProducts();
    },
    async getAllProducts() {
      try {
        if (this.accountCreated) {
          let response = await axios.get(`/api/users/${this.$root.$data.user._id}/all`);
          this.$root.$data.products.all = response.data.products;
        }
        else {
          let response = await axios.get('/api/products');
          this.$root.$data.products.all = response.data.products;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async displayFavorites() {
      if (!this.accountCreated) {
        //alert("Please make an account to access this feature");
        return;
      }
      this.displayAllRadio = false;
      this.displaySafeFoodsRadio = false;
      this.getFavorites();
    },
    async getFavorites() {
      if (!this.accountCreated) {
        return;
      }
      try {
        let response = await axios.get(`/api/users/${this.$root.$data.user._id}/favorite`);
        this.$root.$data.products.favorites = response.data.products;
      } catch (error) {
        console.log(error);
      }
    },
    async displaySafeFoods() {
      if (!this.accountCreated) {
        //alert("Please make an account to access this feature");
        return;
      }
      this.displayAllRadio = false;
      this.displayFavoritesRadio = false;
      this.getSafeFoods();
    },
    async getSafeFoods() {
      if (!this.accountCreated) {
        return;
      }
      try {
        let response = await axios.get(`/api/users/${this.$root.$data.user._id}/allerginFriendly`);
        this.$root.$data.products.safe = response.data.products;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
#filterSelector {
  display: block;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 100px;
}
#filterOptions {
  display: block;
}
#filterOptions input {
  align-items: center;
}
#filterOptions label {
  padding-left: 5px;
  font-family: 'Prata', serif;
}
.center {
  width: 60%;
}
@media screen and (min-width: 800px) {
  #filterSelector {
    display: flex;
    margin-bottom: 0px;
  }
  #filterOptions {
    display: flex;
  }
}
</style>