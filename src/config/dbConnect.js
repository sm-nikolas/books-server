import mongoose from "mongoose";

async function dbConnect() {
  mongoose.connect(
    "mongodb+srv://nikolassm-08:Nik-1228@cluster0.kpgq5t0.mongodb.net/livraria?retryWrites=true&w=majority"
  );
  return mongoose.connection;
}

export default dbConnect;
