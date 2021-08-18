import { createMachine, assign } from 'xstate'

interface Context {
  users: any[]
}

interface Action {
  type: string
  payload?: string
}

const add = (context: Context, action: Action) => {
  const { users } = context
  return users.includes(action.payload) ? users : [...users, action.payload]
}

const remove = (context: Context, action: Action) => {
  const { users } = context
  return users.filter((user) => user !== action.payload)
}

export const profileMachine = createMachine({
  initial: 'active',
  context: {
    users: [],
  },
  states: {
    active: {
      on: {
        ADD: { actions: assign({ users: add }) },
        REMOVE: { actions: assign({ users: remove }) },
      },
    },
  },
})

// const userService = interpret(counterMachine)
//   .onTransition((state) => console.log(state.context.count))
//   .start()
// // => 0

// userService.send({ type: 'ADD', payload: 'first name' })
// // => 1

// userService.send({ type: 'ADD', payload: 'second name' })
// // => 2

// userService.send({ type: 'REMOVE', payload: 'first name' })
// // => 1
