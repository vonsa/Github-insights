import { writable } from 'svelte/store'

const profileStore = writable<string[]>([])

const { update, subscribe } = profileStore
const profiles$ = { subscribe }

function addProfile(name: string) {
  update((profiles) => (profiles.includes(name) ? profiles : [...profiles, name]))
}

function removeProfile(name: string) {
  update((profiles) => profiles.filter((profile) => profile !== name))
}

export { profiles$, addProfile, removeProfile }
