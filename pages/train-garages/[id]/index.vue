<script setup>
import { PencilIcon, TrashIcon } from "@heroicons/vue/outline"

const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()

const { pending, data } = $api.lazyFetch(`/train-garages/${route.params.id}`)

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
    <div class="max-w-screen-md mx-auto">
        <div v-if="pending">Loading...</div>
        <div v-else>
            <div class="flex justify-between items-center py-5">
                <h1 class="text-xl leading-6 font-medium text-gray-900">{{ data.displayName }}</h1>
                <div>
                    <NuxtLink
                        class="button button-outline-default button-sm mr-2"
                        :to="`/train-garages/${data.uuid}/edit`"
                    ><PencilIcon class="w-4 mr-1 inline-block" />Edit</NuxtLink>
                    <a
                        @click.prevent="openDeleteModal"
                        class="button button-outline-danger button-sm"
                    >
                        <TrashIcon class="w-4 mr-1 inline-block" />Delete
                    </a>
                </div>
            </div>
            <div class="border-t border-gray-200">
                <dl>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">URI</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <a class="link" :href="data.uri" target="_blank">{{ data.uri }}</a>
                        </dd>
                    </div>
                    <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Note</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ data.note }}</dd>
                    </div>
                </dl>
            </div>
            <ModalConfirm
                :visible="state.deleteModalOpen"
                :dangerous="true"
                title="Delete train garage"
                confirm-action="Delete"
                cancel-action="Cancel"
                @confirm="deleteConfirm"
                @cancel="deleteCancel"
            >
                Are you sure you want to permanently delete
                <strong>{{ data.displayName }}</strong>? This action cannot be undone.
            </ModalConfirm>
        </div>
    </div>
</template>
