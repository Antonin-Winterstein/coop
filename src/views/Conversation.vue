<template>
	<div class="container" v-if="conversation">
		<div class="actions">
			<button class="button button-clear" @click="editerConversation">
				Modifier
			</button>
			<button class="button button-clear" @click="chargerMessages">
				<big>⟳</big> Recharger les messages !
			</button>
		</div>

		<form
			class="modifierConversation"
			v-if="editer"
			@submit.prevent="modifierConversation"
		>
			<br />
			<fieldset>
				<label>Sujet</label>
				<input
					ref="topic"
					@keyup.esc="annulerEditer"
					v-model="c.topic"
					required
					type="text"
					placeholder="De quoi voulez vous discuter ?"
				/>
				<label>Tags</label>
				<input
					@keyup.esc="annulerEditer"
					v-model="c.label"
					required
					type="text"
					placeholder="Quels sont les concepts abordés ?"
				/>
				<button>Modifier la conversation</button>
				<button
					type="button"
					@click="annulerEditer"
					class="button button-clear"
				>
					Annuler
				</button>
			</fieldset>
		</form>
		<template v-else>
			<h1>{{ c.topic }}</h1>
			<h3>Labels : {{ c.label }}</h3>
		</template>
		<div class="loading" v-if="messages === false">
			Chargement des messages...
		</div>
		<div v-else class="messages">
			<template v-for="message in messages">
				<Message :message="message"></Message>
			</template>
		</div>
		<div ref="bottom">
			<form class="posterMessage" @submit.prevent="posterMessage">
				<div class="row">
					<div class="column">
						<input
							v-model="message"
							required
							type="text"
							placeholder="Votre message"
						/>
					</div>
					<div class="envoyer">
						<button>Envoyer</button>
					</div>
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
			editer: false,
			c: { topic: "", label: "" },
			conversation: false,
			message: "",
			messages: [],
		};
	},
	mounted() {
		if (this.$route.params.id) {
			api.get("channels/" + this.$route.params.id).then((response) => {
				this.conversation = response.data;
				this.clonerConversation();
				this.chargerMessages();
			});
		}
	},
	methods: {
		clonerConversation() {
			this.c.id = this.conversation.id;
			this.c.topic = this.conversation.topic;
			this.c.label = this.conversation.label;
		},
		modifierConversation() {
			api.put("channels/" + this.c.id, this.c).then((response) => {
				this.conversation = response.data;
				this.clonerConversation();
				this.editer = false;
				this.$bus.$emit("charger-conversations");
			});
		},
		annulerEditer() {
			this.editer = false;
			this.clonerConversation();
		},
		editerConversation() {
			this.editer = true;
			this.clonerConversation();
			setTimeout(() => this.$refs["topic"].focus(), 500);
		},
		chargerMessages() {
			this.messages = false;
			api.get("channels/" + this.c.id + "/posts").then((response) => {
				let messages = response.data.reverse();
				setTimeout(() => (this.messages = messages), 1000);
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
.loading {
	text-align: center;
}
h3 {
	text-align: center;
}
.actions {
	position: absolute;
	right: 0;
	top: 0;
}
.modifierConversation {
	margin-top: 5vh;
	margin-left: 1em;
	margin-right: 1em;
}
.messages {
	padding-bottom: 3em;
	padding-left: 2rem;
	padding-right: 2rem;
}
form.posterMessage {
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
		margin-right: 1rem;
	}
}
</style>
