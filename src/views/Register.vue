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
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="name">{{'Name' | localizeFilter}}</label>
        <small
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required"
        >
          {{'NameWarning' | localizeFilter}}
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="rules"/>
          <span>{{'AnswerForRules' | localizeFilter}}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{'ButtonRegistration' | localizeFilter}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'LogInReference' | localizeFilter}}
        <router-link to="/login">{{'LogIn' | localizeFilter}}</router-link>
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
