<template>
	<div class="row">
		<div class="column column-50 column-offset-25">
			<h1>Se connecter</h1>
			<form @submit.prevent="seConnecter">
				<fieldset>
					<label>Adresse mail</label>
					<input
						v-model="email"
						type="email"
						placeholder="Votre adresse mail"
						required
					/>

					<label>Mot de passe</label>
					<input
						v-model="password"
						type="password"
						placeholder="Votre mot de passe"
						required
					/>
					<button class="button boutonCreerCompte">Se connecter</button>
					<router-link to="/creer-compte">Créer un compte</router-link>
				</fieldset>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			email: "",
			password: "",
		};
	},
	mounted() {
		if (this.$route.query.email) {
			this.email = this.$route.query.email;
		}
	},
	methods: {
		// Se connecter à l'application grâce au token
		seConnecter() {
			api
				.post("members/signin", {
					email: this.email,
					password: this.password,
				})
				.then((response) => {
					this.$store.commit("setMembre", response.data.member);
					this.$store.commit("setToken", response.data.token);
					this.$bus.$emit("charger-conversations");
					this.$router.push("/");
				})
				.catch((error) => {
					alert(error.response.data.message);
				});
		},
	},
};
</script>

<style lang="scss">
.boutonCreerCompte {
	display: block;
	margin-left: auto;
	margin-right: auto;

	~ a {
		display: block;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
	}
}
</style>
