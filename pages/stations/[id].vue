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
                <span
                    class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-green-700 rounded">
                    {{ data.status }}
                </span>
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