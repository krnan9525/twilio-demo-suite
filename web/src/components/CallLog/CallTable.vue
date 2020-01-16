<template>
  <div>
    <div class="header-component">
      <span class="table-header md-title">Your call logs</span>
    </div>
    <md-table>
      <md-table-row>
        <md-table-head>Time</md-table-head>
        <md-table-head>Host's Number</md-table-head>
        <md-table-head>Twilio Number</md-table-head>
        <md-table-head>Receiver's Number</md-table-head>
        <md-table-head md-numeric>Duration (seconds)</md-table-head>
        <md-table-head>Cost</md-table-head>
        <md-table-head>Actions</md-table-head>
      </md-table-row>

      <md-table-row v-for="call in calls" :key="call.sid">
        <md-table-cell>{{ parseDate(call.startTime) }}</md-table-cell>
        <md-table-cell>{{ call.fromFormatted }}</md-table-cell>
        <md-table-cell>{{ call.twilioNumberFormatted }}</md-table-cell>
        <md-table-cell>{{ call.toFormatted }}</md-table-cell>
        <md-table-cell>{{ call.duration }}</md-table-cell>
        <md-table-cell>{{
          call.cost ? call.cost + ' ' + call.costUnit : 'Not Calculated'
        }}</md-table-cell>
        <md-table-cell>button here</md-table-cell>
      </md-table-row>
    </md-table>
    <PaginationControl
      @page-changed="fetchCallLogs"
      :next-page-token="nextPageToken"
      :previous-page-token="previousPageToken"
    />
  </div>
</template>

<script>
import callsClient from '@/util/network/calls';
import PaginationControl from '@/components/Common/PaginationControl';

export default {
  name: 'call-table',
  components: { PaginationControl },
  data() {
    return {
      accountSid: '',
      accessToken: '',
      calls: [],
      previousPageToken: null,
      nextPageToken: null
    };
  },
  mounted() {
    const accountSid = localStorage.getItem('accountSid');
    const accessToken = localStorage.getItem('accessToken');
    if (accountSid && accessToken) {
      this.accountSid = accountSid;
      this.accessToken = accessToken;
      this.fetchCallLogs();
    }
  },
  methods: {
    fetchCallLogs(pageToken = undefined) {
      callsClient
        .getCallLog({
          accountSid: this.accountSid,
          accessToken: this.accessToken,
          pageToken
        })
        .then(res => {
          this.calls = res.calls;
          this.previousPageToken = res.previousPageToken;
          this.nextPageToken = res.nextPageToken;
        });
    },
    parseDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'medium'
      });
    }
  }
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
