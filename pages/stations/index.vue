<script setup>
definePageMeta({
    key: route => route.fullPath
})
</script>
<template>
    <div>
        <StationsHeader active="stations" />
        <Pagination apiUrl="/stations" clientUrl="/stations" errorText="Unable to load stations." emptyText="There are no stations." v-slot="{ item }">
            <NuxtLink :to="`/stations/${item.uuid}`" class="block font-medium hover:underline text-cyan-600">
                {{ item.title }}
            </NuxtLink>
        </Pagination>
    </div>
</template>