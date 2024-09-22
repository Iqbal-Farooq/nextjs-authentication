import connectToDatabase from "../../../ib/db";
import { hashPassword } from "../../../ib/auth";
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password } = data;
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 6
    ) {
      return res
        .status(422)
        .json({ message: "Invalid user Inputs ", status: 422 });
    }
    const client = await connectToDatabase();
    const db = client.db();
    const existingUser=await db.collection('users').findOne({email:email})
    if(existingUser){
       res.status(422).json({mesage:"USER ALREADY EXIST "})
      client.close()
      return;
      }
    const hashedPassword = await hashPassword(password);
    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
    });
    res.status(200).json({ message: "User Created Successfully!" });
    client.close()
  }
}
export default handler;
