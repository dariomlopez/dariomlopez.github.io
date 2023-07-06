import {
  useUser,
} from "@clerk/clerk-react";
import '../App.css';

function User(){
  // Use the useUser hook to get the Clerk.user object
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded || !isSignedIn) {
    return null
  }

  console.log(user)

  return (
  <div className="User">
    <table className="userTable">
      <tr>
        <th>Propiedad</th>
        <th>Dato</th>
      </tr>
      <tr>
        <td>id:</td>
        <td>{user.id}</td>
      </tr>
      <tr>
        <td>username:</td>
        <td>{user.username}</td>
      </tr>
      <tr>
        <td>firstname:</td>
        <td>{user.firstName}</td>
      </tr>
      <tr>
        <td>lastname:</td>
        <td>{user.lastName}</td>
      </tr>
      <tr>
        <td>fullname:</td>
        <td>{user.fullName}</td>
      </tr>
      <tr>
        <td>emails:</td>
        <td>{user.emailAddresses.map( (email) => email.emailAddress )}</td>
      </tr>
      <tr>
        <td>profileImageUrl:</td>
        <td>
          <img src={user.profileImageUrl} width={150} />
          <br/>
          <a href={user.profileImageUrl} target='_blank'>{user.profileImageUrl}</a>
          </td>
      </tr>
    </table>
  </div>
  )
}

export default User;