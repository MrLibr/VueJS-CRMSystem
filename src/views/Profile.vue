<template>
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | localizeFilter}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
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

      <div class="switch language">
          <p>{{'ProfileChangeLanguage' | localizeFilter}}</p>
        <label class="italic-font">
          {{'LanguageRussian' | localizeFilter}}
          <input type="checkbox" v-model="isEnLocale">
          <span class="lever"></span>
          {{'LanguageEnglish' | localizeFilter}}
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'ButtonUpdate' | localizeFilter}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import M from 'materialize-css';
import { mapGetters } from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'profile',
  data: () => ({
    name: '',
    isEnLocale: true,
  }),
  computed: {
    ...mapGetters(['info']),
  },
  validations: {
    name: { required, minLength: minLength(3) },
  },
  mounted() {
    this.name = this.info.name;
    this.isEnLocale = this.info.locale === 'en-US';

    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        const formData = {
          name: this.name,
          locale: this.isEnLocale ? 'en-US' : 'ru-RU',
        };

        await this.$store.dispatch('updateInfo', formData);
      } catch (error) {
        throw new Error();
      }
    },
  },
};
</script>

<style scoped>
  .language {
    padding-top: 10px;
    padding-bottom: 50px;
  }

  .italic-font {
    font-style: italic;
  }
</style>
