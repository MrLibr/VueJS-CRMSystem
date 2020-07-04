<template>
  <div>
    <div class="page-title">
      <h3>{{'CategoriesTitle' | localizeFilter}}</h3>
    </div>
    <section>
      <Loader v-if="loading"/>

      <div class="row" v-else>
        <CategoriesCreate @created="addNewCategory"/>

        <CategoriesEdit
            v-if="categories.length"
            :categories="categories"
            :key="categories.length + updateCount"
            @updated="updateCategories"
        />
        <p class="center" v-else>
          {{'CategoriesWarning' | localizeFilter}}
          <router-link to="/categories">{{'CategoriesTitle' | localizeFilter}}</router-link>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoriesCreate from '../components/categories/CategoriesCreate.vue';
import CategoriesEdit from '../components/categories/CategoriesEdit.vue';

export default {
  name: 'Categories',
  metaInfo() {
    return {
      title: this.$title('CategoriesNavMenu'),
    };
  },
  data: () => ({
    categories: [],
    updateCount: 0,
    loading: true,
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategories(category) {
      const index = this.categories.findIndex((categoryArray) => categoryArray.id === category.id);
      this.categories[index].title = category.title;
      this.categories[index].limit = category.limit;
      this.updateCount += 1;
    },
  },
  components: {
    CategoriesEdit,
    CategoriesCreate,
  },
};
</script>
