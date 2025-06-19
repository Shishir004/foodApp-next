'use client'
import classes from './error.module.css'
import React from 'react'

export default function Error({error}){
  return(
    <>
      <h1 className={classes.header}>Something went wrong</h1>
      <h4 className={classes.paragragh}>Failed to upload meals</h4>
    </>
  )
}