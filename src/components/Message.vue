<template>
	<div class="message">
		<header>
			<div class="message-header">
				<b>{{ membre.fullname }}</b> <time>le {{ dateMessage }}</time>
			</div>
			<div class="conversation" v-if="message.conversation">
				Message posté dans
				<b
					><router-link
						:to="{
							name: 'Conversation',
							params: { id: message.conversation.id },
						}"
						>{{ message.conversation.topic }}</router-link
					></b
				>
			</div>
		</header>
		<div>{{ message.message }}</div>
	</div>
</template>

<script>
export default {
	props: ["message"],
	computed: {
		membre() {
			return this.$store.getters.getMembre(this.message.member_id);
		},
		dateMessage() {
			let options = {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			};
			return new Date(this.message.created_at).toLocaleDateString(
				"fr-FR",
				options
			);
		},
	},
};
</script>

<style lang="scss">
.message {
	background: #f0f0f0;
	padding: 1em;
	margin: 1em 0;
	border-radius: 5px;
	color: #555;
	header {
		font-size: 90%;
		border-bottom: 1px solid white;
		padding-bottom: 0.5em;
		margin-bottom: 0.5em;
		display: flex;
		div:not(.conversation) {
			flex: 1;
		}
		time {
			font-size: 90%;
		}
	}
}
</style>
