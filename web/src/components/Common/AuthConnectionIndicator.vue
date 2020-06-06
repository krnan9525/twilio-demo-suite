<template>
  <div class="container">
    <div class="icon-container">
      <md-icon id="link-icon">link</md-icon>
      <span>Connected</span>
    </div>
    <md-button class="md-raised md-accent" id="logout-btn">Log Out</md-button>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 200px;
  height: 50px;
  background: rgba($__primary-colour-light, 0.2);
  padding: 2px;
  display: flex;
  align-content: center;
  flex-direction: row;
  justify-content: space-around;
}
.icon-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 10px;
}

#link-icon {
  color: white;
}

#logout-btn {
  color: white;
}
</style>

<script>
export default {
  name: 'auth-connection-indicator'
};
</script>
