<script setup>
const route = useRoute()
const { $api } = useNuxtApp()

const { pending, data, error } = $api.lazyFetch(`/trains/${route.params.id}`)
</script>

<template>
    <PageWrapper :pending="pending" :error="error" errorText="Unable to load train details.">
        <TrainsDetailHeader :title="data.title" />
        <DetailList>
            <DetailListRow title="Status">
                <SyncStatusBadge :status="data.status" />
            </DetailListRow>
            <DetailListRow title="URI">
                <a class="link" :href="data.uri" target="_blank">
                    {{ data.uri }}
                </a>
            </DetailListRow>
            <DetailListRow title="Train Garage">
                <NuxtLink class="link" :to="`/train-garages/${data.garage.uuid}`">
                    {{ data.garage.displayName }}
                </NuxtLink>
            </DetailListRow>
            <DetailListRow title="Keywords">
                <ul class="list-disc pl-4">
                    <li v-for="(keyword, index) in data.keywords" :key="index">
                        {{ keyword }}
                    </li>
                </ul>
            </DetailListRow>
        </DetailList>
    </PageWrapper>
</template>