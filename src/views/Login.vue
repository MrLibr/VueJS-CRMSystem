<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{'HomeAccountingTitle' | localizeFilter}}</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) ||
            ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">{{'Email' | localizeFilter}}</label>
        <small
            class="helper-text invalid"
            v-if="$v.email.$dirty && !$v.email.required"
        >
          {{'EmailWarningEmpty' | localizeFilter}}
        </small>
        <small
            class="helper-text invalid"
            v-else-if="$v.email.$dirty && !$v.email.email"
        >
          {{'EmailWarningRequirement' | localizeFilter}}
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
        <label for="password">{{'Password' | localizeFilter}}</label>
        <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.required"
        >
          {{'PasswordWarningEmpty' | localizeFilter}}
        </small>
        <small
            class="helper-text invalid"
            v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
          {{'PasswordWarningRequirementStart' | localizeFilter}}
          {{$v.password.$params.minLength.min}}
          {{'PasswordWarningRequirementEnd' | localizeFilter}}
          {{password.length}}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{'LogIn' | localizeFilter}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'RegistrationReference' | localizeFilter}}
        <router-link to="/register">{{'ButtonRegistration' | localizeFilter}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';
import messages from '../utils/messages';

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
  }),
  validations: {
    email: { email, required },
    password: { minLength: minLength(6), required },
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
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
      };

      try {
        await this.$store.dispatch('login', formData);
        await this.$router.push('/');
      } catch (error) {
        await this.$router.push('/login');
      }
    },
  },
};
</script>
