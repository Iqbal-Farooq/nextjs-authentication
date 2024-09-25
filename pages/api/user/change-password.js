import { getServerSession } from "next-auth/next";
import connectToDatabase from "../../../ib/db";
import { hashPassword, verifyPassword } from "../../../ib/auth";
import { authOptions } from "../auth/[...nextauth]";
async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const session = await getServerSession(req,res,authOptions);
  if (!session) {
    return res.status(401).json({ message: "unAuthorized Request" });
  }
  const userEmail = session.user.email;
  const { oldPassword, newPassword } = req.body;
  const client = await connectToDatabase();
  const usersCollection = client.db().collection('users');
  const user = await usersCollection.findOne({ email: userEmail });
  if (!user) {
    client.close();
    return res.status(404).json({ message: 'User Not Found' });
  }
  const currentPassword = user.password;
  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword); 
  if (!passwordsAreEqual) {
    client.close();
    return res.status(403).json({ message: "You are authenticated but not authorized" });
  }
  const hashedPassword = await hashPassword(newPassword); 
  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  ); 
  client.close();
  return res.status(200).json({ message: "Password updated",status:200 });
}

export default handler;
