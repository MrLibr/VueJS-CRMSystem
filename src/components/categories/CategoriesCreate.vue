<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'ButtonCreate' | localizeFilter}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">{{'CategoryName' | localizeFilter}}</label>
          <span
              class="helper-text invalid"
              v-if="$v.title.$dirty && !$v.title.required"
          >
            {{'CategoryWarning' | localizeFilter}}
          </span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: ($v.limit.$dirty && !$v.limit.required) &&
              ($v.limit.$dirty && !$v.limit.minValue)}"
          >
          <label for="limit">{{'Limit' | localizeFilter}}</label>
          <span
              class="helper-text invalid"
              v-if="($v.limit.$dirty && !$v.limit.required) &&
              ($v.limit.$dirty && !$v.limit.minValue)"
          >
            {{'MinimalSumWarning' | localizeFilter}} {{$v.limit.$params.minValue.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'ButtonCreate' | localizeFilter}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css';
import { required, minValue } from 'vuelidate/lib/validators';
import localizeFilter from '../../filters/localize.filter';

export default {
  name: 'CategoriesCreate',
  data: () => ({
    title: '',
    limit: '',
  }),
  validations: {
    title: { required },
    limit: { required, minValue: minValue(1) },
  },
  mounted() {
    M.updateTextFields();
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      }

      const dateForm = {
        title: this.title,
        limit: this.limit,
      };

      try {
        const category = await this.$store.dispatch('categoryCreate', dateForm);

        this.title = '';
        this.limit = '';

        this.$v.$reset();
        this.$message(localizeFilter('CategoryCreateSuccess'));

        this.$emit('created', category);
      } catch (error) {
        throw new Error();
      }
    },
  },
};
</script>
