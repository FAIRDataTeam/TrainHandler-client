<template>
    <nav class="fixed top-0 left-0 right-0 bg-cyan-600 flex items-center py-4 px-6">
        <div class="text-xl text-white">🚂 Train Handler</div>
        <ul class="flex ml-8">
            <li>
                <NuxtLink class="block py-2 px-3 text-teal-100 hover:text-white" to="/">Trains</NuxtLink>
            </li>
            <li>
                <NuxtLink class="block py-2 px-3 text-teal-100 hover:text-white" to="/train-garages">Train Garages</NuxtLink>
            </li>
            <li>
                <NuxtLink
                    class="block py-2 px-3 text-teal-100 hover:text-white"
                    to="/stations"
                >Stations</NuxtLink>
            </li>
            <li>
                <NuxtLink
                    class="block py-2 px-3 text-teal-100 hover:text-white"
                    to="/station-directories"
                >Station Directories</NuxtLink>
            </li>
            <li>
                <NuxtLink class="block py-2 px-3 text-teal-100 hover:text-white" to="/runs">Runs</NuxtLink>
            </li>
        </ul>
    </nav>
</template>