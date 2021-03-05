import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import md5 from "crypto-js/md5";

import milligram from "milligram";

window.md5 = md5;
window.api = axios.create({
	baseURL: "https://tools.sopress.net/iut/coop/api/",
	headers: { Authorization: "eac043db4c850c78b989d79e44f5d3e98c677ba9" },
});

Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false;

new Vue({
	// ajouter automatiquement
	// le token de session dans les appels axios
	beforeCreate() {
		api.interceptors.request.use((config) => {
			if (this.$store.state.token) {
				config.url += "?token=" + this.$store.state.token;
			}
			return config;
		});
	},
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
