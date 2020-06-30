<template>
  <div>
    <div class="page-title">
      <h3>Profile</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
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

      <button class="btn waves-effect waves-light" type="submit">
        Edit
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'profile',
  data: () => ({
    name: '',
  }),
  validations: {
    name: { required, minLength: minLength(3) },
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
        };

        await this.$store.dispatch('updateInfo', formData);
      } catch (e) {
        throw new Error();
      }
    },
  },
};
</script>
