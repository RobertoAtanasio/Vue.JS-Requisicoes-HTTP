
//--- PLUGIN de acesso à base de dados via axios.

import Vue from 'vue'
import axios from 'axios'

// axios.defaults.baseURL = 'https://curso-vue-rapl.firebaseio.com/'
// axios.defaults.headers.common['Authorization'] = 'abc123'
// axios.defaults.headers.get['Accepts'] = 'application/json'

Vue.use ({
    install (Vue) {
        // Vue.prototype.$http = axios
        Vue.prototype.$http = axios.create({
            baseURL: 'https://curso-vue-rapl.firebaseio.com/',
            headers: {
                'Authorization': 'abc123'
            }
            // headers: {
            //     get: {
            //         'Authorization': 'abc123'
            //     }
            // }
            // aqui qualquer requisição é tratada de forma global (get, post, put, delete, ...)
            // acima apenas as requisições 'get'
        })

        // para interceptar requisição
        Vue.prototype.$http.interceptors.request.use( config => {
            // alert('interceptors request: ' + config.method)
            return config
        }, error => Promise.reject(error))

        Vue.prototype.$http.interceptors.response.use( res => {
            // // refatorar a saída com um novo padrão de objeto diferente do retornado.
            // // Lembrando que neste caso, temos que altera a tag <strong>ID:</strong> {{ id }}
            // // para <strong>ID:</strong> {{ usuario.id }} em App.vue
            // const array = []
            // for (let key in res.data) {
            //     array.push({ id: key, ...res.data[key]})
            //     // array.push({ 
            //     //     id: key, 
            //     //     nome: res.data[key].nome, 
            //     //     email: res.data[key].email
            //     // })
            // }
            // res.data = array
            return res
        }, error => Promise.reject(error))

        
    }
})