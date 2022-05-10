<script setup>
const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()

const { pending, data, error } = $api.lazyFetch(`/train-garages/${route.params.id}`)

const state = reactive({
    deleteError: false,
    deleteModalOpen: false,
})

const deleteGarage = async () => {
    try {
        await $api.delete(`/train-garages/${route.params.id}`)
        await router.push('/train-garages')
    } catch (error) {
        console.error(error)
    }
}

const deleteConfirm = () => {
    deleteGarage()
}

const deleteCancel = () => {
    state.deleteModalOpen = false
}

const openDeleteModal = () => {
    state.deleteModalOpen = true
}
</script>
<template>
    <PageWrapper :pending="pending" :error="error" errorText="Unable to load train garage details.">
        <TrainsGarageDetailHeader :title="data.displayName" @delete="openDeleteModal" />
        <DetailList>
            <DetailListRow title="URI">
                <a class="link" :href="data.uri" target="_blank">{{ data.uri }}</a>
            </DetailListRow>
            <DetailListRow title="Note">
                {{ data.note }}
            </DetailListRow>
        </DetailList>
        <ModalConfirm :visible="state.deleteModalOpen" :dangerous="true" title="Delete train garage"
            confirm-action="Delete" cancel-action="Cancel" @confirm="deleteConfirm" @cancel="deleteCancel">
            Are you sure you want to permanently delete
            <strong>{{ data.displayName }}</strong>? This action cannot be undone.
        </ModalConfirm>
    </PageWrapper>
</template>
