<script setup>
definePageMeta({
    key: route => route.fullPath
})
</script>
<template>
    <div>
        <TrainsHeader active="trains" />
        <Pagination apiUrl="/trains" clientUrl="/" errorText="Unable to load trains." emptyText="There are no trains." v-slot="{ item }">
            <NuxtLink :to="`/trains/${item.uuid}`" class="block font-medium hover:underline text-cyan-600">
                {{ item.title }}
            </NuxtLink>
        </Pagination>
    </div>
</template>