<template>
	<div id="app" class="container">
		<h1>HTTP com Axios</h1>

		<Mensagem :mensagens="mensagens"></Mensagem>

		<!-- <transition name="fade" mode="out-in">
			<b-alert show dismissible v-for="mensagem in mensagens"
				:key="mensagem.texto"
				:variant="mensagem.tipo"
				>{{ mensagem.texto }}</b-alert>
		</transition> -->
		
		<!-- <b-alert :variant="mensagem.tipo" show dismissible 
			v-for="mensagem in mensagens"
			:key="mensagem.texto">{{ mensagem.texto }}</b-alert> -->

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
				<b-button @click="carregar(id)" size="lg" 
					variant="warning">Carregar</b-button>
				<b-button @click="excluir(id)" size="lg" 
					variant="danger" class="ml-2">Excluir</b-button>
			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
// import axios from 'axios'			// para acesso local

import Mensagem from './componentes/Mensagem.vue'
export default {
	components: { Mensagem },
	data() {
		return {
			usuario: {
				nome: '',
				email: ''
			},
			usuarios: [],
			id:  null,
			mensagens: [],
			exibir: false
		}
	},
	methods: {
		limpar() {
			this.usuario.nome = ''
			this.usuario.email = ''
			this.id = null,
			this.mensagens = []
		},
		carregar(id) {
			this.id = id
			this.usuario = { ...this.usuarios[id] }		// um clone do objeto
		},
		setMensagem(texto, tipo) {
			window.location.href='#app';
			this.mensagens.push({ texto, tipo })
			setTimeout( () => {
				this.mensagens = []
			}, 2000)
		},
		excluir(id) {
			this.$http.delete(`/usuarios/${id}.json`)
				.then ( () => {
					this.limpar()
					this.setMensagem('Registro Excluído com Sucesso', 'warning')
					this.getUsuarios()
				})
				.catch( () => {
					this.setMensagem('Houve erro ao excluir', 'danger')
				})
		},
		salvar() {
			const metodo = this.id ? 'patch' : 'post'
			const finalUrl = this.id ? `/${this.id}.json` : '.json'
			this.$http[metodo](`usuarios${finalUrl}`, this.usuario)
				.then( () => {
					this.limpar()
					this.setMensagem('Registro Salvo com Sucesso', 'success')
					// this.mensagens.push({
					// 	texto: 'Registro Salvo com Sucesso',
					// 	tipo: 'success'
					// })
					// setTimeout( () => {
					// 	this.mensagens = []
					// }, 2000)
				} )
			// this.$http.post('usuarios.json', this.usuario)
			// 	.then( () => this.limpar() )
		},
		getUsuarios() {
			// this.$http.defaults.headers.common['Authorization'] = 'abc123'
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

.fade-enter, .fade-leave-to {
	opacity: 0;
}

.fade-enter-active, .fade-leave-active{
	transition: opacity 2s;		
}

</style>
