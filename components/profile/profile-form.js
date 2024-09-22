import classes from './profile-form.module.css';
import {useRef} from 'react'
function ProfileForm(props) {
  const oldPasswordRef=useRef();
  const newpasswordRef=useRef()
  async function submitHandler(event) {
    event.preventDefault();
    const oldPassword=oldPasswordRef.current.value;
    const newPassword=newpasswordRef.current.value;
    props.onChangePassword({
      oldPassword:oldPassword,
      newPassword:newPassword
    })

  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={oldPasswordRef} type='password' id='new-password' />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input ref={newpasswordRef} type='password' id='old-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
