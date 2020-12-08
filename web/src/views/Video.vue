<template>
  <div>
    <div class="status-bar">
      <video-status-header :connected="isConnected" />
    </div>
    <div class="video-container">
      <div id="local-media"></div>
      <div id="remote-medias"></div>
    </div>
    <div class="control-btn-container">
      <div v-if="!isConnected" class="__create-room">
        <md-field>
          <label for="password">Password for this chat room (optional)</label>
          <md-input
            name="password"
            id="password"
            type="text"
            v-model="password"
          />
        </md-field>
        <md-button
          class="md-primary __create-btn md-raised"
          @click="onCreateClicked()"
        >
          create chat room
        </md-button>
      </div>
    </div>
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
import Video from '@/store/network/video';
import { connect, createLocalVideoTrack } from 'twilio-video';
import VideoStatusHeader from '@/components/Video/VideoStatusHeader';

export default {
  name: 'video-tab',
  components: { VideoStatusHeader },
  data() {
    return {
      snackbarMessage: '',
      showSnackbar: false,
      isConnected: false,
      password: Math.floor(Math.random() * 1000008)
    };
  },
  mounted() {
    createLocalVideoTrack().then(track => {
      const localMediaContainer = document.getElementById('local-media');
      localMediaContainer.appendChild(track.attach());
    });
  },
  computed: {
    ...mapState(['tokenAuth', 'auth']),
    isInfoValidated() {
      // TODO: add validation
      return (
        this.tokenAuth.apiSecret &&
        this.tokenAuth.apiKey &&
        this.auth.accountSid
      );
    }
  },
  methods: {
    onCreateClicked() {
      if (this.isInfoValidated) {
        Video.getNewRoomClientToken({
          apiSecret: this.tokenAuth.apiSecret,
          apiKey: this.tokenAuth.apiKey,
          accountSid: this.auth.accountSid,
          password: this.password
        })
          .then(res => {
            this.createChatRoomAndConnect(res.token);
          })
          .catch(() => {
            this.showSnackbar = true;
            this.snackbarMessage =
              'Cannot create a chat room now. Please try again later.';
          });
      }
    },
    createChatRoomAndConnect(token) {
      connect(token, {
        audio: true,
        video: { width: 640 }
      }).then(
        room => {
          this.initVideoAfterJoining(room);
          this.setupListener(room);
        },
        error => {
          this.showSnackbar = true;
          this.snackbarMessage = `Unable to connect to Room: ${error.message}`;
        }
      );
    },
    initVideoAfterJoining(room) {
      this.isConnected = true;
      this.showSnackbar = true;
      this.snackbarMessage = `Successfully joined a Room: ${room}`;
      room.participants.forEach(participant => {
        participant.tracks.forEach(publication => {
          setTimeout(() => {
            if (publication.isSubscribed) {
              const track = publication.track;
              document
                .getElementById('remote-medias')
                .appendChild(track.attach());
            }
          }, 250);
        });
      });
    },
    setupListener(room) {
      room.on('participantConnected', participant => {
        this.showSnackbar = true;
        this.snackbarMessage = `Participant "${participant.identity}" connected`;
        participant.tracks.forEach(publication => {
          setTimeout(() => {
            if (publication.isSubscribed) {
              const track = publication.track;
              document
                .getElementById('remote-medias')
                .appendChild(track.attach());
            }
          }, 250);
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.status-bar {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.control-btn-container {
  display: flex;
  justify-content: center;
  .__create-room {
    display: flex;
    max-width: 600px;
    .__create-btn {
      width: 250px;
    }
  }
}
</style>
