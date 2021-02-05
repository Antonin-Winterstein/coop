<template>
	<div class="row">
		<div class="column">
			{{ membre.fullname }}
			<a :href="'mailto:' + membre.email">{{ membre.email }}</a>
		</div>
		<div class="column">
			<router-link
				:to="{
					name: 'Membre',
					params: { membre_id: membre.id },
				}"
				class="button"
				title="Profil"
				>🕵️‍♂️</router-link
			>

			&nbsp;
			<button
				:disabled="membreConnecte"
				class="button button-outline"
				@click="effacerMembre(membre)"
				title="Effacer"
			>
				🗑
			</button>
		</div>
	</div>
</template>

<script>
export default {
	props: ["membre"],
	computed: {
		membreConnecte() {
			return this.$store.state.membre.id == this.membre.id;
		},
	},
	methods: {
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
		h3 {
			margin: 0;
		}
		border-bottom: 1px solid #ccc;
	}
	margin-bottom: 1em;
}
</style>
