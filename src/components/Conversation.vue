<template>
	<div class="row">
		<div class="column">
			<h3>{{ conversation.topic }}</h3>
			<p>{{ conversation.label }}</p>
		</div>
		<div class="column actions">
			<router-link
				:to="{ name: 'Conversation', params: { id: conversation.id } }"
				class="button"
				>👁️ Voir la conversation</router-link
			>
			<button class="button button-clear" @click="effacerConversation">
				<span style="font-size: 1.5em">🗑️</span> Effacer la conversation
			</button>
		</div>
	</div>
</template>
<script>
export default {
	props: ["conversation"],
	methods: {
		// Effacer la conversation
		effacerConversation() {
			if (
				confirm(
					"Voulez-vous vraiment supprimer cette conversation ? Cette action est irréversible. 🤐"
				)
			) {
				api
					.delete("channels/" + this.conversation.id)
					.then((response) => {
						this.$bus.$emit("charger-conversations");
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
			display: inline-block;
		}
		padding-bottom: 1em;
		border-bottom: 1px solid #ccc;
	}
	margin-bottom: 1em;
	.actions {
		text-align: right;
	}
}
</style>
