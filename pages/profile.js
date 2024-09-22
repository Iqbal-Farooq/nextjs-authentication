import { redirect } from 'next/dist/server/api-utils';
import UserProfile from '../components/profile/user-profile';
import { getSession } from 'next-auth/react';
import { permanentRedirect } from 'next/navigation';
function ProfilePage() {
  return <UserProfile />;
}
export async function getServerSideProps(context){
  const session= await getSession({req:context.req})
  if(!session){
    return{
      redirect:{
        destination:'/auth',
        permanent : false
      }
    }
  }
  return{
    props:{session}
  }
}
export default ProfilePage;
