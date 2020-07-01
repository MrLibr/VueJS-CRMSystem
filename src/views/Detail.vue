<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">History</router-link>
        <a @click.prevent class="breadcrumb">
          {{record.textOfType}}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="record.typeClass">
            <div class="card-content white-text">
              <p>Description: {{record.description}} </p>
              <p>Sum: {{record.amount | currencyFilter('USD')}} </p>
              <p>Category: {{record.categoryName}} </p>

              <small>{{record.date | dateFilter('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>This Record Not Exist</p>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data: () => ({
    record: null,
    loading: true,
  }),
  async mounted() {
    const { id } = this.$route.params;
    const record = await this.$store.dispatch('fetchRecordById', id);
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId);

    this.record = {
      ...record,
      categoryName: category.title,
      textOfType: record.type === 'income' ? 'Income' : 'Outcome',
      typeClass: record.type === 'income' ? 'green' : 'red',
    };

    this.loading = false;
  },
};
</script>
