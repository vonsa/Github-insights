import { combineLatest, fromEvent, merge, Observable, of, Subject } from 'rxjs'
import {
  endWith,
  filter,
  map,
  mapTo,
  repeat,
  scan,
  startWith,
  switchMap,
  take,
  takeUntil,
  throttleTime,
  withLatestFrom,
} from 'rxjs/operators'
import { filterNullish } from 'src/util/filter'
import {
  ElementState,
  Interactable,
  Interacter,
  isElement,
  isElementState,
  isInteractableWithState,
  isMousePosition,
  MousePosition,
  NodeAction,
} from './types'

const interactable$ = new Subject<NodeAction>()
const interactables$: Observable<NodeAction['node'][] | never[]> = interactable$.pipe(
  scan(reduceNodes, []),
)

const interacter$ = new Subject<NodeAction>()
const interacters$: Observable<NodeAction['node'][] | never[]> = interacter$.pipe(
  scan(reduceNodes, []),
)

function reduceNodes(acc: NodeAction['node'][] | never[], { action, node }: NodeAction) {
  if (action === 'ADD') {
    return [...acc, node]
  }
  if (acc.length > 0) {
    return acc.filter((storedNode) => storedNode !== node)
  }

  return acc
}

export function interactable(node: HTMLElement) {
  interactable$.next({ node, action: 'ADD' })

  return {
    destroy() {
      interactable$.next({ node, action: 'REMOVE' })
    },
  }
}

export function interacter(node: HTMLElement) {
  interacter$.next({ node, action: 'ADD' })

  return {
    destroy() {
      interacter$.next({ node, action: 'REMOVE' })
    },
  }
}

const mousePosition$ = fromEvent<MouseEvent>(window, 'mousemove').pipe(
  throttleTime(16.66),
  map((event) => {
    return { x: event.clientX, y: event.clientY }
  }),
)

const interactibleHovered$ = interactables$.pipe(
  switchMap((interactables) => {
    if (interactables.length <= 0) {
      return of(undefined)
    }
    return merge(
      ...interactables.map((interactable) => {
        return fromEvent<MouseEvent>(interactable, 'mouseenter').pipe(
          mapTo({ interactable, hovered: true }),
          takeUntil(fromEvent(interactable, 'mouseleave')),
          endWith({ interactable, hovered: false }),
          repeat(),
        )
      }),
    )
  }),
)

const interactibleHoveredDetails$ = interactibleHovered$.pipe(
  switchMap((props) => {
    if (!props) {
      return of(undefined)
    }

    const { interactable, hovered } = props

    return hovered
      ? mousePosition$.pipe(
          map(({ x, y }) => {
            return { interactable, x, y, hovered }
          }),
        )
      : mousePosition$.pipe(
          map(({ x, y }) => {
            return { interactable, x, y, hovered }
          }),
          take(1),
        )
  }),
)

const updateFollowers$ = combineLatest([
  mousePosition$,
  interactibleHovered$.pipe(
    filterNullish(),
    map(({ hovered }) => hovered),
    startWith(false),
  ),
]).pipe(
  filter(([, hovering]) => !hovering),
  map(([position]) => position),
  withLatestFrom(interacters$),
)

updateFollowers$.subscribe(([{ x, y }, interacters]) => {
  interacters.forEach((interacter) => {
    interacter.style.transform = `translate(${x}px, ${y}px)` // eslint-disable-line no-param-reassign
  })
})

combineLatest([interactibleHovered$, interacters$])
  .pipe(
    filter((props): props is [Interactable & ElementState, Interacter['interacter'][]] => {
      const [interactable, interacters] = props
      return (
        isInteractableWithState(interactable) &&
        interacters.every((interacter) => isElement(interacter))
      )
    }),
    withLatestFrom(mousePosition$),
  )
  .subscribe(([[{ interactable, hovered }, interacters], { x, y }]) => {
    interacters.forEach((interacter) => {
      if (hovered) {
        interacter.dispatchEvent(
          new CustomEvent('enter', {
            detail: { interacter, interactable, x, y },
          }),
        )
      }
    })

    if (hovered) {
      interactable.dispatchEvent(
        new CustomEvent('entered', {
          detail: { interactable, x, y },
        }),
      )
    }
  })

combineLatest([interacters$, interactibleHoveredDetails$])
  .pipe(
    filter(
      (
        props,
      ): props is [Interacter['interacter'][], Interactable & MousePosition & ElementState] => {
        const [interacters, interactableWithDetails] = props

        if (!interactableWithDetails) return false

        const { interactable, x, y } = interactableWithDetails
        return (
          interacters.every((interacter) => isElement(interacter)) &&
          isElement(interactable) &&
          isElementState(interactableWithDetails) &&
          isMousePosition({ x, y })
        )
      },
    ),
  )
  .subscribe(([interacters, { interactable, x, y, hovered }]) => {
    interacters.forEach((interacter) => {
      if (!hovered) {
        interacter.dispatchEvent(
          new CustomEvent('leave', {
            detail: { interacter, interactable, x, y },
          }),
        )
        return
      }

      interacter.dispatchEvent(
        new CustomEvent('hovering', {
          detail: { interacter, interactable, x, y },
        }),
      )
    })

    if (!hovered) {
      interactable.dispatchEvent(
        new CustomEvent('left', {
          detail: { interactable, x, y },
        }),
      )
      return
    }

    interactable.dispatchEvent(
      new CustomEvent('hovering', {
        detail: { interactable, x, y },
      }),
    )
  })
