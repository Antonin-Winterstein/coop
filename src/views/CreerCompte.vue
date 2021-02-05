<template>
	<div class="row">
		<div class="column column-50 column-offset-25">
			<h1>Créer un compte</h1>
			<form @submit.prevent="creerCompte">
				<fieldset>
					<label>Nom et prénom</label>
					<input v-model="fullname" type="text" placeholder="Nom" required />

					<label>Adresse mail</label>
					<input v-model="email" type="email" placeholder="Email" required />

					<label>Mot de passe</label>
					<input
						v-model="password"
						type="password"
						placeholder="Mot de passe"
						required
					/>
					<button class="button">Créer mon compte</button>
					<p><router-link to="se-connecter">Se connecter</router-link></p>
				</fieldset>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			fullname: "TEST " + Math.random(),
			email: "test" + Math.random() + "@test.fr",
			password: "test",
		};
	},
	methods: {
		creerCompte() {
			// api a été créé dans le index.js
			api
				.post("members", {
					fullname: this.fullname,
					email: this.email,
					password: this.password,
				})
				.then((response) => {
					alert("Votre compte a été créé, vous pouvez vous connecter à Coop !");
					this.$router.push("/se-connecter");
				})
				.catch((error) => {
					alert(error.response.data.message);
				});
		},
	},
};
</script>
