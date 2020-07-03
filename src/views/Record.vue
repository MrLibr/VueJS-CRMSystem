<template>
  <div>
    <div class="page-title">
      <h3>New Record</h3>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">
      You don't have no once categories.
      Please, create categories on <router-link to="/categories">Categories</router-link>
    </p>

    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
          >
            {{category.title}}
          </option>
        </select>
        <label>Choose Any Category</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>Income</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>Outcome</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: ($v.amount.$dirty && !$v.amount.required) &&
              ($v.amount.$dirty && !$v.amount.minValue)}"
        >
        <label for="amount">Sum</label>
        <span
            class="helper-text invalid"
            v-if="($v.amount.$dirty && !$v.amount.required) &&
              ($v.amount.$dirty && !$v.amount.minValue)"
        >
            Minimal value need to {{$v.amount.$params.minValue.min}}
          </span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
            :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">Description</label>
        <span
            class="helper-text invalid"
            v-if="$v.description.$dirty && !$v.description.required"
        >
            Please, write Description
          </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Create
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import M from 'materialize-css';
import { mapGetters } from 'vuex';
import { minValue, required } from 'vuelidate/lib/validators';

export default {
  name: 'Record',
  data: () => ({
    loading: true,
    select: null,
    type: 'income',
    categories: [],
    category: null,
    amount: 1,
    description: '',
  }),
  validations: {
    amount: { required },
    description: { required, minValue: minValue(1) },
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true;
      }
      return this.info.bill >= this.amount;
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;

    if (this.categories.length) {
      this.category = this.categories[0].id;
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      }

      if (this.canCreateRecord) {
        try {
          const formRecord = {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON(),
          };

          await this.$store.dispatch('createRecord', formRecord);

          debugger;

          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount;

          debugger;

          await this.$store.dispatch('updateInfo', { bill });

          debugger;

          this.$message('This Record Created Success');
          this.$v.$reset();
          this.amount = 1;
          this.description = '';
        } catch (error) {
          this.commit('setError', error);
          throw error;
        }
      } else {
        this.$message(`You don't have ${this.amount - this.info.bill} Money on your Bill.`);
      }
    },
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>
