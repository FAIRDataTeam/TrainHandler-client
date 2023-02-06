<script setup>
const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()

const { pending, data, error, refresh } = $api.lazyFetch(`/stations/${route.params.id}`)

const state = reactive({
    deleteError: false,
    deleteModalOpen: false,
})

const deleteTrain = async () => {
    try {
        await $api.delete(`/stations/${route.params.id}`)
        await router.push('/stations')
    } catch (error) {
        console.error(error)
    }
}

const deleteConfirm = () => {
    deleteTrain()
}

const deleteCancel = () => {
    state.deleteModalOpen = false
}

const openDeleteModal = () => {
    state.deleteModalOpen = true
}

const restore = async () => {
    try {
        await $api.put(`/stations/${route.params.id}`, {
            softDeleted: false
        })
        refresh()
    } catch (error) {
        console.error(error)
    }
}
</script>

<template>
    <PageWrapper :pending="pending" :error="error" errorText="Unable to load train details.">
        <StationsDetailHeader :title="data.title" :softDeleted="data.softDeleted" @delete="openDeleteModal" @restore="restore" />
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
            <DetailListRow title="Station Directory" v-if="data.dirc">
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
            <DetailListRow title="Metadata">
                <p>{{ data.metadata }}</p>
            </DetailListRow>
            <DetailListRow title="Endpoint URL">
                <a class="link" :href="data.endpointUrl" target="_blank">{{ data.endpointUrl }}</a>
            </DetailListRow>
            <DetailListRow title="Endpoint Description">
                <p>{{ data.endpointDescription }}</p>
            </DetailListRow>
            <DetailListRow title="Train Types">
                <ul class="list-disc pl-4">
                    <li v-for="t in data.types" :key="t.uuid">
                        {{ t.title }}
                    </li>
                </ul>
            </DetailListRow>
        </DetailList>
        <ModalConfirm :visible="state.deleteModalOpen" :dangerous="true" title="Delete station"
            confirm-action="Delete" cancel-action="Cancel" @confirm="deleteConfirm" @cancel="deleteCancel">
            Are you sure you want to delete <strong>{{ data.title }}</strong>?
        </ModalConfirm>
    </PageWrapper>
</template>