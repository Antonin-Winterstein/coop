import Vue from "vue";
import Vuex from "vuex";

import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
	storage: window.localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		conversations: [],
		membres: [],
		membre: false,
		token: false,
	},
	mutations: {
		setConversations(state, conversations) {
			state.conversations = conversations;
		},
		setMembres(state, membres) {
			state.membres = membres;
		},
		setMembre(state, membre) {
			state.membre = membre;
		},
		setToken(state, token) {
			state.token = token;
		},
		seDeconnecter(state) {
			state.token = false;
			state.membre = false;
		},
	},
	getters: {
		getMembre(state) {
			let fonction = (membre_id) => {
				return state.membres.find((membre) => {
					return membre.id == membre_id;
				});
			};
			return fonction;
		},
	},

	actions: {},
	modules: {},
	plugins: [vuexLocal.plugin],
});
