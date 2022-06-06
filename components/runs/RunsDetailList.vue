<script setup>
const props = defineProps(['title', 'items', 'emptyText'])
</script>
<template>
        <div class="mt-10">
            <h2 class="text-gray-500 mb-2">{{ title }}</h2>
            <AlertInfo v-if="items.length === 0" :text="emptyText" />
            <div v-for="item in items" :key="item.uuid"
                class="bg-gray-100 rounded-lg px-6 py-3 mb-1 flex justify-between"
            >
                <slot :item="item"></slot>
            </div>
        </div>
</template>