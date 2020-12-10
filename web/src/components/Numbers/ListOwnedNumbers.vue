<template>
  <div>
    <md-card class="md-layout-item md-size-75 md-small-size-100">
      <md-card-header>
        <div class="md-title">Twilio Numbers You Own</div>
      </md-card-header>
      <md-card-content>
        <div class="owned-numbers-table">
          <md-table>
            <md-table-row>
              <md-table-head>Number</md-table-head>
              <md-table-head>SMS</md-table-head>
              <md-table-head>Voice</md-table-head>
              <md-table-head>MMS</md-table-head>
            </md-table-row>

            <md-table-row v-for="number in availableNumbers" :key="number.sid">
              <md-table-cell>{{ number.friendlyName }}</md-table-cell>
              <md-table-cell>
                <div class="__capability-cell">
                  <capability-cell
                    :in-enabled="number.smsEnabled.in"
                    :out-enabled="number.smsEnabled.out"
                  />
                </div>
              </md-table-cell>
              <md-table-cell>
                <div class="__capability-cell"></div>
                <capability-cell
                  :in-enabled="number.voiceEnabled.in"
                  :out-enabled="number.voiceEnabled.out"
                />
              </md-table-cell>
              <md-table-cell>
                <div class="__capability-cell"></div>
                <capability-cell
                  :in-enabled="number.mmsEnabled.in"
                  :out-enabled="number.mmsEnabled.out"
                />
              </md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { createNamespacedHelpers, mapState } from 'vuex';
import { NUMBER_ACTION_TYPES } from '@/store/numbers/interfaces';
import CapabilityCell from '@/components/Numbers/CapabilityCell';

const {
  mapState: numberMapState,
  mapActions: numberMapActions,
  mapMutations: numberMapMutation
} = createNamespacedHelpers('numbers');

export default {
  name: 'list-owned-numbers',
  components: { CapabilityCell },
  mounted() {
    this[NUMBER_ACTION_TYPES.FETCH_NUMBERS](this.auth);
  },
  computed: {
    ...numberMapState(['availableNumbers']),
    ...mapState(['auth'])
  },
  methods: {
    ...numberMapActions([NUMBER_ACTION_TYPES.FETCH_NUMBERS])
  }
};
</script>

<style scoped lang="scss">
/deep/ .md-table-cell-container {
  text-align: left;
}
</style>
