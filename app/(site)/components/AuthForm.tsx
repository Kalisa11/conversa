"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { signIn } from "next-auth/react";
import Button from "@/app/components/Button";
import Input from "@/app/components/Inputs/Input";
import SocialAuth from "./SocialAuth";
// import { toast } from "react-hot-toast";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "LOGIN" ? "REGISTER" : "LOGIN"));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);
    if (variant === "LOGIN") {
      signIn("credentials", { redirect: false, ...data })
        .then((res) => {
          if (res?.error) {
            // toast.error(res?.error);
            console.log(res?.error);
          }
          if (res?.ok && !res?.error) {
            console.log("success");
            // toast.success("Success");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
      // next-auth sign in
    } else if (variant === "REGISTER") {
      // next-auth sign up
      axios
        .post("/api/register", data)
        .then((res) => {
          console.log("response here", res);
        })
        .catch((err) => {
          console.log("error here", err.message);
          // toast.error(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const socialActions = (provider: string) => {
    setIsLoading(true);
    // next-auth social sign in
    signIn(provider, { redirect: false })
      .then((res) => {
        if (res?.error) {
          // toast.error(res?.error);
          console.log(res?.error);
        }
        if (res?.ok && !res?.error) {
          console.log("Login success");
          // toast.success("Success");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input id="name" label="Name" errors={errors} register={register} />
          )}
          <Input
            id="email"
            label="Email Address"
            type="email"
            required
            errors={errors}
            register={register}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            required
            errors={errors}
            register={register}
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <SocialAuth
              icon={BsGoogle}
              onClick={() => socialActions("google")}
            />
            <SocialAuth
              icon={BsGithub}
              onClick={() => socialActions("github")}
            />
          </div>
        </div>
        <div
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
        >
          <div>
            {variant === "LOGIN"
              ? "New to Conversa?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default AuthForm;
