<script setup>
const props = defineProps(['to', 'active', 'status'])
</script>

<template>
    <NuxtLink :to="to" class="flex justify-start items-center px-3 py-2 rounded-lg whitespace-nowrap hover:bg-gray-50"
        :class="active ? 'bg-gray-50 font-semibold' : 'text-gray-700'">
        <RunsStatusIcon :status="status" />
        <span class="ml-1 overflow-x-hidden overflow-ellipsis">
            <slot></slot>
        </span>
    </NuxtLink>
</template>