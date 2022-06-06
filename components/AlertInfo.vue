<script setup>
const props = defineProps(['text'])
</script>
<template>
    <div
        class="text-cyan-700 bg-cyan-50 rounded-lg py-3 px-6"
    >{{ text }}</div>
</template>