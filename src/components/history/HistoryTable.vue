<template>
  <table>
    <thead>
    <tr>
      <th>{{'Index' | localizeFilter}}</th>
      <th>{{'RecordSum' | localizeFilter}}</th>
      <th>{{'Date' | localizeFilter}}</th>
      <th>{{'RecordInCategory' | localizeFilter}}</th>
      <th>{{'Type' | localizeFilter}}</th>
      <th>{{'ButtonOpen' | localizeFilter}}</th>
    </tr>
    </thead>

    <tbody>
    <tr
        v-for="(record, index) of records"
        :key="record.id"
    >
      <td>{{index + 1}}</td>
      <td>{{record.amount | currencyFilter('USD')}}</td>
      <td>{{record.date | dateFilter('datetime')}}</td>
      <td>{{record.categoryName}}</td>
      <td>
        <span
            class="white-text badge"
            :class="record.typeClass"
        >{{record.typeText}}</span>
      </td>
      <td>
        <button
            class="btn-small btn"
            @click.prevent="$router.push(`/detail/${record.id}`)"
            v-tooltipDirective="record.messageOnButton"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: 'HistoryTable',
  props: {
    records: {
      required: true,
      type: Array,
    },
  },
};
</script>
