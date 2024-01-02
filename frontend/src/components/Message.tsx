import React from 'react'
import { Alert } from 'react-bootstrap'

type MessageProps = {
    variant: string;
    children: React.ReactNode;
  } 

const Message = (
    { variant = 'info', children } : MessageProps): React.JSX.Element => {
  return (
    <Alert variant={variant}>{children}</Alert>
  )
}

export default Message