
"use client"
import AuthForm from '@/components/AuthForm'
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
        universityId: "",
        universityCard: "",
      }
      }
      onsubmit={() => { }}
    />
  )
}

export default page
