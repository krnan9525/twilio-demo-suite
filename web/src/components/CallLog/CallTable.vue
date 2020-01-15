<template>
  <div>
    <div class="header-component">
      <span class="table-header md-title">Your call logs</span>
    </div>
    <md-table>
      <!--<md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Email</md-table-head>
        <md-table-head>Gender</md-table-head>
        <md-table-head>Job Title</md-table-head>
      </md-table-row>

      <md-table-row>
        <md-table-cell md-numeric>1</md-table-cell>
        <md-table-cell>Shawna Dubbin</md-table-cell>
        <md-table-cell>sdubbin0@geocities.com</md-table-cell>
        <md-table-cell>Male</md-table-cell>
        <md-table-cell>Assistant Media Planner</md-table-cell>
      </md-table-row>-->
    </md-table>
  </div>
</template>

<script>
export default {
  name: 'call-table'
};
</script>

<style lang="scss" scoped>
.header-component {
  text-align: left;
}
.table-header {
  color: $primary-colour;
}
</style>
