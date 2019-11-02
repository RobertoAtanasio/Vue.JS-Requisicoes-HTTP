<template>
    <transition name="fade" mode="out-in">
        <b-alert show dismissible v-for="mensagem in mensagens"
            :key="mensagem.texto"
            :variant="mensagem.tipo"
            >{{ mensagem.texto }}</b-alert>
    </transition>
</template>

<script>
export default {
   props: {
        mensagens: {
            type: Array,
            required: true
        }
    }
}
</script>

<style>
.fade-enter, .fade-leave-to {
	opacity: 0;
}

.fade-enter-active, .fade-leave-active{
	transition: opacity 2s;		
}
</style>