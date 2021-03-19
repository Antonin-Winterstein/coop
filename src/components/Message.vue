<template>
	<div class="message" v-if="m">
		<img class="avatar" v-if="!m.conversation" :src="avatar" />
		<section>
			<header>
				<div>
					<b
						><router-link
							:to="{
								name: 'Membre',
								params: { membre_id: membre.id },
							}"
							>{{ membre.fullname }}</router-link
						></b
					>
					| <time v-html="dateMessage"></time>
				</div>
				<div class="conversation" v-if="m.conversation">
					Message posté dans
					<b
						><router-link
							:to="{ name: 'Conversation', params: { id: m.conversation.id } }"
							>{{ m.conversation.topic }}</router-link
						></b
					>
				</div>
			</header>
			<form v-if="editer" @submit.prevent="editerMessage">
				<div class="row">
					<div class="column">
						<input
							@keyup.esc="editer = false"
							ref="editer"
							v-model="messageContent"
							required
							type="text"
							placeholder="Votre message"
						/>
					</div>
				</div>
				<div class="row">
					<div class="column envoyer">
						<button class="button">Enregistrer</button>&#32;
						<button
							type="button"
							@click="editer = false"
							class="button button-outline"
						>
							Annuler
						</button>
					</div>
				</div>
			</form>
			<div v-else>{{ m.message }}</div>
		</section>

		<!-- Afficher les boutons seulement si c'est nous qui avons envoyé ce message -->
		<div class="actions" v-if="m.member_id == this.$store.state.membre.id">
			<button class="button-clear" @click="activerEditer">
				✏️ Modifier mon message
			</button>
			<button class="button-clear" @click="supprimerMessage">
				🗑️ Supprimer mon message
			</button>
		</div>
	</div>
</template>

<script>
export default {
	props: ["message"],
	data() {
		return {
			m: false,
			editer: false,
			messageContent: "",
		};
	},
	mounted() {
		this.m = this.message;
	},
	methods: {
		// Activer la modification du message
		activerEditer() {
			this.editer = true;
			this.messageContent = this.m.message;
			setTimeout(() => this.$refs["editer"].focus(), 500);
		},
		// Modifier le message
		editerMessage() {
			api
				.put(`channels/${this.m.channel_id}/posts/${this.m.id}`, {
					message: this.messageContent,
				})
				.then((response) => {
					this.m = response.data;
					this.editer = false;
				});
		},
		// Supprimer le message
		supprimerMessage() {
			if (confirm("Voulez vous vraiment supprimer ce message ?")) {
				api
					.delete(`channels/${this.m.channel_id}/posts/${this.m.id}`)
					.then((response) => {
						this.m = false;
					});
			}
		},
	},
	computed: {
		// Création du hash de l'url pour avoir un avatar unique à chaque fois
		avatar() {
			return (
				"https://gravatar.com/avatar/" +
				md5(this.membre.email) +
				"?s=400&d=identicon&r=pg"
			);
		},
		membre() {
			return this.$store.getters.getMembre(this.m.member_id);
		},
		// Date de l'envoi du message et de sa modification si besoin
		dateMessage() {
			let options = {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			};
			let dateMessageCree = new Date(this.m.created_at);
			let dateMessage =
				"Envoyé le " +
				dateMessageCree.toLocaleDateString("fr-FR", options) +
				" à " +
				dateMessageCree.toLocaleTimeString();
			if (this.m.created_at != this.m.modified_at) {
				let dateMessageModifie = new Date(this.m.modified_at);
				dateMessage +=
					" | <small>Modifié le " +
					dateMessageModifie.toLocaleDateString("fr-FR", options) +
					" à " +
					dateMessageModifie.toLocaleTimeString() +
					"</small>";
			}
			return dateMessage;
		},
	},
};
</script>

<style lang="scss">
.message {
	display: flex;
	position: relative;
	background: #f0f0f0;
	color: gray;
	padding: 1em;
	margin: 1em 0;
	border-radius: 15px;

	section {
		flex: 1;
		overflow: hidden;
	}
	.actions {
		position: absolute;
		bottom: 0;
		right: 0;
		opacity: 0;
		transition: opacity 0.5s ease-in;
		button {
			padding: 0;
			margin: 0;
			margin-right: 1em;
		}
	}
	&:hover .actions {
		opacity: 1;
	}

	.avatar {
		width: 32px;
		height: 32px;
		margin-right: 1em;
	}
	header {
		font-size: 90%;
		border-bottom: 1px solid white;
		padding-bottom: 0.5em;
		margin-bottom: 0.5em;
		display: flex;
		div:not(.conversation) {
			flex: 1;
		}
	}
	div {
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>
