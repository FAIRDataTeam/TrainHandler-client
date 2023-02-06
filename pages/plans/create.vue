<script setup>
import _ from 'lodash'
import { required, url } from '@vuelidate/validators'

const router = useRouter()
const { $api } = useNuxtApp()


const { pending, data, error } = $api.lazyFetch('/trains/all')

const state = reactive({
    error: false,
    stationsFor: null
})

const form = reactive({
    fields: [{
        name: 'displayName',
        label: 'Name',
        rules: { required },
    }, {
        name: 'note',
        label: 'Note',
        rules: {},
        type: 'textarea',
    }, {
        name: 'trainUuid',
        label: 'Train',
        rules: { required },
        type: 'select',
        options: [],
    }, {
        name: 'publishArtifacts',
        label: 'Publish Artifacts',
        rules: {},
        type: 'checkbox',
    }, {
        name: 'targets',
        label: 'Targets',
        rules: {},
        type: 'multichoice',
        options: [],
        noOptions: 'Select train first.'
    }],
    submit: {
        label: 'Create'
    }
})

watch(data, (newData) => {
    // Set train options to the form after trains are loaded
    form.fields = form.fields.map((field) => {
        if (field.name === 'trainUuid') {
            field.options = _.sortBy(newData.map(({ uuid, title }) => ({ key: uuid, value: title })), ['value'])
        }
        return field
    })
})


const updated = async (data) => {
    // Get stations compatible with the given train
    if (data.trainUuid !== state.stationsFor) {
        const res = await $api.get(`/trains/${data.trainUuid}/stations`)
        state.stationsFor = data.trainUuid

        form.fields.map((field) => {
            if (field.name === 'targets') {
                field.options = _.sortBy(res.map((station) => ({
                    key: station.uuid,
                    value: station.title,
                })), ['value'])
            }
            return field
        })
    }
}

const submit = async (data) => {
    try {
        const sendData = { ...data }
        sendData.publishArtifacts = !!data.publishArtifacts
        sendData.targets = Object.entries(data.targets)
            .filter(([key, value]) => value)
            .map(([key, value]) => ({
                stationUuid: key,
                publishArtifacts: sendData.publishArtifacts,
            }))

        const res = await $api.post('/plans', sendData)
        await router.push(`/plans/${res.uuid}`)
    } catch (err) {
        state.error = true
    }
}
</script>
<template>
    <PageWrapper :pending="pending" :error="error" errorText="Unable to load trains.">
        <PlansHeader />
        <div class="mt-6 max-w-screen-md mx-auto">
            <h1>Create plan</h1>
            <AlertError v-if="state.error" text="Unable to create plan." />
            <FormRenderer :form="form" @submit="submit" @updated="updated" />
        </div>
    </PageWrapper>

</template>