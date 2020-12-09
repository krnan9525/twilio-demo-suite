<template>
  <div>
    <div class="video-container">
      <div id="local-media"></div>
      <div id="remote-medias"></div>
    </div>
    <div class="control-btn-container">
      <div v-if="!isConnected" class="__create-room">
        <div class="__row1">
          <md-field>
            <label for="username">Your display name</label>
            <md-input
              name="username"
              id="username"
              type="text"
              v-model="username"
            />
          </md-field>
        </div>
        <div class="__row2">
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
            {{ isOwner ? 'create a chat room' : 'join the chat room' }}
          </md-button>
        </div>
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
import Video from '@/store/network/video';
import { connect, createLocalVideoTrack } from 'twilio-video';
import { mapState } from 'vuex';

export default {
  name: 'video-chat-body',
  props: {
    intent: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      snackbarMessage: '',
      showSnackbar: false,
      isConnected: false,
      username: '',
      password: Math.floor(Math.random() * 1000008) + '',
      room: ''
    };
  },
  mounted() {
    if (!this.isOwner) {
      this.setParamVariables();
    }
    createLocalVideoTrack().then(track => {
      const localMediaContainer = document.getElementById('local-media');
      localMediaContainer.appendChild(track.attach());
    });
  },
  methods: {
    onCreateClicked() {
      if (this.isInfoValidated) {
        if (this.isOwner) {
          Video.getNewRoomClientToken({
            apiSecret: this.tokenAuth.apiSecret,
            apiKey: this.tokenAuth.apiKey,
            accountSid: this.auth.accountSid,
            password: this.password,
            name: this.name || undefined
          })
            .then(res => {
              this.createChatRoomOrConnect(res.token);
              this.$emit('passwordCreated', this.password);
            })
            .catch(() => {
              this.showSnackbar = true;
              this.snackbarMessage =
                'Cannot create a chat room now. Please try again later.';
            });
        } else {
          Video.getJoiningRoomClientToken({
            room: this.room,
            password: this.password,
            name: this.name || undefined
          })
            .then(res => {
              this.createChatRoomOrConnect(res.token);
            })
            .catch(() => {
              this.showSnackbar = true;
              this.snackbarMessage =
                'Cannot create a chat room now. Please try again later.';
            });
        }
      }
    },
    createChatRoomOrConnect(token) {
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
      this.$emit('connectedChanged', true);
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
    },
    setParamVariables() {
      this.password = this.$route.params.password;
      this.room = this.$route.params.roomId;
    }
  },
  computed: {
    ...mapState(['tokenAuth', 'auth']),
    isInfoValidated() {
      // TODO: add validation
      if (this.isOwner) {
        return (
          this.tokenAuth.apiSecret &&
          this.tokenAuth.apiKey &&
          this.auth.accountSid
        );
      }
      return this.password && this.room;
    },
    isOwner() {
      return this.intent === 'owner';
    }
  }
};
</script>

<style scoped lang="scss">
.control-btn-container {
  display: flex;
  justify-content: center;
  .__create-room {
    flex-direction: column;
    display: flex;
    max-width: 600px;
    width: 100%;
    .__create-btn {
      width: 250px;
    }
    .__row2 {
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
