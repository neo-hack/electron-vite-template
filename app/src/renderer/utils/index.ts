export const log = (msg: any) => {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
  console.log(msg)
}
