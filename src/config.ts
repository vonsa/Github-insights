// the purpose of this file is to abstract import.meta.env as it is not well supported. There is a mock APP_CONFIG available

const { BASE_URL } = import.meta.env // exporting import.meta.env before accessing it will return undefined, that's why this hack is implemented

export const APP_CONFIG = { ...import.meta.env, BASE_URL }
