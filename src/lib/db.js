export async function ConnectDB() {
    try {
      const connection = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database connected:", connection.connection.host);
    } catch (error) {
      console.error("Database connection error:", error.message);
      throw new Error("Failed to connect to database");
    }
  }
