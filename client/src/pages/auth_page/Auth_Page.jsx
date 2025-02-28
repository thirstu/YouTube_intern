import React from 'react'

const Auth_Page = () => {
  return (
    <div className='auth_page_container'>
      {/* <div className="entry_container">
        <button>Sign up</button>
        <button>Login</button>

      </div> */}
      <div className="login_container">
        <h1>YouTube</h1>
        <h3>Login to your account</h3>
        <div className="auto_login_btns">
          <button>Facebook</button>
          <button>Google</button>
        </div>
        <input type="email" />
        <input type="password" />

        <h4>Forgot your password?</h4>

        <button>Login</button>

        <div><span>Don't have an account?</span>
        <h4>Create an account</h4>
        </div>


      </div>
      <div className="signup_container">
      <h1>YouTube</h1>
        <h3>Create new account</h3>
        <div className="auto_login_btns">
          <button>Facebook</button>
          <button>Google</button>
        </div>
        <input type="text" />
        <input type="email" />
        <input type="password" />

        <h4>Forgot your password?</h4>

        <button>Sign up</button>

        <div><span>Already member?</span>
        <h4>Log in</h4>
        </div>
        <span>By creating an account, you agree to youtube Terms of Service and Privacy Policy</span>

      </div>
      
    </div>
  )
}

export default Auth_Page
