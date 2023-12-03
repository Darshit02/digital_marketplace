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
import {
  AuthCredantialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useRouter, useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSeller = searchParams.get("as") === "seller";
  const origin = searchParams.get("origin");

  const continueAsSeller = () => {
    router.push("?as=seller");
  };
  const continueAsBuyer = () => {
    router.replace("/sign-in", undefined);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredantialsValidator),
  });

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      toast.success("Signed In Successfully");
      router.refresh();

      if (origin) {
        router.push("/${origin}");
        return;
      }
      if (isSeller) {
        router.push("/sell");
        return;
      }
      router.push("/");
    },
    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid Email or Pasword");
      }
    },
  });

  const onsubmit = ({ email, password }: TAuthCredentialsValidator) => {
    // send the data to the server
    signIn({ email, password });
  };

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="w-20 h-20" />
          <h1 className="text-2xl font-bold">Sign In to your {isSeller ? "seller" : ""} {" "} account</h1>
          <Link
            href="/sign-up"
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5",
            })}
          >
            Don&apos;t have an account? Sign up
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
                {errors?.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
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
                {errors?.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button>Sign In</Button>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>
          {isSeller ? (
            <Button
              onClick={continueAsBuyer}
              variant="secondary"
              disabled={isLoading}
            >
              Continue as Customer
            </Button>
          ) : (
            <Button
              onClick={continueAsSeller}
              variant="secondary"
              disabled={isLoading}
            >
              Continue as Seller
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
