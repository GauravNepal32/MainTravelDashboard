import axios from 'axios';
import React, { useState } from 'react'
import './login.css'
import { useAuth } from '../../authentication/auth';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState("");
    const auth = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const handleLogin = async (e) => {
        setErrMsg('');
        setSuccess('')
        e.preventDefault();
        const email = document.getElementById('exampleInputEmail1').value;
        const password = document.getElementById('exampleInputPassword1').value;
        setLoading(true)
        try {
            const response = await axios.post(`${auth.baseURL}/api/login`, { email, password });
            console.log(response)
            if (response.status === 200) {
                setSuccess(response.data.msg)
                auth.login(response.data)
                sessionStorage.setItem("access_token", response.data.token)
                sessionStorage.setItem('userDetails', JSON.stringify(response.data.user))
                setLoading(false)
                navigate("/");

            }
        } catch (err) {
            setLoading(false)
            setErrMsg(err.response.data.msg)
        }
    }
    return (
        <>
            <div className='d-flex justify-content-center'>
                <div className="login-container p-4 mt-5 rounded">
                    <h5 className='text-center'>LOG IN</h5>
                    <form onSubmit={handleLogin} className='mt-5'>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="err-container text-danger">{errMsg}</div>
                        <div className="success-container">{success}</div>
                        <div className="d-flex justify-content-center">
                            {loading ?
                                <button class="btn login-btn" type="button" disabled>
                                    <span class="spinner-border spinner-border-sm me-3" role="status" aria-hidden="true"></span>
                                    Loading...
                                </button>

                                :
                            <button type="submit" class="btn login-btn mt-4 mx-auto">LOG IN</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
            <div className="copy-right-container text-center mt-5">
                A product of Elscript Technology Pvt Ltd
            </div>
        </>
    )
}

export default Login