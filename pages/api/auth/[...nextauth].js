import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; // Update import for credentials provider
import connectToDatabase from "../../../ib/db";
import { verifyPassword } from "../../../ib/auth";

export const authOptions ={
    session: {
        jwt: true, 
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials) {
                const client = await connectToDatabase(); 
                const userCollection = client.db().collection('users');
                
                const user = await userCollection.findOne({ email: credentials.email });
                if (!user) {
                    client.close();
                    throw new Error('No User Found!');
                }

                const isValid = await verifyPassword(credentials.password, user.password);
                if (!isValid) {
                    client.close();
                    throw new Error('Invalid password');
                }

                client.close();
                return { email: user.email }; 
            },
        }),
    ],
};
export default NextAuth(authOptions); 
