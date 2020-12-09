<template>
  <div>
    <div class="video-container">
      <div id="large-video">
        <div class="__video"></div>
        <div class="__caption md-caption">{{ pinnedParticipantName }}</div>
      </div>
      <div class="preview-videos">
        <div class="single-preview" id="own-video">
          <div class="__video" @click="onVideoSelected(null)"></div>
          <div class="__caption md-caption">me</div>
        </div>
        <div
          class="single-preview"
          v-for="participant in participants"
          :key="participant[0].participantSid"
          :id="'participant-videos-' + participant[0].participantSid"
        >
          <div class="__video" @click="onVideoSelected(participant)"></div>
          <div class="__caption md-caption">{{ participant[0].identity }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createLocalVideoTrack } from 'twilio-video';

export default {
  name: 'video-preview-and-display',
  data() {
    return {
      pinnedTrack: null,
      ownPreviewTrack: null,
      pinnedParticipantName: null
    };
  },
  props: {
    videoTracks: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    createLocalVideoTrack().then(track => {
      this.ownPreviewTrack = track;
      this.$el
        .querySelector('#own-video > .__video')
        .appendChild(track.attach());
      this.pinnedTrack = track;
      this.pinnedParticipantName = 'me';
    });
  },
  computed: {
    participants() {
      return this.videoTracks.reduce((previousValue, currentValue) => {
        if (previousValue[currentValue.participantSid]) {
          previousValue[currentValue.participantSid].push(currentValue);
        } else {
          previousValue[currentValue.participantSid] = [currentValue];
        }
        return previousValue;
      }, {});
    }
  },
  methods: {
    onVideoSelected(participantTracks) {
      let videoTrack = null;
      let pinnedParticipant = '';
      // selected own camera preview
      if (!participantTracks) {
        videoTrack = this.ownPreviewTrack;
        pinnedParticipant = 'me';
      } else {
        participantTracks.forEach(track => {
          const trackEle = track.track.attach();
          if (trackEle instanceof HTMLVideoElement) {
            videoTrack = track.track;
            pinnedParticipant = track.identity;
          }
        });
      }
      if (videoTrack) {
        this.pinnedTrack = videoTrack;
        this.pinnedParticipantName = pinnedParticipant;
      }
    }
  },
  watch: {
    pinnedTrack(newValue, oldValue) {
      const largeVideoContainer = this.$el.querySelector(
        '#large-video > .__video'
      );
      const elToReplace = this.$el.querySelector('#large-video > .__video')
        .childNodes[0];
      if (elToReplace) {
        largeVideoContainer.replaceChild(newValue.attach(), elToReplace);
      } else {
        largeVideoContainer.appendChild(newValue.attach());
      }
    },
    participants(newValue, oldValue) {
      Object.keys(newValue).forEach(participantKey => {
        const participantTracks = newValue[participantKey];
        this.$nextTick(() => {
          const participantVideosContainer = this.$el.querySelector(
            '#participant-videos-' +
              participantTracks[0].participantSid +
              ' > .__video'
          );
          if (participantTracks instanceof Array) {
            while (participantVideosContainer.firstChild) {
              participantVideosContainer.firstChild.remove();
            }
            participantTracks.forEach(track => {
              participantVideosContainer.appendChild(track.track.attach());
            });
          }
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.video-container {
  display: flex;
  width: 100%;
  flex-direction: column;
}
.preview-videos {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .single-preview {
    display: flex;
    flex-direction: column;
    margin: 0 10px;
    max-width: 25%;
    /deep/ .__video > video {
      height: calc(20vh - 15px);
    }
    .__caption {
      height: 15px;
      object-fit: cover;
    }
  }
}
</style>
