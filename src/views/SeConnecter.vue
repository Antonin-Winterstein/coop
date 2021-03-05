<template>
	<div class="row">
		<div class="column column-50 column-offset-25">
			<h1>Se connecter</h1>
			<form @submit.prevent="seConnecter">
				<fieldset>
					<label>Adresse mail</label>
					<input v-model="email" type="email" placeholder="Email" required />

					<label>Mot de passe</label>
					<input
						v-model="password"
						type="password"
						placeholder="Mot de passe"
						required
					/>
					<button>Se connecter</button>
					<p><router-link to="/creer-compte">Créer un compte</router-link></p>
				</fieldset>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			email: "test@test.fr",
			password: "test",
		};
	},
	methods: {
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
