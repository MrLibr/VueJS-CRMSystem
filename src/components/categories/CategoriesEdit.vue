<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Edit</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select id="select" ref="select" v-model="currencyCategory">
            <option
                v-for="category of categories"
                :key="category.id"
                :value="category.id"
            >{{category.title}}</option>
          </select>
          <label for="select">Select Category</label>
        </div>

        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">Name Your Category</label>
          <span
              class="helper-text invalid"
              v-if="$v.title.$dirty && !$v.title.required"
          >
            Please, write new name for Categories
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
          <label for="limit">Limit</label>
          <span
              class="helper-text invalid"
              v-if="($v.limit.$dirty && !$v.limit.required) &&
              ($v.limit.$dirty && !$v.limit.minValue)"
          >
            Minimal value need to {{$v.limit.$params.minValue.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Edit
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css';
import { minValue, required } from 'vuelidate/lib/validators';

export default {
  name: 'CategoriesEdit',
  data: () => ({
    title: '',
    limit: '',
    select: null,
    currencyCategory: null,
  }),
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  validations: {
    title: { required },
    limit: { required, minValue: minValue(1) },
  },
  watch: {
    currencyCategory(currentId) {
      const { title, limit } = this.categories.find((category) => category.id === currentId);
      this.title = title;
      this.limit = limit;
    },
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.currencyCategory = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.invalid) {
        this.$v.$touch();
      }

      const categoryDate = {
        id: this.currencyCategory,
        title: this.title,
        limit: this.limit,
      };

      try {
        await this.$store.dispatch('updateCategory', categoryDate);
        this.$message('Category updated success');
        this.$emit('updated', categoryDate);
      } catch (error) {
        throw new Error();
      }
    },
  },
};
</script>

<style scoped>

</style>
