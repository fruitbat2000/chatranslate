<template>
	<div class="chat-card">
    <img v-if="members[0].avatar" class="chat-card__image" :src="members[0].avatar" alt="">
    <i v-else class="material-icons no-avatar">person</i>
    <div class="chat-card__info">
      <h3><span v-for="member in members" :key="member.uid">{{member.displayName}}</span></h3>
      <p>{{ lastMessage }}</p>
    </div>
		<p v-if="!user">Cannot retrieve user info</p>
	</div>
</template>

<script>

	export default {
		name: 'chatCard',
		components: {

		},
		props: {
			uid: {
				required: true,
				type: String
			}
		},
		data() {
			return {
				db: this.$store.state.db,
				chatLoaded: false,
        chat: {},
        user: {},
        members: [],
        lastMessage: ''
			}
		},
		mounted() {
			console.log('chatCard mounted', this.uid);
			this.getChat();
		},
		methods: {
			getChat() {
				let chatDoc = this.db.collection('chats').doc(this.uid);

				chatDoc.get().then((doc) => {
					if (doc.exists) {
            this.chat = doc.data();
            this.lastMessage = this.chat.messages[0]
            this.filterUsers();
					} else {
						this.chat = null;
          }
          
					this.chatLoaded = true;
				});
      },
      filterUsers() {
        let currentUser = this.$store.state.user.uid;
        this.chat.members.forEach(member => {
          if (member.uid !== currentUser) {
            let memberDoc = this.db.collection('users').doc(member.uid)
            memberDoc.get()
              .then(doc => {
                this.members.push(doc.data());
              })
              .catch(err => {
                console.log(err)
              })
            console.log(this.members)
          }
        });
      }
		},
		filters: {
			prettyDate(timestamp) {
				let date = new Date(timestamp),
						day = date.getDate(),
						month = date.getMonth() +1,
						year = date.getFullYear();

				return day+'/'+month+'/'+year;
			}
		},
		watch: {
			
		}
	}
</script>
<style lang="scss">
	@import '../assets/sass/variables';
	@import '../assets/sass/mixins';

	.chat-card {
		align-items: center;
		background-color: $white;
		border-bottom-left-radius: 40px;
		border-bottom-right-radius: 3px;
		border-top-left-radius: 40px;
		border-top-right-radius: 3px;
		display: flex;
		height: 80px;

		.chat-card__image,
		.no-avatar {
			border-radius: 50%;
			height: 76px;
			margin-left: 2px;
			margin-top: 1px;
			width: 76px;
		}

		.chat-card__info {
			padding: 5px 5px 5px 20px;

			h3, p {
				margin: 0;
			}

			p {
				@include font-size(12);
			}
		}
	}
	
</style>