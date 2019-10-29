<template>
	<div id="app" class="container">
		<h1>HTTP com Axios</h1>
		<b-card>
			<b-form-group label="Nome">
				<b-form-input type="text" size="lg" 
					v-model="usuario.nome"
					placeholder="Informe o nome"></b-form-input>
			</b-form-group>
			<b-form-group label="EMail">
				<b-form-input type="email" size="lg" 
					v-model="usuario.email"
					placeholder="Informe o email"></b-form-input>
			</b-form-group>
			<hr>
			<b-button @click="salvar" size="lg" variant="primary">Salvar</b-button>
			<b-button @click="getUsuarios" size="lg" variant="success" class="ml-2">Obter Usuários</b-button>
		</b-card>
		<hr>
		<b-list-group>
			<b-list-group-item v-for="(usuario, id) in usuarios" :key="id">
				<strong>Nome:</strong> {{ usuario.nome }}<br>
				<strong>EMail:</strong> {{ usuario.email }}<br>
				<strong>ID:</strong> {{ id }}
			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
// import axios from 'axios'			// para acesso local

export default {
	data() {
		return {
			usuario: {
				nome: '',
				email: ''
			},
			usuarios: []
		}
	},
	methods: {
		salvar() {
			this.$http.post('usuarios.json', this.usuario)
				.then( () => {
					this.usuario.nome = ''
					this.usuario.email = ''
				})
		},
		getUsuarios() {
			this.$http.get('usuarios.json', this.usuarios)
				.then( res => {
					this.usuarios = res.data
				})
		},
		// acesso local:
		// getUsuarios() {
		// 	axios.get('https:/curso-vue-rapl.firebaseio.com/usuarios.json', this.usuarios)
		// 		.then( res => {
		// 			this.usuarios = res.data
		// 		})
		// }
	}

	// created() {
	// 	this.$http.post('usuarios.json', {
	// 		nome: 'Gabriel',
	// 		email: 'gabriel@gmail.com'
	// 	}).then( res => console.log(res))
	// }
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	font-size: 1.5rem;
}

#app h1 {
	text-align: center;
	margin: 50px;
}
</style>
