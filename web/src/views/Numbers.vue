<template>
  <div>
    <div>
      <span class="tab-title">Twilio Numbers</span>
      <div class="card-views">
        <buy-new-numbers class="__card" />
        <list-owned-numbers class="__card" />
      </div>
    </div>
  </div>
</template>

<script>
import BuyNewNumbers from '@/components/Numbers/BuyNewNumbers';
import ListOwnedNumbers from '@/components/Numbers/ListOwnedNumbers';
export default {
  name: 'number-page',
  components: { ListOwnedNumbers, BuyNewNumbers }
};
</script>

<style scoped lang="scss">
.card-views {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .__card {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
