import React from "react"
import "./button.css"

export function Button({ children, variant = "default", ...props }) {
  return (
    <button className={`btn ${variant}`} {...props}>
      {children}
    </button>
  )
}
