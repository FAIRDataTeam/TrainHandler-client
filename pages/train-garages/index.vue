<script lang="ts" setup>
definePageMeta({
    key: route => route.fullPath
})
</script>
<template>
    <div>
        <TrainsHeader active="train-garages" />
        <Pagination apiUrl="/train-garages" clientUrl="/train-garages" errorText="Unable to load train garages" emptyText="There are no train garages."
            v-slot="{ item }">
            <NuxtLink :to="`/train-garages/${item.uuid}`" class="block font-medium hover:underline text-cyan-600">
                {{ item.displayName }}
            </NuxtLink>
        </Pagination>
    </div>
</template>