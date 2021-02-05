<template>
	<div>
		<div class="container contenu">
			<h1>Liste des conversations</h1>
			<CreerConversation />

			<div class="conversations">
				<template v-for="conversation in $store.state.conversations">
					<Conversation :conversation="conversation" />
				</template>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import CreerConversation from "@/components/CreerConversation.vue";
import Conversation from "@/components/Conversation.vue";

export default {
	components: {
		CreerConversation,
		Conversation,
	},
};
</script>

<style lang="scss">
h1 {
	text-align: center;
	margin-top: 30px !important;
}

.conversations {
	margin-top: 2em;
}

.contenu {
	padding: 0 2rem !important;
}
</style>
