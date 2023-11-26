"use client";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthCredantialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";


const page = () => {
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredantialsValidator),
  });
  const {mutate , isLoading} = trpc.auth.createPayloadUser.useMutation({

  })
  

  const onsubmit = ({ email, password }: TAuthCredentialsValidator) => {
    // send the data to the server
    mutate({email,password})
  };

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="w-20 h-20" />
          <h1 className="text-2xl font-bold">Create an account</h1>
          <Link
            href="/sign-in"
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5",
            })}
          >
            Alredy have an account? Sign in
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid gap-6">
          <form action="" onSubmit={handleSubmit(onsubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1 py-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  className={cn({ "focus-visible:ring-red-500": errors.email })}
                  placeholder="you@examloe.com"
                />
              </div>
              <div className="grid gap-1 py-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password")}
                  type="password"
                  className={cn({
                    "focus-visible:ring-red-500": errors.password,
                  })}
                  placeholder="Password"
                />
              </div>
              <Button>Sign Up</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
