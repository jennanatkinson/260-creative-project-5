<template>
<div class="hero">
  <div class="heroBox">
    <form class="pure-form">
      <fieldset>
        <input type="text" placeholder="name" v-model="name">
        <input type="text" placeholder="email" v-model="email">
      </fieldset>
      <fieldset>
        <input type="text" placeholder="username" v-model="username">
        <input type="password" placeholder="password" v-model="password">
      </fieldset>
      <fieldset>
        <div id="checkboxes">
            <p id="dietary_restrictions">Check your dietary attributes:</p>
            <input type="checkbox" class="checkbox-button" v-model="glutenFree" id="glutenFree">
              <label for="glutenFree">Gluten-free</label><br>
            <input type="checkbox" class="checkbox-button" v-model="dairyFree" id="dairyFree">
              <label for="dairyFree">Dairy-free</label><br>
            <input type="checkbox" class="checkbox-button" v-model="nutFree" id="nutFree">
              <label for="nutFree">Nut free</label><br>
            <input type="checkbox" class="checkbox-button" v-model="vegan" id="vegan">
              <label for="vegan">Vegan</label><br>
          </div>
      </fieldset>
      <fieldset>
        <button type="submit" class="pure-button pure-button-primary" @click.prevent="register">Sign Up</button>
      </fieldset>
    </form>
    <p v-if="error" class="error">{{error}}</p>
  </div>
</div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      username: '',
      password: '',
      error: '',
      glutenFree: false,
      dairyFree: false,
      nutFree: false,
      vegan: false
    }
  },
  methods: {
    async register() {
      this.error = '';
      if (!this.name || !this.email || !this.username || !this.password)
        return;
      try {
        let response = await axios.post('/api/users', {
          name: this.name,
          email: this.email,
          dairyFree: this.dairyFree,
          nutFree: this.nutFree,
          vegan: this.vegan,
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
  }
}
</script>

<style scoped>
fieldset {
  border: none;
}
.heroBox {
  text-align: center;
}
.pure-button {
  margin: 20px 0px;
  padding: 10px 20px;
  background: #3F5957;
  color: white;
  border: none;
}
input[type="text"], input[type="password"]{
  margin-right: 10px;
  padding: 10px 5px;
  width: 40%;
}
input[type="checkbox"] {
  margin-right: 20px;
  width: 15px;
  height: 15px;
}
label {
  font-size: 13pt;
}
.error {
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #d9534f;
  color: #fff;
}
</style>