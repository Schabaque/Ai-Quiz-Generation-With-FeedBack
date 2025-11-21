import Input from './Input';
import {FaSave} from 'react-icons/fa'

const UserSettings = () => {
  return (
    <div className="col mt-3">
        <div className="card shadow mb-3">
            <div className="card-header py-3">
                <p className="text-primary m-0 fw-bold">User Settings</p>
            </div>
            <div className="card-body">
                <form action="/" id="profile_settings">
                    <div className="row">
                        <Input id="Nom" label="Username" placeholder="Enter Your Name" type="text"/>
                        <Input id="Prenom" label="First Name" placeholder="Enter Your First Name" type="text"/>
                        <Input id="Email" label="Email" placeholder="Enter Your Email" type="email"/>
                        <Input id="Tél" label="Phone" placeholder="Your Phone 06xxxxxxxx" type="tel"/>
                    </div>
                    <div className="mb-3"><button className="btn btn-primary btn-sm" type="submit"><FaSave/>&nbsp;Save</button></div>
                </form>
            </div>
        </div>
    </div>
  );
}

export default UserSettings