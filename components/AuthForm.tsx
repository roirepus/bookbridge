"use client"
import { fieldNames, fieldTypes } from "@/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, SubmitHandler, useForm, UseFormReturn } from "react-hook-form"
import { z, ZodType } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import ImageUpload from "./ImageUpload"
interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean, error?: string }>;
  type: "signIn" | "signUp"
}
const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,

}: Props<T>) => {
  const isSignIn = type === "signIn"
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,

  })
  const handleSubmit: SubmitHandler<T> = async (data) => { }
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "Welcome back to BookBridge" : "Create your library account"}
      </h1>
      <p className="text-light-100">
        {isSignIn ? "Access the vast collection of resources, and stay updated" : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">
          {Object.keys(defaultValues).map((field) => (

            <FormField key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{fieldNames[field.name]}
                  </FormLabel>
                  <FormControl>

                    {field.name === "universityCard" ? <ImageUpload onFileChange={field.onChange} /> :
                      <Input required type={
                        fieldTypes[field.name as keyof typeof fieldTypes]
                      }
                        className="form-input"
                        {...field} />
                    }

                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="form-btn">{isSignIn ? "Sign In" : "Sign Up"}</Button>
        </form>
      </Form>
      <p className="text-center text-base font-medium">
        {isSignIn ? "New to BookBridge? " : "Already have an account? "}
        <Link href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary"
        >{isSignIn ? "Create an account" : "Sign in"}</Link>
      </p>
    </div>
  )
}

export default AuthForm
