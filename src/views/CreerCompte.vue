<template>
	<div class="row">
		<div class="column column-50 column-offset-25">
			<h1>Créer un compte</h1>
			<form @submit.prevent="creerCompte">
				<fieldset>
					<label>Nom et prénom</label>
					<input
						v-model="fullname"
						type="text"
						placeholder="Entrez votre nom et prénom"
						required
					/>

					<label>Adresse mail</label>
					<input
						v-model="email"
						type="email"
						placeholder="Entrez votre adresse mail"
						required
					/>

					<label>Mot de passe</label>
					<input
						v-model="password"
						type="password"
						placeholder="Entrez votre mot de passe"
						required
					/>

					<label>Vérification du mot de passe</label>
					<input
						v-model="passwordCheck"
						type="password"
						placeholder="Entrez à nouveau votre mot de passe pour vérification"
						required
					/>

					<button class="button boutonCreerCompte">Créer mon compte</button>
					<router-link to="se-connecter"
						>Déjà un compte ? Se connecter !</router-link
					>
				</fieldset>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			fullname: "",
			email: "",
			password: "",
			passwordCheck: "",
		};
	},
	methods: {
		// Création du compte
		creerCompte() {
			if (this.password != this.passwordCheck) {
				alert(
					"Les deux mots de passes doivent être identiques ! Veuillez réessayer s'il vous plaît. 😅"
				);
			} else {
				// api a été créé dans le index.js
				api
					.post("members", {
						fullname: this.fullname,
						email: this.email,
						password: this.password,
					})
					.then((response) => {
						alert(
							"Votre compte a bien été créé, vous pouvez vous connecter à Coop ! 😎"
						);
						this.$router.push({
							path: "/se-connecter",
							query: { email: this.email },
						});
					})
					.catch((error) => {
						alert(error.response.data.message);
					});
			}
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
