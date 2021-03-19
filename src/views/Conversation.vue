<template>
	<div class="container" v-if="conversation">
		<div class="filAriane">
			<router-link to="/">Conversations</router-link> > {{ c.topic }}
		</div>
		<div class="actions">
			<button class="button button-clear" @click="editerConversation">
				<span style="font-size: 1.5em">✏️</span> Modifier la conversation
			</button>
			<button class="button button-clear" @click="effacerConversation">
				<span style="font-size: 1.5em">🗑️</span> Effacer la conversation
			</button>
			<button class="button button-clear" @click="chargerMessages">
				<span style="font-size: 1.5em">🔄</span> Recharger les messages
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
					placeholder="Quel est le sujet ? 🙃"
				/>
				<label>Tags</label>
				<input
					@keyup.esc="annulerEditer"
					v-model="c.label"
					required
					type="text"
					placeholder="Quels sont les labels ? 😮"
				/>
				<div class="boutonsModifierConversation">
					<button>Modifier la conversation</button>
					<button
						type="button"
						@click="annulerEditer"
						class="button button-clear"
					>
						Annuler
					</button>
				</div>
			</fieldset>
		</form>
		<template v-else>
			<h1>{{ c.topic }}</h1>
			<h3>Labels : {{ c.label }}</h3>
		</template>
		<div class="loading" v-if="messages === false">
			Chargement des messages, veuillez patienter... Un café en attendant ? ☕
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
			messages: false,
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
		// Effacer la conversation
		effacerConversation() {
			if (
				confirm(
					"Voulez-vous vraiment supprimer cette conversation ? Cette action est irréversible. 🤐"
				)
			) {
				api
					.delete("channels/" + this.c.id)
					.then((response) => {
						this.$bus.$emit("charger-conversations");
						this.$router.push("/");
					})
					.catch((error) => {
						console.log(error.response.data);
					});
			}
		},
		// Constructeur
		clonerConversation() {
			this.c.id = this.conversation.id;
			this.c.topic = this.conversation.topic;
			this.c.label = this.conversation.label;
		},
		// Modifier la conversation (topic et labels via le formulaire)
		modifierConversation() {
			api.put("channels/" + this.c.id, this.c).then((response) => {
				this.conversation = response.data;
				this.clonerConversation();
				this.editer = false;
				this.$bus.$emit("charger-conversations");
			});
		},
		// Annuler la modification de la conversation
		annulerEditer() {
			this.editer = false;
			this.clonerConversation();
		},
		// Activer le formulaire pour modifier la conversation
		editerConversation() {
			this.editer = true;
			this.clonerConversation();
		},
		// Recharger les messages
		chargerMessages(vider = false) {
			if (vider) {
				this.messages = false;
			}

			api.get("channels/" + this.c.id + "/posts").then((response) => {
				let messages = response.data.reverse();
				setTimeout(() => (this.messages = messages), 1000);
			});
		},
		// Envoyer un message dans la conversation
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
.boutonsModifierConversation {
	text-align: center;
}

.loading {
	text-align: center;
}
h3 {
	text-align: center;
}
.actions {
	text-align: right;
}
.modifierConversation {
	margin-left: 1em;
	margin-right: 1em;
}
.messages {
	padding-bottom: 3em;
	padding-left: 2rem;
	padding-right: 2rem;
}

form.posterMessage {
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
.filAriane {
	margin-left: 1em;
	margin-top: -0.5em;
}
</style>
