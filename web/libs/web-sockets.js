import io from 'socket.io-client'

let STRAPI_ENDPOINT

if (process.env.NODE_ENV !== 'production') {
  STRAPI_ENDPOINT = 'http://localhost:1337'
} else {
  STRAPI_ENDPOINT = process.env.NEXT_PUBLIC_API_URL
}

export const socket = io(STRAPI_ENDPOINT, { multiplex: false })
