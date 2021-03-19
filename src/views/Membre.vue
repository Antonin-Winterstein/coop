<template>
	<div class="container" v-if="membre">
		<div class="filAriane">
			<router-link to="/membres">Membres</router-link> > {{ membre.fullname }}
		</div>

		<main>
			<section>
				<h1>{{ membre.fullname }}</h1>
				<img class="avatar" :src="avatar" />
				<h1>Informations sur l'utilisateur :</h1>
				<ul>
					<li>
						<b>Email : </b>
						<a :href="'mailto:' + membre.email">{{ membre.email }}</a>
					</li>
					<li>
						Membre inscrit depuis le <b>{{ membre.depuis }}</b>
					</li>
				</ul>
			</section>
		</main>

		<h2>Messages</h2>
		<div class="loading" v-if="loading">
			Chargement des messages, veuillez patienter... Un café en attendant ? ☕
		</div>

		<div class="messages" v-else>
			<template v-if="messagesTries.length">
				<template v-for="message in messagesTries">
					<Message :message="message" :key="message.id"></Message>
				</template>
			</template>
			<div v-else style="text-align: center;">
				<b><i>Aucun message n'a été posté par ce membre pour le moment.</i></b>
			</div>
		</div>
	</div>
</template>

<script>
import Message from "@/components/Message.vue";

export default {
	components: { Message },
	data() {
		return {
			membre: false,
			messages: [],
			loading: true,
		};
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
		// Trier les 10 derniers messages du plus récent au plus ancien
		messagesTries() {
			function compare(a, b) {
				if (a.created_at < b.created_at) {
					return -1;
				}
				if (a.created_at > b.created_at) {
					return 1;
				}
				return 0;
			}
			return this.messages.sort(compare).slice(0, 10);
		},
	},
	mounted() {
		if (this.$route.params.membre_id) {
			this.membre = this.$store.getters.getMembre(this.$route.params.membre_id);
			let options = {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			};
			this.membre.depuis = new Date(this.membre.created_at).toLocaleDateString(
				"fr-FR",
				options
			);

			let compter = [];
			// Boucle sur toutes les conversations qu'on trouve dans le store
			this.$store.state.conversations.forEach((conversation) => {
				api.get("channels/" + conversation.id + "/posts").then((response) => {
					// Boucle sur tous les messages de toutes les conversations
					response.data.forEach((message) => {
						if (message.member_id == this.membre.id) {
							message.conversation = conversation;
							this.messages.push(message);
						}
					});
					compter++;
					if (this.$store.state.conversations.length == compter) {
						setTimeout(() => (this.loading = false), 2000);
					}
				});
			});
		}
	},
};
</script>

<style lang="scss">
h2 {
	text-align: center;
}
.avatar {
	width: 100px;
	height: 100px;
	object-fit: cover;
	margin-left: auto;
	margin-right: auto;
	display: block;
}
.messages {
	padding-bottom: 3em;
	padding-left: 2rem;
	padding-right: 2rem;
}

.loading {
	text-align: center;
}

li {
	list-style: none;
	text-align: center;
}

.filAriane {
	margin-left: 1em;
	margin-top: -0.5em;
}
</style>
