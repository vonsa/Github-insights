export interface NodeAction {
  action: 'ADD' | 'REMOVE'
  node: HTMLElement
}

export interface MousePosition {
  x: number
  y: number
}

export interface ElementState {
  hovered: boolean
}

export interface Interactable {
  interactable: HTMLElement
}

export interface Interacter {
  interacter: HTMLElement
}

export interface InteractCallbackProperties {
  detail: Interactable & Interacter & MousePosition
}

export function isMousePosition(
  position: { x: number; y: number } | undefined,
): position is MousePosition {
  const { x, y } = position || {}
  return !Number.isNaN(x) && !Number.isNaN(y)
}

export function isElement(element: HTMLElement | undefined): element is HTMLElement {
  return element instanceof HTMLElement
}

export function isElementState(state: ElementState | undefined): state is ElementState {
  return !!state && 'hovered' in state && typeof state.hovered === 'boolean'
}

export function isInteractableWithState(
  props: (Interactable & ElementState) | undefined,
): props is Interactable & ElementState {
  return isElementState(props) && isElement(props.interactable)
}
