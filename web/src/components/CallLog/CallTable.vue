<template>
  <div>
    <md-table>
      <md-table-row>
        <md-table-head>Time</md-table-head>
        <md-table-head class="number-column-header">
          <span class="host-number-label">Host's Number</span>
          <span class="twilio-number-label">Twilio Number</span>
          <span class="receiver-number-label">Receiver's Number</span>
        </md-table-head>
        <md-table-head>Duration</md-table-head>
        <md-table-head>Cost</md-table-head>
        <md-table-head>Actions</md-table-head>
      </md-table-row>

      <md-table-row v-for="call in calls" :key="call.sid">
        <md-table-cell>{{ parseDate(call.startTime) }}</md-table-cell>
        <md-table-cell class="number-cell">
          <span class="__single_number">
            <span class="host-number-label __m-r-1">H: </span
            >{{ call.fromFormatted }}</span
          >
          <span class="__single_number">
            <span class="twilio-number-label __m-r-1">T: </span>
            {{ call.twilioNumberFormatted }}
          </span>
          <span class="__single_number">
            <span class="receiver-number-label __m-r-1">R: </span
            >{{ call.toFormatted }}</span
          >
        </md-table-cell>
        <md-table-cell>{{ call.duration }} seconds</md-table-cell>
        <md-table-cell>{{
          call.cost ? call.cost + ' ' + call.costUnit : 'Not Calculated'
        }}</md-table-cell>
        <md-table-cell>
          <md-button class="md-primary">call again</md-button>
        </md-table-cell>
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
import callsClient from '@/store/network/calls';
import PaginationControl from '@/components/Common/PaginationControl';
import moment from 'moment';

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
      const date = new moment(dateString);
      return date.format('DD MMM YYYY HH:mm:ss');
    }
  }
};
</script>

<style lang="scss" scoped>
.header-component {
  text-align: left;
}
.table-header {
  color: $__primary-colour;
}
.number-column-header {
  height: 110px;
  /deep/ .md-table-head-container {
    height: initial;
    display: flex;
    .md-table-head-label {
      height: 80px;
      display: flex;
      flex-direction: column;
    }
  }
}
/deep/ .md-table-cell-container {
  text-align: left;
}
.number-cell {
  /deep/.md-table-cell-container {
    display: flex;
    flex-direction: column;
  }
  .__single_number {
    display: flex;
  }
}
.host-number-label {
  color: $__primary-colour;
  font-weight: bolder;
}
.twilio-number-label {
  color: $__accent-colour;
  font-weight: bolder;
}
.receiver-number-label {
  color: $__secondary-text-colour;
  font-weight: bolder;
}
</style>
