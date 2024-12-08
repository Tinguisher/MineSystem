<template>
  <div class="login-container">
    <h2>Le Sorelle</h2>
    <form @submit.prevent="handleSubmit" class="login-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          v-model="email"
          type="email"
          id="email"
          placeholder="Enter your email"
          required
        />
        <span v-if="email && !validEmail" class="error"
          >Please enter a valid email.</span
        >
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input
          v-model="password"
          type="password"
          id="password"
          placeholder="Enter your password"
          required
        />
        <span v-if="password && password.length < 6" class="error"
          >Password must be at least 6 characters long.</span
        >
      </div>

      <div style="font-size: 14px; margin-bottom: 5%">Forgot Password?</div>

      <button type="submit" :disabled="!isFormValid">Login</button>

      <div v-if="loginError" class="error-message">{{ loginError }}</div>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      loginError: "",
    };
  },
  computed: {
    validEmail() {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return regex.test(this.email);
    },
    isFormValid() {
      return this.validEmail && this.password.length >= 6;
    },
  },
  methods: {
    handleSubmit() {
      if (!this.isFormValid) return;
      // Example: Replace with actual API call
      this.loginUser(this.email, this.password);
    },
    loginUser(email, password) {
      // Simulate login process
      setTimeout(() => {
        if (email === "joyce@pena.com" && password === "joycee") {
          this.loginError = "";
          // Redirect to the Dashboard
          this.$router.push("/landingpage");
        } else {
          this.loginError = "Invalid email or password.";
        }
      }, 1000);
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.error {
  color: red;
  font-size: 12px;
}

.error-message {
  margin-top: 10px;
  color: red;
  text-align: center;
}
</style>
