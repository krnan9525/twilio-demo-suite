<template>
  <div>
    <video-preview-and-display :video-tracks="participantTracks" />
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
            {{ isOwner ? 'create' : 'join' }}
          </md-button>
        </div>
      </div>
      <div v-else class="__hang-up">
        <md-button
          class="md-primary __hang-up-btn md-raised"
          @click="onHangUpClicked()"
        >
          Hang Up
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
import Video from '@/store/network/video';
import { connect } from 'twilio-video';
import { mapState } from 'vuex';
import VideoPreviewAndDisplay from '@/components/Video/VideoPreviewAndDisplay';

const composePublicationEle = (publication, participant) => {
  return {
    track: publication.track,
    identity: participant.identity,
    participantSid: participant.sid,
    id: publication.trackSid
  };
};

export default {
  name: 'video-chat-body',
  components: { VideoPreviewAndDisplay },
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
      room: '',
      participantTracks: [],
      activeRoom: null
    };
  },
  mounted() {
    if (!this.isOwner) {
      this.setParamVariables();
    }
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
            name: this.username || undefined
          })
            .then(res => {
              this.createChatRoomOrConnect(res.token);
              this.room = res.room;
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
            name: this.username || undefined
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
          this.activeRoom = room;
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
      this.$emit('passwordCreated', this.password);
      this.$emit('roomCreated', this.room);
      this.isConnected = true;
      this.showSnackbar = true;
      this.snackbarMessage = `Successfully joined a Room: ${room}`;
      room.participants.forEach(participant => {
        participant.tracks.forEach(publication => {
          setTimeout(() => {
            if (publication.isSubscribed) {
              this.participantTracks.push(
                composePublicationEle(publication, participant)
              );
            }
          }, 1500);
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
              this.participantTracks.push(
                composePublicationEle(publication, participant)
              );
            }
          }, 250);
        });
      });
      room.on('participantDisconnected', participant => {
        this.showSnackbar = true;
        this.snackbarMessage = `Participant "${participant.identity}" has disconnected from the Room`;
        this.participantTracks = this.participantTracks.filter(
          p => p.participantSid !== participant.sid
        );
      });
      room.on('disconnected', room => {
        room.localParticipant.tracks.forEach(publication => {
          const attachedElements = publication.track.detach();
          attachedElements.forEach(element => element.remove());
        });
        this.participantTracks = [];
      });
    },
    setParamVariables() {
      this.password = this.$route.query.password;
      this.room = this.$route.params.roomId;
    },
    onHangUpClicked() {
      if (this.activeRoom) {
        this.activeRoom.disconnect();
        this.showSnackbar = true;
        this.snackbarMessage = `Call has ended.`;
        this.isConnected = false;
        this.$emit('connectedChanged', false);
        this.$emit('passwordCreated', '');
        this.$emit('roomCreated', '');
      }
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
