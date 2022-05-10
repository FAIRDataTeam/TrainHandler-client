<script setup>
definePageMeta({
    key: route => route.fullPath
})
</script>
<template>
    <div>
        <StationsHeader active="station-directories" />
        <Pagination apiUrl="/station-directories" clientUrl="/station-directories" errorText="Unable to load station directories." v-slot="{ item }">
            <NuxtLink :to="`/station-directories/${item.uuid}`" class="block font-medium hover:underline text-cyan-600">
                {{ item.displayName }}
            </NuxtLink>
        </Pagination>
    </div>
</template>