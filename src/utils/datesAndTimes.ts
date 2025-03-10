export function formatedDate(dateString:string){
  const date = new Date(dateString)

  // console.log({date})

  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`

}