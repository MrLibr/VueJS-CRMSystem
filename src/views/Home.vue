<template>
  <div>
    <div class="page-title">
      <h3>{{'HomeBillsTitle' | localizeFilter}}</h3>

      <button
          class="btn waves-effect waves-light btn-small"
          @click.prevent="refresh"
          v-tooltipDirective="'ButtonRefresh'"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading"/>

    <div v-else class="row">
      <HomeBill
          :rates="currency.rates"
      />

      <HomeCurrency
          :rates="currency.rates"
          :date="currency.date"
      />
    </div>
  </div>
</template>

<script>
import HomeBill from '../components/home/HomeBill.vue';
import HomeCurrency from '../components/home/HomeCurrency.vue';

export default {
  name: 'Home',
  metaInfo() {
    return {
      title: this.$title('BillsNavMenu'),
    };
  },
  data: () => ({
    loading: true,
    currency: null,
  }),
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency');
    this.loading = false;
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    },
  },
  components: {
    HomeBill,
    HomeCurrency,
  },
};
</script>
