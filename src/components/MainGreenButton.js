import React from 'react'
import { Button } from '@mui/material'

export default function MainGreenButton(props) {
  return (
    <Button
    onClick={props.function}
    style={{
      borderRadius: 40,
      backgroundColor: "rgb(24, 198, 131)",
      padding: "7px 16px",
      fontSize: "12px",
      boxShadow: "rgb(0 0 0 / 40%) 0px 2px 15px -3px",
      minWidth: "150px",
      color: "white",
    }}
  >{props.text}
  </Button>
  )
}
