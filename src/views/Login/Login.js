import React from 'react';
import './Login.css'; 

function Login() {
  return (
    <div className="container" style={{ position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)', msTransform: 'translateY(-50%)', MozTransform: 'translateY(-50%)', WebkitTransform: 'translateY(-50%)', OTransform: 'translateY(-50%)' }}>
        <div className="row justify-content-center">
            <div className="col-md-10 col-lg-9 col-xl-9 col-xxl-7">
                <div className="card shadow-lg o-hidden border-0 my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h4 className="text-dark mb-4">Welcome Back!</h4>
                                    </div>
                                    <form className="user">
                                        <div className="mb-3">
                                            <input className="form-control form-control-user" type="email" id="email" aria-describedby="emailHelp" placeholder="Enter Email Address" name="email" required />
                                        </div>
                                        <div className="mb-3">
                                            <input className="form-control form-control-user" type="password" placeholder="Password" name="password" required />
                                        </div>
                                        <div className="row mb-3">
                                            <p id="errorMsg" className="text-danger" style={{ display: 'none' }}>Paragraph</p>
                                        </div>
                                        <button className="btn btn-primary d-block btn-user w-100" id="submitBtn" type="submit">Login</button>
                                        <hr />
                                    </form>
                                    <div className="text-center"><a className="small" href="forgot-password.html">Forgot Password?</a></div>
                                    <div className="text-center"><a className="small" href="register.html">Create an Account!</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Login;