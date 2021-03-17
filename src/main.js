import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import md5 from "crypto-js/md5";

import milligram from "milligram";

window.md5 = md5;
window.api = axios.create({
	baseURL: "https://allweb.fun/coop/api/",
	headers: { Authorization: "00b61242d0e94b3d21c84ce9825714ec60ba2350" },
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
