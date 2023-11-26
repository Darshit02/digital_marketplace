import { AuthCredantialsValidator } from "@/lib/validators/account-credentials-validator";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "@/get-payload";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(AuthCredantialsValidator)
    .mutation(async ({input}) => {
      const { email, password } = input;
      const payload = await getPayloadClient();

    //   Check user is Alredy there
    const {docs : users} = await payload.find({
        collection: "users",
        where: {
            email :{
                equals : email,
            }
        }
    })
    if(users.length !== 0) throw new TRPCError({code : "CONFLICT", message : "User Alredy Exists"})
    await payload.create({
        collection : "users",
        data : {
            email,
            password,
        }
    })
    })

})

