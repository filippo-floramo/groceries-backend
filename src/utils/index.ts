import ShortUniqueId from 'short-unique-id';
const uid = new ShortUniqueId({length: 8});

export const checkEnv = (env: string | undefined) => {
   if (env === undefined) {
      throw new Error("Env not found, did you spell it right?");
   }
   return env
}

export const getShortRandomUniqueId = () => {
   return uid.rnd()
}