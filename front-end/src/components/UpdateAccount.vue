<template>
<div class="updateAccount">
  <div class="center">
  <p>Update any information below:</p>
  <form @submit.prevent="updateAccount">
    <fieldset>
    <input type="text" v-model="name" placeholder="Name">
    <p></p>
    <input type="text" v-model="email" placeholder="Email">
    <p></p>
    </fieldset>
    <fieldset id="checkboxes">
      <p id="dietary_restrictions">Check your dietary attributes:</p>
      <input type="checkbox" class="checkbox-button" v-model="glutenFree" id="glutenFree">
        <label for="glutenFree">Gluten-free</label><br>
      <input type="checkbox" class="checkbox-button" v-model="dairyFree" id="dairyFree">
        <label for="dairyFree">Dairy-free</label><br>
      <input type="checkbox" class="checkbox-button" v-model="nutFree" id="nutFree">
        <label for="nutFree">Nut free</label><br>
      <input type="checkbox" class="checkbox-button" v-model="vegan" id="vegan">
        <label for="vegan">Vegan</label><br>
    </fieldset>
    <fieldset>
      <button type="submit" class="pure-button">Save</button>
    </fieldset>
  </form>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'UpdateAccount',
  data() {
    return {
      name: "",
      email: "",
      glutenFree: false,
      dairyFree: false,
      nutFree: false,
      vegan: false,
    }
  },
  created() {
    if (this.accountCreated) {
      this.name = this.$root.$data.user.name;
      this.email = this.$root.$data.user.email;
      this.dairyFree = this.$root.$data.user.allergyAttributes.dairyFree;
      this.nutFree = this.$root.$data.user.allergyAttributes.nutFree;
      this.vegan = this.$root.$data.user.allergyAttributes.vegan;
    }
  },
  computed: {
    accountCreated() {
      return !(this.$root.$data.user === null || this.$root.$data.user === undefined);
    },
  },
  methods: {
    async updateAccount() { //show register component instead
      if (!this.accountCreated) {
        this.$parent.showUpdateForm = false;
        return;
      }
      else { //update account
        try {
          let response = await axios.put(`/api/users/${this.$root.$data.user._id}`, {
            name: this.name,
            email: this.email,
            dairyFree: this.dairyFree,
            nutFree: this.nutFree,
            vegan: this.vegan
          });
          this.$root.$data.user = response.data.user;
          this.$parent.showUpdateForm = false;
        } catch (error) {
          console.log(error);
        }
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
@media screen and (max-width: 530px) {
  .center {
    width: 100%;
  }
}
</style>