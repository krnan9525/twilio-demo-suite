<template>
  <div class="video">
    <div class="video-container"></div>
    <md-snackbar
      md-position="center"
      :md-duration="2500"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{ snackbarMessage }}</span>
      <md-button class="md-primary" @click="showSnackbar = false">
        Close
      </md-button>
    </md-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { connect } from 'twilio-video';

export default {
  name: 'video-tab',
  components: {},
  mounted() {
    connect(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzQ0YjMwYjA3MGFjMzViNTBlMjE4OTc5YzdlZDVkZDdhLTE2MDc0Mjg1MDMiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJ0d2lsaW8tZGVtby1zdWl0ZS1jbGllbnQiLCJ2aWRlbyI6eyJyb29tIjoidHdpbGlvLWRlbW8tc3VpdGUtcm9vbS0xNjA3NDI4NTAzIn19LCJpYXQiOjE2MDc0Mjg1MDMsImV4cCI6MTYwNzQzMjEwMywiaXNzIjoiU0s0NGIzMGIwNzBhYzM1YjUwZTIxODk3OWM3ZWQ1ZGQ3YSIsInN1YiI6IkFDNDJjNTYwYmIzODI3MWU5MTViMWJhMjk2MTk0ZjBjNmYifQ.tYHCsnlXZxzc2S7ZaYI8TadFIuQXn4oxVJSd99JzrKI',
      {
        audio: true,
        video: { width: 640 }
      }
    ).then(
      room => {
        console.log(`Successfully joined a Room: ${room}`);
        room.on('participantConnected', participant => {
          console.log(`A remote Participant connected: ${participant}`);
        });
      },
      error => {
        console.error(`Unable to connect to Room: ${error.message}`);
      }
    );
  },
  computed: {
    ...mapState(['auth'])
  },
  data() {
    return {
      snackbarMessage: '',
      showSnackbar: false
    };
  }
};
</script>
