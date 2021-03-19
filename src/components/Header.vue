<template>
	<header class="header">
		<nav role="navigation">
			<div id="menuToggle">
				<input type="checkbox" />

				<span></span>
				<span></span>
				<span></span>

				<ul id="menu">
					<h2 class="titreApplication"><b>COOP</b></h2>
					<li>
						<i>{{ $store.state.membre.fullname }}</i>
					</li>

					<router-link to="/"><li>Conversations</li></router-link>
					<router-link to="/membres"><li>Membres</li></router-link>
					<button @click="seDeconnecter">Se déconnecter</button>
				</ul>
			</div>
		</nav>
	</header>
</template>

<script>
export default {
	methods: {
		// Se déconnecter de l'appli en enlevant le token
		seDeconnecter() {
			this.$store.commit("seDeconnecter");
			this.$router.push("/se-connecter");
		},
	},
};
</script>

<style lang="scss">
.titreApplication {
	position: absolute;
	top: 59px;
	left: 38%;
}

body {
	margin: 0;
	padding: 0;
	font-family: "Avenir Next", "Avenir", sans-serif;
}

#menuToggle {
	display: block;
	position: relative;
	top: 50px;
	left: 50px;
	width: fit-content;

	z-index: 1;

	-webkit-user-select: none;
	user-select: none;
}

.router-link-exact-active {
	color: #9b4dca !important;
}

#menuToggle a {
	text-decoration: none;
	color: #232323;

	transition: color 0.3s ease;
}

#menuToggle a:hover {
	color: #9b4dca;
}

#menuToggle input {
	display: block;
	width: 40px;
	height: 32px;
	position: absolute;
	top: -7px;
	left: -5px;

	cursor: pointer;

	opacity: 0; /* hide this */
	z-index: 2; /* and place it over the hamburger */

	-webkit-touch-callout: none;
}

/*
 * Just a quick hamburger
 */
#menuToggle span {
	display: block;
	width: 33px;
	height: 4px;
	margin-bottom: 5px;
	position: relative;

	background: #9b4dca;
	border-radius: 3px;

	z-index: 1;

	transform-origin: 4px 0px;

	transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
		background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
}

#menuToggle input:hover ~ span {
	background: #232323;
}

#menuToggle span:first-child {
	transform-origin: 0% 0%;
}

#menuToggle span:nth-last-child(2) {
	transform-origin: 0% 100%;
}

/* 
 * Transform all the slices of hamburger
 * into a crossmark.
 */
#menuToggle input:checked ~ span {
	opacity: 1;
	transform: rotate(45deg) translate(-2px, -1px);
	background: #9b4dca;
}

#menuToggle input:checked:hover ~ span {
	background: #232323;
}

/*
 * But let's hide the middle one.
 */
#menuToggle input:checked ~ span:nth-last-child(3) {
	opacity: 0;
	transform: rotate(0deg) scale(0.2, 0.2);
}

/*
 * Ohyeah and the last one should go the other direction
 */
#menuToggle input:checked ~ span:nth-last-child(2) {
	transform: rotate(-45deg) translate(0, -1px);
}

/*
 * Make this absolute positioned
 * at the top left of the screen
 */
#menu {
	position: absolute;
	width: 300px;
	height: 100vh;
	margin: -100px 0 0 -50px;
	padding: 50px;
	padding-top: 125px;

	background: #ededed;
	list-style-type: none;
	-webkit-font-smoothing: antialiased;
	/* to stop flickering of text in safari */

	transform-origin: 0% 0%;
	transform: translate(-100%, 0);

	transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
}

#menu li {
	padding: 10px 0;
	font-size: 22px;
}

/*
 * And let's slide it in from the left
 */
#menuToggle input:checked ~ ul {
	transform: none;
}
</style>
