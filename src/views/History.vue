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
      <HistoryTable :records="items"/>
      <Paginate
          class="center"
          v-model="pageCurrent"
          :page-count="pageCount"
          :click-handler="pageChangeHandler"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from '../components/history/HistoryTable.vue';
import paginationMixin from '../mixins/pagination.mixin';

export default {
  name: 'History',
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
  }),
  async mounted() {
    const categories = await this.$store.dispatch('fetchCategories');
    this.records = await this.$store.dispatch('fetchRecords');
    this.setupPagination(this.records.map((record) => ({
      ...record,
      categoryName: categories.find((category) => record.categoryId === category.id).title,
      typeClass: record.type === 'income' ? 'green' : 'red',
      typeText: record.type === 'income' ? 'Income' : 'Outcome',
    })));

    this.loading = false;
  },
  components: { HistoryTable },
};
</script>
