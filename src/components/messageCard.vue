<template>
	<div class="message-card" :class="{'message-card--current-user': message.from.uid === $store.state.user.uid}">
    <p>{{ message.original }}</p>
    <span>{{ message.timestamp | prettyDay }}, {{ message.timestamp | prettyTime }}</span> 
	</div>
</template>

<script>

	export default {
		name: 'messageCard',
		components: {

		},
		props: {
			message: {
				required: true,
				type: Object
			}
		},
		data() {
			return {}
		},
		mounted() {
			console.log('messageCard mounted');
		},
		methods: {},
		filters: {
      prettyDay(timestamp) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        return days[new Date(timestamp).getDay()]
      },
			prettyTime(timestamp) {
				let time = new Date(timestamp),
						hour = time.getHours() > 9 ? time.getHours() : '0'+ time.getHours(),
						minutes = time.getMinutes() > 9 ? time.getMinutes() : '0'+ time.getMinutes();

				return hour + ':' + minutes;
			}
		},
		watch: {
			
		}
	}
</script>
<style lang="scss">
	@import '../assets/sass/variables';
	@import '../assets/sass/mixins';

	.message-card {
		background-color: $white;
    border-radius: 3px;
    margin-bottom: 10px;
    padding: 5px 10px;
    width: 70%;

    p {
      margin-top: 0;
    }

    span {
      @include font-size(12);
      display: block;
      text-align: right;
    }
  }
  
  .message-card--current-user {
    align-self: flex-end;
    background-color: $secondaryDark;
    color: $white;
  }
	
</style>