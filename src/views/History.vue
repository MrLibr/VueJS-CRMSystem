<template>
  <div>
    <div class="page-title">
      <h3>My History Records</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!records.length">
      You Don't Have No Once Record.
      <router-link to="/record">Please, Create New Record</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="records"/>
    </section>
  </div>
</template>

<script>
import HistoryTable from '../components/history/HistoryTable.vue';

export default {
  name: 'History',
  data: () => ({
    loading: true,
    records: [],
    categories: [],
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    const records = await this.$store.dispatch('fetchRecords');
    this.records = records.map((record) => ({
      ...record,
      categoryName: this.categories.find((category) => record.categoryId === category.id).title,
      typeClass: record.type === 'income' ? 'green' : 'red',
      typeText: record.type === 'income' ? 'Income' : 'Outcome',
    }));

    this.loading = false;
  },
  components: { HistoryTable },
};
</script>
