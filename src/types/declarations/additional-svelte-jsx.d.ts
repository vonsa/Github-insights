/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace svelte.JSX {
  interface InteractEventDetails {
    interactable: HTMLElement
    interacter: HTMLElement
    x: number
    y: number
  }
  interface HTMLAttributes<T> {
    onenter?: (event: { detail: InteractEventDetails }) => void
    onentered?: (event: { detail: InteractEventDetails }) => void
    onleave?: (event: { detail: InteractEventDetails }) => void
    onleft?: (event: { detail: InteractEventDetails }) => void
    onhovering?: (event: { detail: InteractEventDetails }) => void
    onhovered?: (event: { detail: InteractEventDetails }) => void
  }
}
