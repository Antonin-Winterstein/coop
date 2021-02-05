<template>
	<div class="container" v-if="conversation">
		<h1>Sujet : {{ conversation.topic }}</h1>
		<h3>Labels : {{ conversation.label }}</h3>

		<div class="messages">
			<template v-for="message in messages">
				<Message :message="message"></Message>
			</template>
		</div>

		<div ref="bottom">
			<form @submit.prevent="posterMessage">
				<div class="row">
					<input
						v-model="message"
						required
						type="text"
						placeholder="Votre message"
					/>
					<button>Envoyer le message</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import Message from "@/components/Message.vue";
export default {
	components: { Message },
	data() {
		return {
			conversation: false,
			message: "",
			messages: [],
		};
	},
	mounted() {
		if (this.$route.params.id) {
			api.get("channels/" + this.$route.params.id).then((response) => {
				this.conversation = response.data;
				this.chargerMessages();
			});
		}
	},
	methods: {
		chargerMessages() {
			api
				.get("channels/" + this.conversation.id + "/posts")
				.then((response) => {
					let messages = response.data.reverse();
					this.messages = messages;
				});
		},
		posterMessage() {
			api
				.post("channels/" + this.conversation.id + "/posts", {
					message: this.message,
				})
				.then((response) => {
					setTimeout(() => {
						this.$refs["bottom"].scrollIntoView();
					}, 500);
					this.chargerMessages();
					this.message = "";
				});
		},
	},
};
</script>

<style scoped lang="scss">
.messages {
	padding-bottom: 3em;
}
form {
	background: white;
	position: fixed;
	bottom: 0;
	left: 1em;
	width: 98%;
	margin: 0;

	input {
		width: 100%;
		margin-right: 1%;
	}

	.envoyer {
		width: 100%;
	}
}

.contenu {
	padding: 0 2rem !important;
}
</style>
