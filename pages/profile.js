// import UserProfile from '../components/profile/user-profile';
// // import { getSession } from 'next-auth/react';
// import { getServerSession } from "next-auth/next"
// import { authOptions } from './api/auth/[...nextauth]';
// function ProfilePage() {
//   return <UserProfile />;
// }
// export async function getServerSideProps(context){
//   const session= await getServerSession(context.req, context.res, authOptions)
//  console.log('session',session)
//   if(!session){
//     return{
//       redirect:{
//         destination:'/auth',
//         permanent : false
//       }
//     }
//   }
//   return{
//     props:{session}
//   }
// }
// export default ProfilePage;




import UserProfile from '../components/profile/user-profile';
// import { getSession } from 'next-auth/react';
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]';

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }


  const { user } = session;
  const safeUser = {
    ...user,
    name: user.name || null, 
    email: user.email || null,
    image: user.image || null,
  };
  return {
    props: {
      session: {
        ...session,
        user: safeUser, 
      },
    },
  };
}

export default ProfilePage;
