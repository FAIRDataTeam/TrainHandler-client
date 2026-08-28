<script setup>
import { useKeycloak } from '@/stores/keycloak'

const store = useKeycloak()
const route = useRoute()

// "Trains" owns the index route as well as /trains, so it needs its own test
// rather than a prefix match — otherwise every path lights it up.
const nav = [
    { label: 'Trains',   to: '/',         match: (p) => p === '/' || p.startsWith('/trains') },
    { label: 'Stations', to: '/stations', match: (p) => p.startsWith('/stations') || p.startsWith('/station-directories') },
    { label: 'Plans',    to: '/plans',    match: (p) => p.startsWith('/plans') || p.startsWith('/runs') },
]

const isActive = (item) => item.match(route.path)
</script>

<template>
<header class="masthead">
    <!-- Row 1: chrome. Small, quiet, letter-spaced — it frames the app rather
         than competing with it. -->
    <div class="bar">
        <NuxtLink to="/" class="brand" aria-label="Train Handler — home">
            <!-- A section of coaster track, echoing the banner below. Replaces
                 the emoji, which rendered at a different weight on every OS. -->
            <svg class="mark" viewBox="0 0 40 24" role="img" aria-hidden="true" focusable="false">
                <path d="M1 8 C 8 8, 10 3, 16 3 C 22 3, 24 8, 31 8 L 39 8"
                      fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                <path d="M1 12 C 8 12, 10 7, 16 7 C 22 7, 24 12, 31 12 L 39 12"
                      fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                <g stroke="currentColor" stroke-width="1.1" opacity="0.75">
                    <line x1="5"  y1="8.7" x2="5"  y2="12.7"/>
                    <line x1="11" y1="6.2" x2="11" y2="10.2"/>
                    <line x1="17" y1="4"   x2="17" y2="8"/>
                    <line x1="23" y1="5.1" x2="23" y2="9.1"/>
                    <line x1="29" y1="7.6" x2="29" y2="11.6"/>
                    <line x1="35" y1="8.7" x2="35" y2="12.7"/>
                </g>
                <g stroke="currentColor" stroke-width="1" opacity="0.4">
                    <line x1="4"  y1="13" x2="4"  y2="21"/>
                    <line x1="14" y1="9"  x2="14" y2="21"/>
                    <line x1="26" y1="10" x2="26" y2="21"/>
                    <line x1="36" y1="13" x2="36" y2="21"/>
                    <line x1="1"  y1="21" x2="39" y2="21"/>
                </g>
            </svg>
            <span class="wordmark"><b>Train</b> Handler</span>
        </NuxtLink>

        <nav class="nav" aria-label="Main">
            <NuxtLink
                v-for="item in nav"
                :key="item.to"
                :to="item.to"
                class="navlink"
                :class="{ 'is-active': isActive(item) }"
                :aria-current="isActive(item) ? 'page' : null"
            >{{ item.label }}</NuxtLink>
        </nav>

        <div class="user" v-if="store.isSet()">
            <span class="username">{{ store.keycloak.idTokenParsed.name }}</span>
            <button type="button" class="logout" @click="store.keycloak.logout()">Log out</button>
        </div>
    </div>

    <!-- Row 2: the FAIR coaster. Cropped to the track-and-kiosk band and faded
         into the page, so it reads as a masthead rather than a pasted-in image. -->
    <div class="banner" role="img"
         aria-label="The FAIR data train: a coaster track calling at four stations — Findable, Accessible, Interoperable, Reusable.">
        <picture>
            <!-- An animated GIF cannot be paused with CSS, so reduced-motion gets
                 a still frame. These two come first: first match wins. -->
            <source media="(prefers-reduced-motion: reduce) and (prefers-color-scheme: dark)"
                    srcset="/brand/coaster-dark-still.png">
            <source media="(prefers-reduced-motion: reduce)"
                    srcset="/brand/coaster-light-still.png">
            <source media="(prefers-color-scheme: dark)" srcset="/brand/coaster-dark.gif">
            <img src="/brand/coaster-light.gif" alt="" width="2880" height="220" decoding="async">
        </picture>
    </div>
</header>
</template>

<style scoped>
/* Palette taken from the artwork itself, which is why the old cyan bar sat so
   badly against it. Height lives here as one variable; assets/main.scss reads
   the same number to keep pages clear of the fixed masthead. */
.masthead {
    /* --bar-h and --band-h are declared in assets/main.scss, next to the page
       clearance that has to match them. */
    --sky:      #eaf1f8;
    --sky-deep: #dbe6f2;
    --rail:     #33496a;
    --ink:      #16233a;
    --muted:    #5b6d87;
    --hairline: rgba(22, 35, 58, 0.14);

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 40;
    background: var(--sky);
    border-bottom: 1px solid var(--hairline);
}

@media (prefers-color-scheme: dark) {
    .masthead {
        --sky:      #0d1424;
        --sky-deep: #0b1020;
        --rail:     #a8c4e6;
        --ink:      #e9eff8;
        --muted:    #8ea3c0;
        --hairline: rgba(168, 196, 230, 0.16);
    }
}

/* ---------------------------------------------------------------- row 1 --- */

.bar {
    height: var(--bar-h);
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 0 1.5rem;
    background: var(--sky-deep);
}

.brand {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    color: var(--ink);
    text-decoration: none;
    flex: none;
}
.mark { width: 34px; height: 20px; color: var(--rail); flex: none; }

.wordmark {
    font-size: 0.98rem;
    letter-spacing: 0.005em;
    font-weight: 400;
    white-space: nowrap;
}
.wordmark b { font-weight: 600; }

.nav {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-right: auto;
    min-width: 0;
    overflow-x: auto;
}

.navlink {
    position: relative;
    padding: 0.45rem 0.7rem;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.11em;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    white-space: nowrap;
    border-radius: 3px;
    transition: color 120ms ease;
}
.navlink:hover { color: var(--ink); }

/* The active marker is a sleeper under the rail, not a generic underline. */
.navlink.is-active { color: var(--ink); }
.navlink.is-active::after {
    content: "";
    position: absolute;
    left: 0.7rem;
    right: 0.7rem;
    bottom: 0.05rem;
    height: 2px;
    background: var(--rail);
    border-radius: 1px;
}

.user {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    flex: none;
}
.username {
    font-size: 0.82rem;
    color: var(--ink);
    max-width: 22ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.logout {
    background: none;
    border: 1px solid var(--hairline);
    border-radius: 3px;
    padding: 0.24rem 0.6rem;
    font: inherit;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: var(--muted);
    cursor: pointer;
    transition: color 120ms ease, border-color 120ms ease;
}
.logout:hover { color: var(--ink); border-color: var(--rail); }

/* ---------------------------------------------------------------- row 2 --- */

.banner {
    position: relative;
    height: var(--band-h);
    overflow: hidden;
    background: var(--sky);
}
.banner picture,
.banner img {
    display: block;
    width: 100%;
    height: 100%;
}
.banner img {
    object-fit: cover;
    /* At the artwork's own ratio there is nothing to crop. Only once --band-h
       hits its cap on a very wide screen does this bite, and then it trims sky
       from the top and keeps the track and the four kiosks. */
    object-position: center 62%;
}

/* Dissolve the artwork into the page instead of ending on a hard edge. */
.banner::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(to bottom,
        rgba(0, 0, 0, 0) 78%,
        var(--sky) 100%);
}

:focus-visible { outline: 2px solid var(--rail); outline-offset: 2px; }

/* Narrow screens: drop the band and keep the chrome, so the masthead does not
   eat a phone viewport. main.scss narrows the page clearance to match. */
@media (max-width: 640px) {
    .banner { display: none; }
    .bar { gap: 1rem; }
    .username { display: none; }
}
</style>
