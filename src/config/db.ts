import * as mongoose from 'mongoose'
import { checkEnv } from '../utils';


const getDbURI = () => {
   if (checkEnv(Bun.env.ENVIRONMENT) === 'production') {
      const cluster = checkEnv(Bun.env.MONGO_CLUSTER)
      const username = checkEnv(Bun.env.MONGO_USERNAME);
      const password = encodeURIComponent(checkEnv(Bun.env.MONGO_PASS));
      return `mongodb+srv://${username}:${password}@${cluster}/anm_ktm?retryWrites=true&w=majority`
   }
   return "mongodb://localhost:27017"
}


const connectDB = async () => {
   try {
      const dbURI = getDbURI();
      const { connection } = await mongoose.connect(dbURI, {
         autoIndex: true,
         dbName: 'anm_ktm'
      })
      console.log(`MongoDB Connected: ${connection.host} on port ${connection.port}`);
   } catch (err: any) {
      console.error(`Error: ${err.message}`)
      process.exit(1);
   }
}





const disconnectDb = async () => {
   await mongoose.disconnect()
}

export { connectDB, disconnectDb }