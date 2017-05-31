export default (error) => {
  if (error instanceof Error) {
    alert(`${error.toString()}\n${error.stack}`)
  } else {
    alert(JSON.stringify(error))
  }
}
