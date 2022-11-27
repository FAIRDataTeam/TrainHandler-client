<script setup>
const route = useRoute()
const { $api, $statusUtils, $timeUtils } = useNuxtApp()

definePageMeta({
    key: route => route.fullPath
})

const getDuration = ({ startedAt, finishedAt }) => $timeUtils.getDuration(startedAt, finishedAt)

const getInfoPanelItems = (run) => {
    return [{
        label: 'Plan',
        value: {
            label: run.plan.displayName,
            to: `/plans/${run.plan.uuid}`
        }
    }, {
        label: 'Train',
        value: {
            label: run.plan.train.title,
            to: `/trains/${run.plan.train.uuid}`
        }
    }, {
        label: 'Status',
        value: run.status
    }, {
        label: 'Duration',
        value: getDuration(run)
    }]
}

const getArtifacts = (run) => {
    return run.jobs.reduce((acc, job) => {
        job.artifacts.forEach((artifact) => {
            acc.push({
                ...artifact,
                jobUuid: job.uuid,
                runUuid: run.uuid
            })
        })
        return acc
    }, [])
}


const runUuid = route.params.id
const version = ref(0)
const { pending, data, error, refresh } = $api.lazyFetch(() => `/runs/${runUuid}?after=${version.value}`)

watch(data, (newData) => {
    version.value = newData.version
    if ($statusUtils.isInProgress(newData.status)) {
        requestAnimationFrame(() => {
            refresh()
        })
    }
})
</script>

<template>
    <RunsDetailWrapper :pending="version === 0 && pending" :error="error" :data="data">
        <RunsDetailInfoPanel :items="getInfoPanelItems(data)" />
        <RunsDetailList v-slot="{ item }" title="Jobs" emptyText="There are no jobs." :items="data.jobs">
            <span class="flex justify-start items-center">
                <RunsStatusIcon :status="item.status" class="mr-1" />
                <NuxtLink :to="`/runs/${data.uuid}/jobs/${item.uuid}`">{{ item.target.title }}</NuxtLink>
            </span>
            <span class="text-sm font-semibold text-gray-500 pl-2">{{ getDuration(item) }}</span>
        </RunsDetailList>
        <RunsDetailArtifactList :items="getArtifacts(data)" />
    </RunsDetailWrapper>
</template>