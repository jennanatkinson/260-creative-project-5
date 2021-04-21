<template>
<div class="hero">
  <div class="heroBox">
    <form class="pure-form space-above">
      <fieldset>
        <!--<legend>Login</legend>-->
        <input type="text" placeholder="username" v-model="username">
        <input type="password" placeholder="password" v-model="password">
      </fieldset>
      <fieldset>
        <button type="submit" class="pure-button pure-button-primary" @click.prevent="login">Login</button>
      </fieldset>
    </form>
    <p v-if="error" class="error">{{error}}</p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async login() {
      this.error = '';
      if (!this.username || !this.password)
        return;
      try {
        let response = await axios.post('/api/users/login', {
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = "Error: " + error.response.data.message;
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