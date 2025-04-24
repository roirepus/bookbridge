
"use client"
import AuthForm from '@/components/AuthForm'
import { signUp } from '@/lib/actions/auth'
import { signUpSchema } from '@/lib/validations'
import React from 'react'

const page = () => {
  return (

    <AuthForm
      type="signUp"
      schema={signUpSchema}
      defaultValues={{
        email: "",
        password: "",
        fullName: "",
        universityId: {},
        universityCard: "",
      }
      }
      onSubmit={signUp}
    />
  )
}

export default page
