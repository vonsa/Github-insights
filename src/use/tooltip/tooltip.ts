import { fromEvent, Observable, timer, combineLatest, concat } from 'rxjs'
import { auditTime, filter, map, mapTo, repeat, switchMap, take, takeUntil } from 'rxjs/operators'
import anime from 'animejs'
import Tooltip from './TooltipFromAction.svelte'

export function tooltip(
  node: HTMLElement,
  {
    getEvent,
    title,
    time = 3000,
    animationDuration = 800,
  }: {
    getEvent: (node: HTMLElement) => Observable<any>
    title: string
    time?: number
    animationDuration?: number
  },
) {
  const event$ = getEvent(node)
  const selector = 'tooltip'

  let tooltipComponent: Tooltip | null
  let outAnimation: anime.AnimeInstance | undefined
  let destroying = false
  let cycleComplete = true

  const shouldShow$ = event$.pipe(
    switchMap(() => {
      return timer(0, time).pipe(
        map((_, index) => !index),
        take(2),
      )
    }),
    repeat(),
  )

  const show$ = shouldShow$.pipe(filter((show) => !!show))
  const hide$ = shouldShow$.pipe(filter((show) => !show))

  const mousePosition$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(
    auditTime(16),
    map((event) => ({
      x: event.pageX,
      y: event.pageY,
    })),
  )

  const tooltipActive$ = combineLatest([show$, mousePosition$]).pipe(
    takeUntil(hide$),
    map(([, mousePosition]) => mousePosition),
    repeat(),
  )

  const animate$ = show$.pipe(
    switchMap(() =>
      concat(timer(0).pipe(mapTo('IN')), timer(time - animationDuration).pipe(mapTo('OUT'))),
    ),
  )

  const animationSubscription = animate$.subscribe((animate) => {
    if (animate === 'IN') {
      initInAnimation()
    } else if (animate === 'OUT' && !destroying) {
      initOutAnimation()
    }
  })

  const tooltipSubscription = tooltipActive$.subscribe((mousePosition) => {
    if (!tooltipComponent) {
      tooltipComponent = new Tooltip({
        props: {
          title,
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

  function initOutAnimation(onComplete?: () => void) {
    if (outAnimation && !outAnimation.completed) {
      outAnimation.complete = () => {
        if (onComplete) {
          onComplete()
        }

        if (outAnimation?.complete) {
          outAnimation.complete(outAnimation)
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

          if (onComplete) {
            onComplete()
          }
        },
      })
    }
  }

  function initInAnimation() {
    cycleComplete = false

    anime({
      targets: `.${selector}`,
      translateX: [70, 0],
      opacity: [0, 1],
      easing: 'easeOutElastic',
      duration: animationDuration,
    })
  }

  return {
    destroy() {
      destroying = true

      initOutAnimation(() => {
        if (tooltipComponent) {
          tooltipComponent.$destroy()
          tooltipComponent = null
        }
        tooltipSubscription.unsubscribe()
        animationSubscription.unsubscribe()
      })
    },
  }
}
