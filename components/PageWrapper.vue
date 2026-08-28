<script setup>
const props = defineProps(['pending', 'error', 'errorText'])
</script>
<template>
    <div>
        <Loader class="masthead-clear-lg" v-if="pending && !error" />
        <div class="masthead-clear max-w-screen-lg mx-auto" v-else-if="error">
            <AlertError :text="errorText" />
        </div>
        <div v-else>
            <slot></slot>
        </div>
    </div>
</template>