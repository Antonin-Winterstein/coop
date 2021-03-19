<template>
	<div>
		<div id="creer-conversation" v-if="afficher">
			<section>
				<button class="close" @click="masquerFormulaire">x</button>
				<h3>Créer une conversation</h3>

				<form @submit.prevent="creerConversation">
					<fieldset>
						<label>Sujet</label>
						<input
							v-model="topic"
							required
							type="text"
							placeholder="Quel est le sujet ? 🙃"
						/>

						<label>Tags</label>
						<input
							v-model="label"
							required
							type="text"
							placeholder="Quels sont les labels ? 😮"
						/>

						<button>Créer la conversation</button>
						<button
							type="button"
							@click="masquerFormulaire"
							class="button button-clear"
						></button>
					</fieldset>
				</form>
			</section>
		</div>
		<button @click="afficherFormulaire">Créer une nouvelle conversation</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			afficher: false,
			topic: "",
			label: "",
		};
	},
	mounted() {
		this.$bus.$on("afficher-creer-conversation", this.afficherFormulaire);
	},
	methods: {
		creerConversation() {
			api
				.post("channels", {
					label: this.label,
					topic: this.topic,
				})
				.then((response) => {
					this.masquerFormulaire();
					this.$bus.$emit("charger-conversations");
				});
		},
		afficherFormulaire() {
			this.topic = "";
			this.label = "";
			this.afficher = true;
		},
		masquerFormulaire() {
			this.afficher = false;
		},
	},
};
</script>

<style lang="scss">
#creer-conversation {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	& > section {
		.close {
			position: absolute;
			top: 0;
			right: 0;
			width: 3em;
			height: 3em;
			margin: 0;
			padding: 0;
			border-radius: 50%;
			line-height: 10%;
		}
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: white;
		padding: 1em;
		border-radius: 1em;
	}
}
</style>
