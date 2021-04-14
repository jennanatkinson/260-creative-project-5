<template>
  <div class="account">
    <div class="pageHeader">
      <h1 class="center">Welcome!</h1>
    </div>
    <div class="formContent">
      <div v-if="!accountCreated || showForm">
        <p>Please create a new account by filling out the information below:</p>
        <form @submit.prevent="updateAccount">
          <input type="text" v-model="name" placeholder="Name">
          <p></p>
          <input type="text" v-model="email" placeholder="Email">
          <p></p>
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
          <br />
          <button type="submit">Save</button>
        </form>

      </div>
      <div v-else class="center">
        <h3>Hello {{name}}!</h3>
        <p>{{email}}</p>
        <br />
        <div v-if="dairyFree || nutFree || vegan || glutenFree">
          <h4>Dietary attributes:</h4>
          <p v-if="dairyFree">Dairy Free</p>
          <p v-if="nutFree">Nut Free</p>
          <p v-if="vegan">Vegan</p>
          <p></p>
          <p v-if="glutenFree" id="gluten-free-message">We see you are Gluten Free! Everything in our bakery is gluten free so you 
            can choose anything off the menu and be reassured it is safe :)</p>
        </div>
        <div v-else>
          <p>No dietary restrictions</p>
        </div>
        <p id="edit-button"><a @click="toggleForm">Edit your account</a></p>
        <p id="delete-button"><a @click="deleteAccount">Delete your account</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Account',
  data() {
    return {
      name: "",
      email: "",
      glutenFree: false,
      dairyFree: false,
      nutFree: false,
      vegan: false,
      showForm: false
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
    toggleForm() {
      this.showForm = !this.showForm;
    },
    async updateAccount() {
      if (!this.accountCreated) {
        this.createAccount();
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
          this.showForm = false;
        } catch (error) {
          console.log(error);
        }
      }
    },
    async createAccount() {
      try {
        let response = await axios.post('/api/users', {
          name: this.name,
          email: this.email,
          dairyFree: this.dairyFree,
          nutFree: this.nutFree,
          vegan: this.vegan
        });
        this.$root.$data.user = response.data.user;
        this.showForm = false;
      } catch (error) {
        console.log(error);
      }
    },
    /*async getUser() {
      try {
        const response = await axios.get(`/api/users/${this.$root.$data.user._id}`);
        this.user = response.data.user;
      } catch (error) {
        console.log(error);  
      }
    },*/
    async deleteAccount() {
      try {
        await axios.delete(`/api/users/${this.$root.$data.user._id}`);
        this.$root.$data.user = null;
        this.name = "";
        this.email = "";
        this.glutenFree = false;
        this.dairyFree = false;
        this.nutFree = false;
        this.vegan = false;
        this.showForm = false;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
.formContent {
  padding-left: 100px;
  padding-right: 100px;
  margin-top: 100px;
  margin-bottom: 400px;
}
.center {
  width: 100%;
}
input {
  padding: 10px;
  border:0;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
  border-radius:10px;
}
input[type=text] {
  width: 50%;
}
input[type=checkbox] {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 20px;
}
#checkboxes {
  margin-top: 30px;
}
button {
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
button:hover {
  background-color: #73908F;
}
#gluten-free-message {
  color: #3F5957;
  font-style: italic;
  margin-top: 30px;
}
#edit-button {
  margin-top: 30px;
  color: grey;
}
#edit-button:hover {
  color: black;
  cursor: pointer;
}
#delete-button {
  margin-top: 5px;
  color: grey;
}
#delete-button:hover {
  color: black;
  cursor: pointer;
}
@media screen and (min-width: 800px) {
  .formContent {
    padding-left: 300px;
    padding-right: 300px;
  }
}
</style>