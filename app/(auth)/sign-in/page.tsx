"use client"
import AuthForm from '@/components/AuthForm'
import { signInWithCreds } from '@/lib/actions/auth'
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
      onSubmit={signInWithCreds}
    />
  )
}

export default page
