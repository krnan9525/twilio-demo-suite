<template>
  <md-card class="md-layout-item md-size-50 md-small-size-100">
    <md-card-header>
      <div class="md-title">
        Select a Twilio Number
      </div>
    </md-card-header>
    <md-card-content>
      <md-field>
        <label for="twilio-number">
          Select a Twilio to fetch its message histories
        </label>
        <md-select
          name="twilioNumber"
          id="twilio-number"
          @input="val => $emit('input', val)"
        >
          <md-option
            v-for="(number, key) in availableNumbers"
            :value="number.number"
            :key="key"
          >
            {{ number.friendlyName }}
          </md-option>
        </md-select>
      </md-field>
    </md-card-content>
  </md-card>
</template>

<script>
export default {
  name: 'sms-twilio-number-selection',
  props: {
    value: {},
    availableNumbers: {
      type: Array
    }
  }
};
</script>
