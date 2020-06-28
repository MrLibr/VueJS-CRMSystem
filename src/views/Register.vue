<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Home Accounting</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) ||
            ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
            class="helper-text invalid"
            v-if="$v.email.$dirty && !$v.email.required"
        >
          Your Email is Empty
        </small>
        <small
            class="helper-text invalid"
            v-else-if="$v.email.$dirty && !$v.email.email"
        >
          Your Email doesn't match requirements
        </small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) ||
            ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Password</label>
        <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.required"
        >
          Your Password is Empty
        </small>
        <small
            class="helper-text invalid"
            v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
          Your Password doesn't match requirements.
          Minimal Length {{$v.password.$params.minLength.min}} Symbols.
          Now this {{password.length}} Symbols.
        </small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="name">Your Name</label>
        <small
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required"
        >
          Write Your Name
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="rules"/>
          <span>I agree</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Registration
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Are You Have Account?
        <router-link to="/login">Log In</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    rules: false,
  }),
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
    name: { required, minLength: minLength(3) },
    rules: { checked: (v) => v },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };

      try {
        await this.$store.dispatch('register', formData);
        await this.$router.push('/login');
      } catch (e) {
        throw new Error();
      }
    },
  },
};
</script>
