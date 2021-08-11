import { combineLatest, fromEvent, merge, Subject } from 'rxjs'
import {
  distinctUntilChanged,
  endWith,
  filter,
  map,
  mapTo,
  repeat,
  startWith,
  switchMap,
  takeUntil,
  throttleTime,
  withLatestFrom,
} from 'rxjs/operators'

interface CallbackParams {
  target: HTMLElement
  element: HTMLElement
  x: number
  y: number
}
interface MouseTarget {
  target: HTMLElement
  onMouseOver?: (options: CallbackParams) => void
  onMouseEnter?: (options: CallbackParams) => void
  onMouseOut?: (options: { target: HTMLElement; element: HTMLElement }) => void
}

export const linkedElements$ = new Subject<HTMLElement[]>()
const targets$ = new Subject<MouseTarget[]>()

export function setTargets(mouseTargets: MouseTarget[]) {
  targets$.next(mouseTargets)
}

const mousePosition$ = fromEvent<MouseEvent>(window, 'mousemove').pipe(
  throttleTime(16.66),
  map((event) => {
    return { x: event.clientX, y: event.clientY }
  }),
)

const updateElement$ = linkedElements$.pipe(
  switchMap((elements) => {
    return merge(
      ...elements.map((element) => {
        return fromEvent<MouseEvent>(element, 'mouseenter').pipe(
          switchMap(() => mousePosition$),
          map(({ x, y }) => ({ element, x, y })),
          takeUntil(fromEvent(element, 'mouseleave')),
          endWith({ element, x: null, y: null }),
          repeat(),
        )
      }),
    )
  }),
)

const mouseIn$ = updateElement$.pipe(filter(({ x, y }) => !!x && !!y))
const mouseOut$ = updateElement$.pipe(filter(({ x, y }) => !x || !y))

const hovering$ = merge(mouseIn$.pipe(mapTo(true)), mouseOut$.pipe(mapTo(false))).pipe(
  distinctUntilChanged(),
)

const setMousePosition$ = combineLatest([mousePosition$, hovering$.pipe(startWith(false))]).pipe(
  filter(([, hovering]) => !hovering),
  map(([position]) => position),
  withLatestFrom(targets$),
)

setMousePosition$.subscribe(([{ x, y }, targets]) => {
  targets.forEach((target) => {
    target.target.style.transform = `translate(${x}px, ${y}px)` // eslint-disable-line no-param-reassign
  })
})

combineLatest([hovering$, targets$]).subscribe(([hovering, targets]) => {
  targets.forEach((target) => {
    if (hovering) {
      target.target.classList.add('active')
    } else {
      target.target.classList.remove('active')
    }
  })
})

combineLatest([targets$, updateElement$]).subscribe(([targets, { element, x, y }]) => {
  targets.forEach(({ target, onMouseOver, onMouseOut }) => {
    if (!x || !y) {
      if (onMouseOut) {
        onMouseOut({ target, element })
      }
      return
    }

    if (onMouseOver) {
      onMouseOver({ target, element, x, y })
    }
  })
})

/*
EVENTS:

animationend
animationstart
animationiteration?
animationcancel?
same for transition (e.g. transitionend)

pointerenter
pointerleave
mouseenter
mouseleave
pointermove?

*/
