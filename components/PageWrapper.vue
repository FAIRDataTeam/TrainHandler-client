<script setup>
const props = defineProps(['pending', 'error', 'errorText'])
</script>
<template>
    <div>
        <Loader class="pt-56" v-if="pending && !error" />
        <div class="pt-20 max-w-screen-lg mx-auto" v-else-if="error">
            <AlertError :text="errorText" />
        </div>
        <div v-else>
            <slot></slot>
        </div>
    </div>
</template>