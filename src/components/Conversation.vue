<template>
	<div class="row">
		<div class="column">
			<h3>{{ conversation.topic }}</h3>
			{{ conversation.label }}
		</div>
		<div class="column column-25 actions">
			<router-link
				:to="{ name: 'Conversation', params: { id: conversation.id } }"
				class="button"
				>👁️</router-link
			>
		</div>
	</div>
</template>
<script>
export default {
	props: ["conversation"],
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
