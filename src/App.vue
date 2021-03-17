<template>
	<div v-if="chargementOk">
		<div class="container">
			<template v-if="apiOk">
				<Header />
				<router-view />
			</template>
			<template v-else>
				<div class="container">
					<div class="row">
						<div class="column column-50 column-offset-25">
							<h1>Erreur</h1>
							<p style="text-align:center;">Impossible de joindre l'API 😭</p>
						</div>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
	components: {
		Header,
	},
	data() {
		return {
			chargementOk: false,
			apiOk: false,
		};
	},
	mounted() {
		console.log("L'app est démarrée ! 😊");

		api
			.get("ping")
			.then((reponse) => {
				this.apiOk = true;
				console.log("L'api est fonctionnelle ! 😍");

				this.chargerMembres();
				this.$bus.$on("charger-membres", this.chargerMembres);

				this.chargerConversations();
				this.$bus.$on("charger-conversations", this.chargerConversations);

				// Vérification ed la connexion
				if (!this.$store.state.membre) {
					if (
						this.$route.path != "/se-connecter" &&
						this.$route.path != "/creer-compte"
					) {
						this.$router.push("/se-connecter");
					}
				} else {
					api
						.get("members/" + this.$store.state.membre.id + "/signedin")
						.catch((error) => {
							this.$store.commit("seDeconnecter");
							this.$router.push("/se-connecter");
						});
				}
			})
			.catch((error) => {
				console.log("L'api ne marche pas ! 😭", error);
			})
			.finally(() => {
				this.chargementOk = true;
			});
	},
	methods: {
		chargerConversations() {
			api.get("channels").then((response) => {
				this.$store.commit("setConversations", response.data);
			});
		},
		chargerMembres() {
			api.get("members").then((response) => {
				this.$store.commit("setMembres", response.data);
			});
		},
	},
};
</script>

<style lang="scss">
.container {
	margin: 0 !important;
	padding: 0 !important;
	max-width: unset !important;
}
</style>
