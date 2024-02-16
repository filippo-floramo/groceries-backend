import * as mongoose from 'mongoose'

const connectDB = async () => {
   try {
      if (Bun.env.MONGO_URI !== undefined) {
         const conn = await mongoose.connect(Bun.env.MONGO_URI, {
            autoIndex: true,
         })

         console.log(`MongoDB Connected: ${conn.connection.host}`);
         return conn
      }
   } catch (err: any) {
      console.error(`Error: ${err.message}`)
      process.exit(1);
   }
}





const disconnectDb = async () => {
   await mongoose.disconnect()
}

export { connectDB, disconnectDb }