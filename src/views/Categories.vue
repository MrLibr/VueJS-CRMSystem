<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoriesCreate @created="addNewCategory"/>

        <CategoriesEdit/>
      </div>
    </section>
  </div>
</template>

<script>
import CategoriesCreate from '../components/categories/CategoriesCreate.vue';
import CategoriesEdit from '../components/categories/CategoriesEdit.vue';

export default {
  name: 'Categories',
  data: () => ({
    categories: [],
  }),
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
      console.log(this.categories);
    },
  },
  components: {
    CategoriesEdit,
    CategoriesCreate,
  },
};
</script>
