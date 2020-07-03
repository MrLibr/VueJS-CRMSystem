<template>
  <div>
    <div class="page-title">
      <h3>My History Records</h3>
    </div>

    <div class="history-chart">
      <canvas
          id="outcome-chart"
          ref="canvas"
      ></canvas>
      <canvas
          id="income-chart"
          ref="canvas"
      ></canvas>
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
import { Pie, PolarArea } from 'vue-chartjs';
import HistoryTable from '../components/history/HistoryTable.vue';
import paginationMixin from '../mixins/pagination.mixin';

export default {
  name: 'History',
  extends: {
    Pie,
    PolarArea,
  },
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
  }),
  async mounted() {
    const categories = await this.$store.dispatch('fetchCategories');
    this.records = await this.$store.dispatch('fetchRecords');
    this.setup(categories);

    this.loading = false;
  },
  methods: {
    setup(categories) {
      this.setupPagination(this.records.map((record) => ({
        ...record,
        categoryName: categories.find((category) => record.categoryId === category.id).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Income' : 'Outcome',
      })));

      const chartOutcomeCharacters = {
        type: 'pie',
        data: {
          labels: categories.map((category) => category.title),
          datasets: [{
            label: 'Your Outcome by Category',
            data: categories.map((category) => this.records.reduce((total, record) => {
              if (record.categoryId === category.id && record.type === 'outcome') {
                // eslint-disable-next-line no-param-reassign
                total += Number(record.amount);
              }
              return total;
            }, 0)),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          }],
        },
        options: {
          title: {
            display: true,
            position: 'top',
            fontSize: 16,
            fontStyle: 'italic',
            text: 'Outcome Chart',
          },
        },
      };

      const chartIncomeCharacters = {
        type: 'polarArea',
        data: {
          labels: categories.map((category) => category.title),
          datasets: [{
            label: 'Your Income by Category',
            data: categories.map((category) => this.records.reduce((total, record) => {
              if (record.categoryId === category.id && record.type === 'income') {
                // eslint-disable-next-line no-param-reassign
                total += Number(record.amount);
              }
              return total;
            }, 0)),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          }],
        },
        options: {
          title: {
            display: true,
            position: 'top',
            fontSize: 16,
            fontStyle: 'italic',
            text: 'Income Chart',
          },
        },
      };

      const outcomeChartElement = document.getElementById('outcome-chart');
      const incomeChartElement = document.getElementById('income-chart');

      // eslint-disable-next-line no-undef,no-unused-vars
      const outcomeChart = new Chart(outcomeChartElement, chartOutcomeCharacters);
      // eslint-disable-next-line no-undef,no-unused-vars
      const incomeChart = new Chart(incomeChartElement, chartIncomeCharacters);
    },
  },
  components: { HistoryTable },
};
</script>
