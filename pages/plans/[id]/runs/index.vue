<script setup>
definePageMeta({
    key: route => route.fullPath
})

const route = useRoute()
const { $api } = useNuxtApp()

const { pending, data, error } = $api.lazyFetch(`/plans/${route.params.id}`)
const planId = route.params.id
</script>

<template>
    <PageWrapper :pending="pending" :error="error" errorText="Unable to load plan details.">
        <PlansDetailHeader :title="data.displayName" active="runs" />
        <Pagination 
            :apiUrl="`/plans/${planId}/runs`"
            :clientUrl="`/plans/${planId}/runs`"
            errorText="Unable to load runs." 
            emptyText="There are no runs for this plan."
            v-slot="{ item }"
        >
            <NuxtLink :to="`/runs/${item.uuid}`" class="flex justify-start items-center font-medium hover:underline text-cyan-600">
                <RunsStatusIcon class="mr-2" :status="item.status" />
                {{ item.displayName }}
            </NuxtLink>
            <div class="text-gray-500">{{ item.uri }}</div>
        </Pagination>
    </PageWrapper>
</template>