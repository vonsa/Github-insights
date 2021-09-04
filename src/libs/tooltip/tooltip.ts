import { fromEvent, timer, combineLatest, concat, Subject } from 'rxjs'
import {
  auditTime,
  filter,
  map,
  mapTo,
  repeat,
  switchMap,
  take,
  takeUntil,
  endWith,
} from 'rxjs/operators'
import anime from 'animejs'
import { filterNullish } from 'src/util/filter'
import type { NotificationConfig } from 'src/types/notification'
import Tooltip from './TooltipFromAction.svelte'

interface TooltipConfig extends Partial<NotificationConfig> {
  title: string
  animationDuration?: number
  TooltipComponent?: any
  onComplete?: () => void
}

const tooltip$ = new Subject<TooltipConfig>()

export function showTooltip(options: TooltipConfig) {
  tooltip$.next(options)
}

const selector = `tooltip`
const defaultTime = 3000
const defaultAnimationDuration = 800

let tooltipComponent: Tooltip | null
let outAnimation: anime.AnimeInstance | undefined
let cycleComplete = true
let activeTooltip: TooltipConfig
let onComplete: () => void // implement later

const shouldShow$ = tooltip$.pipe(
  switchMap((tooltip) => {
    return timer(0, tooltip.time || defaultTime).pipe(
      map((_, index) => (!index ? tooltip : undefined)),
      take(2),
    )
  }),
  repeat(),
)

const show$ = shouldShow$.pipe(filter((show) => !!show))
const hide$ = shouldShow$.pipe(filter((show) => !show))
const tooltipActive$ = show$.pipe(takeUntil(hide$), endWith(false as const), repeat())

const mousePosition$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(
  auditTime(16),
  map((event) => ({
    x: event.pageX,
    y: event.pageY,
  })),
)

// @TODO re-add oncomplete when needed
const animate$ = show$.pipe(
  filterNullish(),
  switchMap(({ time = defaultTime, animationDuration = defaultAnimationDuration }) =>
    concat(
      timer(0).pipe(mapTo({ type: 'IN', animationDuration })),
      timer(time - animationDuration).pipe(mapTo({ type: 'OUT', animationDuration })),
    ),
  ),
)

animate$.subscribe(({ type, animationDuration }) => {
  if (type === 'IN') {
    initInAnimation(animationDuration)
  } else if (type === 'OUT') {
    initOutAnimation(animationDuration)
  }
})

combineLatest([tooltipActive$, mousePosition$]).subscribe(([tooltip, mousePosition]) => {
  if (!tooltip) {
    return
  }

  if (tooltip !== activeTooltip && !!tooltipComponent) {
    tooltipComponent.$destroy()
    tooltipComponent = null
    activeTooltip = tooltip
  }
  const { title, type, time = defaultTime, TooltipComponent = Tooltip } = tooltip

  if (!tooltipComponent) {
    tooltipComponent = new TooltipComponent({
      props: {
        title,
        type,
        time,
        x: mousePosition.x,
        y: mousePosition.y,
        selector,
      },
      target: document.body,
    })
  } else if (tooltipComponent) {
    tooltipComponent.$set({
      x: mousePosition.x,
      y: mousePosition.y,
    })
  }
})

function initOutAnimation(animationDuration: number) {
  if (outAnimation && !outAnimation.completed) {
    outAnimation.complete = () => {
      if (onComplete) {
        onComplete()
      }
    }
  } else if (cycleComplete && onComplete) {
    onComplete()
  } else {
    outAnimation = anime({
      targets: `.${selector}`,
      translateX: [0, 70],
      opacity: [1, 0],
      easing: 'easeInElastic',
      duration: animationDuration,
      complete: () => {
        outAnimation = undefined
        cycleComplete = true

        if (tooltipComponent) {
          tooltipComponent.$destroy()
          tooltipComponent = null
        }

        if (onComplete) {
          onComplete()
        }
      },
    })
  }
}

function initInAnimation(animationDuration: number) {
  cycleComplete = false

  anime({
    targets: `.${selector}`,
    translateX: [70, 0],
    opacity: [0, 1],
    easing: 'easeOutElastic',
    duration: animationDuration,
  })
}
