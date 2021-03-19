<template>
	<div class="row">
		<div class="column">
			<p style="margin-bottom: 0">{{ membre.fullname }}</p>
			<a :href="'mailto:' + membre.email">{{ membre.email }}</a>
		</div>
		<div class="column" style="text-align: right;">
			<router-link
				:to="{
					name: 'Membre',
					params: { membre_id: membre.id },
				}"
				class="button"
				title="Profil"
				>Voir le profil 🕵️‍♂️</router-link
			>

			&nbsp;
			<button
				:disabled="membreConnecte"
				class="button button-outline"
				@click="effacerMembre(membre)"
				title="Effacer"
			>
				Effacer le profil 🗑️
			</button>
		</div>
	</div>
</template>

<script>
export default {
	props: ["membre"],
	computed: {
		// Savoir qui est connecté pour pouvoir ne pas se supprimer soi-même
		membreConnecte() {
			return this.$store.state.membre.id == this.membre.id;
		},
	},
	methods: {
		// Supprimer un membre
		effacerMembre() {
			if (
				confirm(
					"Voulez vous vraiment supprimer le membre " +
						this.membre.fullname +
						" ?"
				)
			) {
				api
					.delete("members/" + this.membre.id)
					.then((response) => {
						this.$bus.$emit("charger-membres");
					})
					.catch((error) => {
						console.log(error.response.data);
					});
			}
		},
	},
};
</script>

<style scoped lang="scss">
.row {
	.column {
		border-bottom: 1px solid #ccc;
		padding-bottom: 10px;
	}
	margin-bottom: 1em;
}
</style>
