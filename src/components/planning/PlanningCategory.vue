<template>
  <div>
    <div
        v-for="category of categories"
        :key="category.id"
        :value="category.id"
    >
      <p>
        <strong>{{category.title}}:</strong>
        {{category.spend | currencyFilter('USD')}} of {{category.limit | currencyFilter('USD')}}
      </p>
      <div class="progress" v-tooltipDirective="category.tooltipString">
        <div
            class="determinate"
            :class="[category.progressColor]"
            :style="{width: category.progressPercent + '%'}"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlanningCategory',
  props: ['categories'],
};
</script>
