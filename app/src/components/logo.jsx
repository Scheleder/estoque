import * as React from "react"
import logoImg from "../assets/logo.png"

function Logo({ className, ...props }) {
  return (
    <img
      src={logoImg}
      alt="Logo"
      className={`h-12 w-auto object-contain ${className || ""}`}
      {...props}
    />
  )
}

export default Logo
