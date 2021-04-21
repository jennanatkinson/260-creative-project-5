<template>
  <div class="account">
    <div class="pageHeader">
      <h1 class="center">Welcome!</h1>
    </div>
    <div class="content">
      <UpdateAccount v-if="user && showUpdateForm"/>
      <div v-else-if="user" class="center">
        <div class="userInfo">
          <h3>Hello {{name}}!</h3>
          <p>{{email}}</p>
          <br />
          <div v-if="dairyFree || nutFree || vegan">
            <h4>Dietary attributes:</h4>
            <p v-if="dairyFree">Dairy Free</p>
            <p v-if="nutFree">Nut Free</p>
            <p v-if="vegan">Vegan</p>
            <p></p>
          </div>
          <div v-else>
            <p>No extra dietary restrictions</p>
          </div>
          <p id="gluten-free-message">If you are gluten-free, not to worry! Everything in our bakery is gluten free so you 
              can choose anything off the menu and be reassured it is safe :)</p>
        </div>
        <p id="edit-button"><a @click="viewUpdateForm">Edit your account</a></p>
        <p id="delete-button"><a @click="deleteAccount">Delete your account</a></p>
      </div>
      <div v-else class="accountSection">
        <div class="account-buttons hero">
          <div v-bind:class="{clickedButton: showLogin}">
            <p id="login-button" @click="viewLogin">Login</p>
          </div>
          <div v-bind:class="{clickedButton: !showLogin}">
            <p id="register-button" @click="viewRegister">Register</p>
          </div>
        </div>
        <Login v-if="showLogin" />
        <Register v-else />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import UpdateAccount from '@/components/UpdateAccount.vue';
export default {
  name: 'Account',
  components: {
    Login,
    Register,
    UpdateAccount
  },
  data() {
    return {
      showUpdateForm: false,
      showLogin: true
    }
  },
  computed: {
    user() {
      return !(this.$root.$data.user === null || this.$root.$data.user === undefined);
    },
    name() {
      if (this.user) {
        return this.$root.$data.user.name;
      }
      else {
        return null;
      }
    },
    email() {
      if (this.user) {
        return this.$root.$data.user.email;
      }
      else {
        return null;
      }
    },
    dairyFree() {
      if (this.user) {
        return this.$root.$data.user.allergyAttributes.dairyFree;
      }
      else {
        return null;
      }
    },
    nutFree() {
      if (this.user) {
        return this.$root.$data.user.allergyAttributes.nutFree;
      }
      else {
        return null;
      }
    },
    vegan() {
      if (this.user) {
        return this.$root.$data.user.allergyAttributes.vegan;
      }
      else {
        return null;
      }
    }
  },
  methods: {
    viewUpdateForm() {
      this.showUpdateForm = true;
    },
    viewLogin() {
      this.showLogin = true;
    },
    viewRegister() {
      this.showLogin = false;
    },
    async deleteAccount() {
      try {
        await axios.delete(`/api/users/${this.$root.$data.user._id}`);
        this.$root.$data.user = null;
        this.showUpdateForm = false;
        this.showLogin = true;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
.content {
  margin-top: 100px;
  margin-bottom: 200px;
  margin-left: 0px;
  margin-right: 0px;
}
.center {
  width: 100%;
}
.hero {
  padding: 0px 120px;
  display: flex;
  justify-content: center;
}
.account-buttons {
  display: flex;
}
.account-buttons p {
  padding: 20px 50px 20px;
  background-color: #3F5957;
  color: white;
}
.clickedButton p {
  background-color: #73908F;
}
#gluten-free-message {
  color: #3F5957;
  font-style: italic;
  margin-top: 30px;
}
#edit-button {
  margin-top: 50px;
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
@media screen and (max-width: 530px) {
  .hero {
    padding: 0px;
  }
  input[type=text] {
    margin: 200px;
  }
  input[type=password] {
    margin: 200px;
  }
}
</style>