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
					&dash; <time v-html="dateMessage"></time>
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

		<div class="actions" v-if="m.member_id == this.$store.state.membre.id">
			<button class="button-clear" @click="activerEditer">Modifier</button>
			<button class="button-clear" @click="supprimerMessage">Supprimer</button>
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
		activerEditer() {
			this.editer = true;
			this.messageContent = this.m.message;
			setTimeout(() => this.$refs["editer"].focus(), 500);
		},
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
		dateMessage() {
			let options = {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			};
			let dc = new Date(this.m.created_at);
			let dateMessage =
				"Envoyé le " +
				dc.toLocaleDateString("fr-FR", options) +
				" à " +
				dc.toLocaleTimeString();
			if (this.m.created_at != this.m.modified_at) {
				let dm = new Date(this.m.modified_at);
				dateMessage +=
					" | <small>Modifié le " +
					dm.toLocaleDateString("fr-FR", options) +
					" à " +
					dm.toLocaleTimeString() +
					"</small>";
			}
			return dateMessage;
		},
	},
};
</script>

<style lang="scss">
.message {
	position: relative;
	display: flex;
	background: #f0f0f0;
	padding: 1em;
	margin: 1em 0;
	border-radius: 5px;
	color: #555;
	section {
		flex: 1;
	}
	.actions {
		position: absolute;
		bottom: 0;
		right: 0;
		opacity: 0;
		transition: opacity 0.5s ease;
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
		object-fit: cover;
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
		time {
			font-size: 90%;
		}
	}
	.contenu {
		// margin-bottom: 1em;
	}
}
</style>
