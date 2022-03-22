<script setup>
const props = defineProps(['text'])
</script>
<template>
    <div
        class="text-red-700 bg-red-100 rounded-lg py-2 px-4 mt-5"
    >{{ text }}</div>
</template>