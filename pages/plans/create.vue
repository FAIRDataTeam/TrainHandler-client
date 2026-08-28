<script setup>
import _ from 'lodash'
import { required, url } from '@vuelidate/validators'

const router = useRouter()
const { $api } = useNuxtApp()


const { pending, data, error } = $api.lazyFetch('/trains/all')

const state = reactive({
    error: false,
    errorText: 'Unable to create plan.',
    stationsFor: null,
    // What the handler says it would do with this train, so the choice can be
    // seen before it is made rather than explained afterwards.
    discovery: null,
    discoveryFor: null,
    letHandlerChoose: false,
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
        name: 'resolveTargets',
        label: 'Let the handler choose the stations',
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
    state.letHandlerChoose = !!data.resolveTargets

    // Get stations compatible with the given train
    if (data.trainUuid && data.trainUuid !== state.stationsFor) {
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

    // Ask the handler which of them can actually answer this train's query.
    if (data.trainUuid && data.trainUuid !== state.discoveryFor) {
        state.discoveryFor = data.trainUuid
        try {
            state.discovery = await $api.get(`/stations/discover?trainUuid=${data.trainUuid}`)
        } catch (err) {
            // An older handler has no discovery endpoint; the form still works.
            state.discovery = null
        }
    }
}

const submit = async (data) => {
    try {
        state.error = false
        const sendData = { ...data }
        sendData.publishArtifacts = !!data.publishArtifacts
        sendData.resolveTargets = !!data.resolveTargets

        if (sendData.resolveTargets) {
            // Hand the decision over: no targets, and the handler resolves them
            // from what each station has published.
            sendData.targets = []
        } else {
            sendData.targets = Object.entries(data.targets)
                .filter(([key, value]) => value)
                .map(([key, value]) => ({
                    stationUuid: key,
                    publishArtifacts: sendData.publishArtifacts,
                }))
        }

        const res = await $api.post('/plans', sendData)
        await router.push(`/plans/${res.uuid}`)
    } catch (err) {
        // The handler refuses a plan with no targets and no resolution, and
        // refuses one where nothing matched. Both are worth reading.
        state.errorText = err?.data?.message
            || 'Unable to create plan. Either tick some stations or let the handler choose.'
        state.error = true
    }
}

const shorten = (iri) => iri.replace(/^.*[#/]/, '')
</script>
<template>
    <PageWrapper :pending="pending" :error="error" errorText="Unable to load trains.">
        <PlansHeader />
        <div class="mt-6 max-w-screen-md mx-auto">
            <h1>Create plan</h1>
            <AlertError v-if="state.error" :text="state.errorText" />
            <FormRenderer :form="form" @submit="submit" @updated="updated" />

            <!-- What the handler would decide, shown before it is asked to. -->
            <div v-if="state.discovery" class="mt-8 border-t pt-6">
                <h2 class="text-base font-semibold">
                    What the handler would choose
                </h2>
                <p class="mt-1 text-sm text-gray-500">
                    Matched from what each station publishes about its dataset against the
                    vocabulary this train's query references.
                    <span v-if="state.letHandlerChoose" class="font-medium text-gray-700">
                        These are the stations this plan will target.
                    </span>
                    <span v-else>
                        Tick <em>Let the handler choose the stations</em> to use these instead of
                        your own selection.
                    </span>
                </p>

                <ul class="mt-4 space-y-3">
                    <li
                        v-for="match in state.discovery"
                        :key="match.stationUuid"
                        class="rounded border p-3"
                        :class="match.relevant ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'"
                    >
                        <div class="flex items-baseline justify-between gap-3">
                            <span class="font-medium">{{ match.title }}</span>
                            <span
                                class="whitespace-nowrap rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-wide"
                                :class="match.relevant ? 'bg-green-600 text-white' : 'bg-gray-400 text-white'"
                            >
                                {{ match.relevant ? 'selected' : 'skipped' }}
                                &middot; {{ Math.round(match.score * 100) / 100 }}
                            </span>
                        </div>
                        <p class="mt-1 text-sm text-gray-600">{{ match.reason }}</p>
                        <p
                            v-if="match.matchedClasses.length || match.matchedProperties.length"
                            class="mt-1 text-xs text-gray-500"
                        >
                            matched:
                            {{ match.matchedClasses.concat(match.matchedProperties).map(shorten).join(', ') }}
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    </PageWrapper>

</template>
