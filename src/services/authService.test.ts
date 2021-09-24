import mockAxios from 'jest-mock-axios'
import { filter, skip, take } from 'rxjs'
import { querystring$, watchParam } from '../stores/searchParams'
import { token$, login$ } from './authService'
import { notify } from './notificationService'

jest.mock('./apolloService', () => ({
  query: jest.fn().mockReturnValue({ data: { viewer: { login: 'loginName' } } }),
}))
jest.mock('./notificationService', () => ({
  notify: jest.fn(),
}))

afterEach(() => {
  mockAxios.reset()
  clearSearchParams()
})

function setSearchParams(searchString: string) {
  querystring$.next(searchString)
}

function clearSearchParams() {
  querystring$.next('')
}

describe('authService', () => {
  it('Should emit queryParameter from code when searchParam has been set', (done) => {
    expect.assertions(1)

    setSearchParams('code=test')

    const { param$: code$ } = watchParam('code')
    code$.pipe(take(1)).subscribe((code) => {
      expect(code).toBe('test')
      done()
    })
  })

  it('Should retrieve and set a token from the code search parameter', (done) => {
    expect.assertions(2)

    mockAxios.get.mockResolvedValue({ data: { token: 'any-token' } })
    setSearchParams('code=test')

    token$
      .pipe(
        filter((token) => !!token),
        take(1),
      )
      .subscribe((token) => {
        expect(mockAxios.get).toHaveBeenCalled()
        expect(token).toEqual('any-token')
        done()
      })
  })

  it('Should retrieve and set user login from Github after successfully processing a code', (done) => {
    expect.assertions(1)

    mockAxios.get.mockResolvedValue({ data: { token: 'any-token' } })
    setSearchParams('code=test')

    login$
      .pipe(
        filter((login) => !!login),
        take(1),
      )
      .subscribe((login) => {
        expect(login).toEqual('loginName')
        done()
      })
  })

  it('Should notify the user if authentication fails', (done) => {
    expect.assertions(1)

    mockAxios.get.mockResolvedValue({ data: { error: 'bad_code' } })
    setSearchParams('code=test')

    token$
      .pipe(
        skip(1),
        filter((token) => !token),
        take(1),
      )
      .subscribe(() => {
        expect(notify).toHaveBeenCalledWith({
          title: 'Could not authenticate with Github, please try again.',
          type: 'ERROR',
        })
        done()
      })
  })
})
