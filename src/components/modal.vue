<template>
	<div class="modal" :class="{'modal--open': $store.state.modalOpen}">
    <div class="modal__window layer-1">
      <button @click="closeModal" class="modal__close">
        <i class="material-icons">close</i>
      </button>
      {{ $store.state.modal.content }}
    </div>
    <div class="modal__overlay"></div>
  </div>
</template>

<script>

export default {
	name: 'modal',
	components: {},
	data() {
		return {}
	},
	methods: {
    closeModal() {
      this.$store.commit('closeModal')
    }
  },
	mounted() {},
	computed: {}
}
</script>
<style lang="scss">
@import '../assets/sass/variables';
@import '../assets/sass/mixins';

.modal {
  height: 100vh;
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100vw;

  &.modal--open {
    opacity: 1;
    pointer-events: all;
  }

  .modal__close {
    padding: 0;
    position: absolute;
    right: 5px;
    top: 5px;
  }

  .modal__window {
    background: $white;
    border-radius: 3px;
    box-sizing: border-box;
    left: 50%;
    padding: 20px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 40px);
  }

  .modal__overlay {
    background: rgba(0,0,0,0.5);
    height: 100%;
    width: 100%;
  }
}
</style>
