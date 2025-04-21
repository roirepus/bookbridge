"use client"
import AuthForm from '@/components/AuthForm'
import { signInSchema } from '@/lib/validations'
import React from 'react'

const page = () => {
  return (
    <AuthForm
      type="signIn"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onsubmit={() => { }}
    />
  )
}

export default page
