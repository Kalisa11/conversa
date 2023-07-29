"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { signIn, useSession } from "next-auth/react";
import Button from "@/app/components/Button";
import Input from "@/app/components/Inputs/Input";
import SocialAuth from "./SocialAuth";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/users");
    }
    console.log("unauthenticated", session);
  }, [session, router]);

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
    if (variant === "LOGIN") {
      // next-auth sign in
      signIn("credentials", { redirect: false, ...data })
        .then((res) => {
          if (res?.error) {
            toast.error(res?.error);
          }
          if (res?.ok && !res?.error) {
            toast.success("Login Success");
            router.push("/users");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (variant === "REGISTER") {
      // next-auth sign up
      toast.promise(
        axios
          .post("/api/register", data)
          .then((res) => {
            signIn("credentials", data);
          })
          .catch((err) => {
            toast.error(err.message);
          })
          .finally(() => {
            setIsLoading(false);
          }),
        {
          loading: "Registering user...",
          success: "User registered successfully",
          error: "Error registering user",
        }
      );
    }
  };

  const socialActions = (provider: string) => {
    setIsLoading(true);
    // next-auth social sign in
    signIn(provider, { redirect: false })
      .then((res) => {
        if (res?.error) {
          toast.error(res?.error);
        }
        if (res?.ok && !res?.error) {
          toast.success("Login Success");
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
