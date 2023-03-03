<script setup>
const props = defineProps(['items'])
</script>
<template>
    <div class="w-full border border-gray-200 rounded-lg flex justify-start items-start">
        <div class="px-6 py-3" v-for="(item, index) in items" :key="index">
            <span class="block text-sm text-gray-500">{{ item.label }}</span>

            <NuxtLink v-if="item.value.to && item.value.label" class="link font-semibold" :to="item.value.to">
                {{ item.value.label }}
            </NuxtLink>
            <span v-else class="font-semibold text-gray-600">
                {{ item.value }}
            </span>
        </div>
    </div>
</template>