import React from 'react'

export function getMessageJsx (message: string, id: string) {
  return <span id={id}>{ message }</span>
}
