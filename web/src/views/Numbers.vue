<template>
  <div>
    <div>
      <span class="tab-title">Twilio Numbers</span>
      <buy-new-numbers />
      <list-owned-numbers />
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

<style scoped lang="scss"></style>
