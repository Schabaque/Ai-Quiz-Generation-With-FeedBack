import {Button} from "./components"
import {FaGofore, FaSignInAlt} from 'react-icons/fa'
import { useState } from "react"
import {Link} from 'react-router-dom'
import { useDispatch} from "react-redux"
import { Registre } from "../../redux/apiCalls/authApiCall"
import {toast} from 'react-toastify'

const Signin = () => {

  const [firstname, setFirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmailregistre] = useState("");
  const [tel, setTelregistre] = useState("");
  const [password, setPassregistre] = useState("");
  const [password_repeat, setpassword_repeat] = useState("");
  const [error, setError] = useState(false);
  const [role, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const dispatch = useDispatch();
  const formRegister = (e) => {
    e.preventDefault();
    if (firstname.trim() === "") return toast.error("First Name is required");
    if (lastname.trim() === "") return toast.error("Last Name is required");
    if (email.trim() === "") return toast.error("Email is required");
    if (tel.trim() === "") return toast.error("Phone Number is required");
    if (password.trim() === "") return toast.error("Password is required");
    if (role.trim() === "") return toast.error("Please select your account type");
    if (password.trim() !== password_repeat.trim()) {
        setError(true); // Set the error state to true if passwords don't match
        return;
      }
      dispatch(Registre({firstname,lastname,email,tel, password,role}));
  };


  return (
    <div id="Signin" className="tab-pane fade show" role="tabpanel" aria-labelledby="Signin-tab">
      <div className="row">
            <div className="col-lg-5 d-none d-lg-flex">
                <div className="flex-grow-1 bg-sigin-image"></div>
            </div>
          <div className="col-lg-7">
              <div className="p-5">
                <div className="text-center">
                    <h4 className="text-dark mb-4">Register!</h4>
                </div>
                    <form className="user" onSubmit={formRegister}>
                        <div className="row">
                            <div className="col-sm-6 mb-3">
                                <input className="form-control form-control-user" 
                                        type="text"  
                                        placeholder="Your First Name:"
                                        onChange={(e) => setFirstname(e.target.value)}
                                        value={firstname} 
                                        required
                                />
                            </div>
                            <div className="col-sm-6 mb-3">
                                <input className="form-control form-control-user" 
                                        type="text"  
                                        placeholder="Your Last Name:"
                                        onChange={(e) => setlastname(e.target.value)}
                                        value={lastname} 
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                                <input className="form-control form-control-user" 
                                        type="email"  
                                        placeholder="Your Email:"
                                        onChange={(e) => setEmailregistre(e.target.value)}
                                        value={email}
                                />
                        </div>
                        <div className="mb-3">
                                <input className="form-control form-control-user" 
                                        type="tel"  
                                        placeholder="Your Phone Number:" 
                                        onChange={(e) => setTelregistre(e.target.value)}
                                        value={tel} 
                                />
                        </div>
                        <div className="mb-3">
                                <input className={error ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'} 
                                        type="password"  
                                        placeholder="Your Password:"
                                        onChange={(e) => setPassregistre(e.target.value)}
                                        value={password} 
                                />
                        </div>
                        <div className="mb-3">
                                <input className={error ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'}
                                        id="password_repeat"
                                        type="password"  
                                        placeholder="Confirm Your Password:" 
                                        onChange={(e) => { 
                                            setpassword_repeat(e.target.value); 
                                            setError(false);
                                        }
                                        }
                                        value={password_repeat} 
                                />
                                <div className="invalid-feedback"> 
                                        The two passwords do not match
                                </div>
                        </div>
                        <div className="mb-3 d-flex justify-content-around">
                        <div class="form-check form-check-inline">
                            
                            <label class="form-check-label" for="inlineRadio1">You are?</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" 
                                    type="radio" 
                                    name="inlineRadioOptions" 
                                    id="inlineRadio1" 
                                    value="prof"
                                    // checked={role === 'prof'}
                                    onChange={handleOptionChange}
                                />
                            <label class="form-check-label" for="inlineRadio1">Professor</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" 
                                    type="radio" 
                                    name="inlineRadioOptions" 
                                    id="inlineRadio2" 
                                    value="etudiant"
                                    // checked={role === 'etudiant'}
                                    onChange={handleOptionChange}/>
                            <label class="form-check-label" for="inlineRadio2">Student</label>
                        </div>
                        </div>
                        <div className="mb-3">
                            <div className="row">
                                <Button id="btn_inscrire" text="Register">
                                    <FaSignInAlt />
                                </Button>
                                <div className="col-sm-12 col-md-6 mt-2">
                                    <button className={`btn d-block btn-user w-100  btn-outline-danger`} onClick={()=>toast.info("This feature is not available at the moment")} type="button" >
                                         <FaGofore />&nbsp;Continue with Google
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr/>
                    </form>
                    <div className="text-center">
                        Already have an account? <Link to="/auth">Sign In</Link> 
                    </div>
                </div>
            </div>
            
      </div>
    </div>
  
  )
}

export default Signin