import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import "./company_dashboard.css";
import { StoreContext, login, connectToWallet, } from '../utils';

function Verify() {
  let history = useHistory();
  const ctx = useContext(StoreContext);
  const { state } = ctx;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e)=> {
    e.preventDefault();

    if(error === ""){
      if (state.connected) {
        if (await login(ctx, email, password))
          history.push('/');
        // else alert('User already exist!');
      } else {
        connectToWallet(ctx);
      }
    }
  }
  return (
    <div>
      <div className='flex h-screen flex-col justify-center items-center -mt-16'>
        
        <div className='Boarder-black-100 verifyFullBoard w-3/12 border-2 drop-shadow-sm border-solid border-gray-100 rounded-3xl '>

          <h4 className='verifyError form-error text-center' >{error}</h4>          
          <div className='verify mx-auto text-center'>
            
            <form
              className='inline-block p-1 '
              onSubmit={submit}>
                <div className='flex'>
                  <div className='text-start'>
                    <label className='px-1 py-1'>Enter your mail:</label>
                    <label className='px-1 py-1 my-1'>Enter password:</label>
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
                      placeholder='password'
                      type={"password"}
                      value = {password}
                      onChange = {(e)=> {
                        setPassword(e.target.value);
                      }}
                      className = "w-full border-2 border-solid border-black my-1"
                      required
                    />
                  </div>
                </div>
             
              
              <button
               
                className='verifyButton bg-gray-900 mx-auto text-white rounded-lg hover:text-white-300 block px-4 py-2 m-2 text-sm'>
                Log In
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
