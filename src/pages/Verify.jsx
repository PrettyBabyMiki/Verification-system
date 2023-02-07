import { useRef, useState, useContext, Fragment, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import { StoreContext, signUp, connectToWallet } from '../utils';
import "./company_dashboard.css";

function Verify() {
  let history = useHistory();
  const ctx = useContext(StoreContext);
  const { state } = ctx;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [accType, setType] = useState('user');
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  useEffect(()=>{
    if(password1 != password2) setError("Password and comfirmation must match!");
    else setError("");
  }, [password1, password2])

  return (
    <div>
      <div className='flex h-screen flex-col justify-center items-center -mt-16'>
        
        <div className='Boarder-black-100 verifyFullBoard w-3/12 border-2 drop-shadow-sm border-solid border-gray-100 rounded-3xl '>
          
          <h2 className='verityDetail p-1 text-center m-3' >Kindly verify your details</h2>

          <h4 className='verifyError form-error text-center' >{error}</h4>          
          <div className='verify mx-auto text-center'>
            
            <form
              className='inline-block p-1 '
              onSubmit={(e) => {
                e.preventDefault();
              }}>
                <div className='flex'>
                  <div className='text-start'>
                    <label className='px-1 py-1'>Enter your mail:</label>
                    <label className='px-1 py-1'>Enter your name:</label>
                    <label className='px-1 py-1 my-1'>Enter password:</label>
                    <label className='px-1 py-1'>Comfirm password:</label>
                    <label className='px-1 py-1 my-2'>Set account type:</label>
                  </div>
                
                  <div className='text-start px-2' >
                    <input
                      placholder='Enter your LinkedIn mail id'
                      type='email'
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      className='w-full border-2 border-solid border-black my-1'
                      required
                    />
                    
                    <input
                      placholder='Enter name'
                      type='text'
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      className='w-full border-2 border-solid border-black my-1'
                      required
                    />

                    <input
                      placeholder='password'
                      type={"password"}
                      value = {password1}
                      onChange = {(e)=> {
                        setPassword1(e.target.value);
                      }}
                      className = "w-full border-2 border-solid border-black my-1"
                      required
                    />
                    <input
                      placeholder='confirm password'
                      type={"password"}
                      value = {password2}
                      onChange = {(e)=> {
                        setPassword2(e.target.value);
                      }}
                      className = "w-full border-2 border-solid border-black my-1"
                      required
                    />
                    <select
                      className='w-full bg-white border-2 border-black rounded-sm my-1'
                      value={accType}
                      onChange={(e) => {
                        setType(e.target.value);
                      }}>
                      <option value='user' className='p-2'>
                        user
                      </option>
                      <option value='company' className='p-2'>
                        company
                      </option>
                    </select>
                  </div>
                </div>
              
              
              <button
                onClick={async () => {
                  
                  if (state.connected) {
                    console.log(email, name, accType);
                    if (await signUp(ctx, email, name, password1, accType))
                      history.push('/');
                    else alert('User already exist!');
                  } else {
                    connectToWallet(ctx);
                  }
                }}
                className='verifyButton bg-gray-900 mx-auto text-white rounded-lg hover:text-white-300 block px-4 py-2 m-2 text-sm'>
                Verify
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Verify;
