import mongoose from "mongoose";


export const connectDb = async () => {
    try {
        console.log("ENV MONGO_DB_URL:", process.env.MONGO_DB_URL); // Debugging

        const { connection } = await mongoose.connect(process.env.MONGO_DB_URL, {
            dbName: "work_manager",
        });

        console.log("db connected...");
        console.log(connection);


        // testing and creating new user


    //    const user = new User({ 
    //         name:"test name",
    //         email:"test@gmail.com",
    //         password:"testPassword",
    //         about:"this is testing"
    //     })

    //    await user.save();

    //    console.log("user is created");
       

    } catch (error) {
        console.log("failed to connect to db");
        console.log(error);
    }
};
