import { Env } from "bun";

export const checkEnv = (env: string | undefined) => {

   if (env === undefined) {
      throw new Error("Env not found, did you spell it right?");
   }
   return env
}