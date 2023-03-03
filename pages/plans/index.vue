<script setup>
definePageMeta({
  key: route => route.fullPath
})
</script>

<template>
    <div>
        <PlansHeader />
        <Pagination apiUrl="/plans" clientUrl="/plans" errorText="Unable to load plans." v-slot="{ item }">
            <NuxtLink :to="`/plans/${item.uuid}`" class="block font-medium hover:underline text-cyan-600">{{
                    item.displayName
            }}
            </NuxtLink>
        </Pagination>
    </div>
</template>