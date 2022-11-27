<script setup>
definePageMeta({
    key: route => route.fullPath
})

const route = useRoute()
const { $api, $statusUtils, $timeUtils } = useNuxtApp()

const getDuration = ({ startedAt, finishedAt }) => $timeUtils.getDuration(startedAt, finishedAt)

const getInfoPanelItems = (job) => {
    return [{
        label: 'Station',
        value: {
            label: job.target.title,
            to: `/stations/${job.target.uuid}`
        }
    }, {
        label: 'Status',
        value: job.status
    }, {
        label: 'Duration',
        value: getDuration(job)
    }]
}

const getEvents = (job) => {
    let startTime = job.startedAt

    return job.events.map(event => {
        event.duration = $timeUtils.getDuration(startTime, event.occurredAt)
        startTime = event.occurredAt
        return event
    })
}

const getArtifacts = (run, job) => {
    return job.artifacts.map((artifact) => ({
        ...artifact,
        jobUuid: job.uuid,
        runUuid: run.uuid
    }))
}


const runUuid = route.params.id
const jobUuid = route.params.jobId
const runVersion = ref(0)
const jobVersion = ref(0)
const { pending: runPending, data: runData, error: runError, refresh: runRefresh } = $api.lazyFetch(() => `/runs/${runUuid}?after=${runVersion.value}`)
const { pending: jobPending, data: jobData, error: jobError, refresh: jobRefresh } = $api.lazyFetch(() => `/runs/${runUuid}/jobs/${jobUuid}?after=${jobVersion.value}`)

watch(runData, (newRunData) => {
    runVersion.value = newRunData.version
    if ($statusUtils.isInProgress(newRunData.status)) {
        requestAnimationFrame(() => {
            runRefresh()
        })
    }
})

watch(jobData, (newJobData) => {
    jobVersion.value = newJobData.version
    if ($statusUtils.isInProgress(newJobData.status)) {
        requestAnimationFrame(() => {
            jobRefresh()
        })
    }
})

</script>

<template>
    <RunsDetailWrapper :pending="(runVersion === 0 && runPending) || (jobVersion === 0 && jobPending)" :error="runError || jobError" :data="runData">
        <RunsDetailInfoPanel :items="getInfoPanelItems(jobData)" />
        <RunsDetailList v-slot="{ item }" title="Events" emptyText="There are no events." :items="getEvents(jobData)">
            <span>{{ item.message }}</span>
            <span class="text-sm font-semibold text-gray-500 pl-2">{{ item.duration }}</span>
        </RunsDetailList>
        <RunsDetailArtifactList :items="getArtifacts(runData, jobData)" />
    </RunsDetailWrapper>
</template>
