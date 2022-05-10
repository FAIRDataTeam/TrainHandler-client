<script setup>
const route = useRoute()
const { $api } = useNuxtApp()

const { pending, data, error } = $api.lazyFetch(`/plans/${route.params.id}`)
</script>

<template>
    <PageWrapper :pending="pending" :error="error" errorText="Unable to load plan details.">
        <PlansDetailHeader :title="data.displayName" active="detail" />
        <DetailList>
            <DetailListRow title="Note">
                {{ data.note }}
            </DetailListRow>
            <DetailListRow title="Train">
                <NuxtLink class="link" :to="`/trains/${data.train.uuid}`">
                    {{ data.train.title }}
                </NuxtLink>
            </DetailListRow>
            <DetailListRow title="Stations">
                <ul class="list-disc pl-4">
                    <li v-for="station in data.targets" :key="station.uuid">
                        <NuxtLink class="link" :to="`/stations/${station.uuid}`">{{ station.title }}
                        </NuxtLink>
                    </li>
                </ul>
            </DetailListRow>
        </DetailList>
    </PageWrapper>
</template>
