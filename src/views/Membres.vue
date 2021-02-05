<template>
	<div class="container contenu">
		<h1>Liste des membres</h1>
		<template v-for="membre in $store.state.membres">
			<Membre :membre="membre" />
		</template>
	</div>
</template>

<script>
import Membre from "@/components/Membre.vue";

export default {
	components: {
		Membre,
	},
};
</script>

<style lang="scss">
h1 {
	text-align: center;
	margin-top: 30px !important;
}
.contenu {
	padding: 0 2rem !important;
}
</style>
