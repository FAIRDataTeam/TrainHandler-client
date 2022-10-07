<script setup>
const props = defineProps(['status'])    
</script>
<template>
    <span
        class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none rounded"
        :class="status === 'SYNCED' ? 'text-green-100 bg-green-700' : (status === 'SYNCING' ? 'text-yellow-100 bg-yellow-700' : 'text-red-100 bg-red-700')"
    >
        {{ status }}
    </span>
</template>