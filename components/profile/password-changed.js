import classes from './password-changed.module.css'
import Link from 'next/link'
function PasswordChanged(){
    return<div className={classes.container}>
        <h1>Congrats Your Password Has Been Changed Successfully </h1>
        <Link href='/' className={classes.btn}>Go Home</Link>
    </div>
}
export default PasswordChanged