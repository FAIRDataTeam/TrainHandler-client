<script setup>
const route = useRoute()
const { $api } = useNuxtApp()

const { pending, data, error } = $api.lazyFetch(`/stations/${route.params.id}`)
</script>

<template>
    <PageWrapper :pending="pending" :error="error" errorText="Unable to load train details.">
        <StationsDetailHeader :title="data.title" />
        <DetailList>
            <DetailListRow title="Description">
                {{ data.description }}
            </DetailListRow>
            <DetailListRow title="Status">
                <SyncStatusBadge :status="data.status" />
            </DetailListRow>
            <DetailListRow title="URI">
                <a class="link" :href="data.uri" target="_blank">{{ data.uri }}</a>
            </DetailListRow>
            <DetailListRow title="Station Directory">
                <NuxtLink class="link" :to="`/station-directories/${data.directory.uuid}`">
                    {{ data.directory.displayName }}
                </NuxtLink>
            </DetailListRow>
            <DetailListRow ttile="Keywords">
                <ul class="list-disc pl-4">
                    <li v-for="(keyword, index) in data.keywords" :key="index">
                        {{ keyword }}
                    </li>
                </ul>
            </DetailListRow>
        </DetailList>
    </PageWrapper>
</template>