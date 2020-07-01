<template>
  <div>
    <div class="page-title">
      <h3>Planning Your Money</h3>
      <h4>{{info.bill | currencyFilter('USD')}}</h4>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">
      You don't have no once categories.
      Please, create categories on <router-link to="/categories">Categories</router-link>
    </p>

    <section v-else>
      <PlanningCategory :categories="categories"/>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import currencyFilter from '../filters/currency.filter';
import PlanningCategory from '../components/planning/PlanningCategory.vue';

export default {
  name: 'Planning',
  components: { PlanningCategory },
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(['info']),
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');

    this.categories = categories.map((category) => {
      const spend = records
        .filter((record) => record.categoryId === category.id)
        .filter((record) => record.type === 'outcome')
        .reduce((total, currentRecord) => total + currentRecord.amount, 0);

      const percent = (spend * 100) / category.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      // eslint-disable-next-line no-nested-ternary
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red';

      const tooltipValue = category.limit - spend;
      const tooltipString = `${tooltipValue < 0 ? 'You Out of Limit: ' : 'You Have: '} ${currencyFilter(Math.abs(tooltipValue))}`;

      return {
        ...category,
        spend,
        progressPercent,
        progressColor,
        tooltipString,
      };
    });

    this.loading = false;
  },
};
</script>
