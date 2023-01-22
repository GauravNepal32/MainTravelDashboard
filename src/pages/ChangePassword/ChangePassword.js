import React, { useRef, useState } from 'react'
import './ChangePassword.css'
import { useForm } from "react-hook-form";
import { useAuth } from '../../authentication/auth';
import axios from 'axios';

const ChangePassword = () => {
    const token = sessionStorage.getItem('access_token')
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const auth = useAuth();
    const new_password = useRef({});
    new_password.current = watch("new_password", "");
    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${auth.baseURL}/api/change-admin-pass`, { old_password: data.old_password, new_password: data.confirm_password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`

                    }
                }
            )
            response.status === 200 && setSuccessMsg(response.data.msg); setErrMsg('')
        } catch (err) {
            { err.response.status === 403 && setErrMsg(err.response.data.msg); setSuccessMsg('') }
            { err.response.status === 401 && setErrMsg(err.response.data.msg); setSuccessMsg('') }
            { err.response.status === 402 && setErrMsg(err.response.data.msg); setSuccessMsg('') }
            console.log(err)
        }
    }
    return (
        <div className='text-grey'>
            <div className="fs-3 pt-md-5 fw-bold ps-2 text-black">Edit Password</div>
            <div className="edit-pass-container mt-3">
                {errMsg.length > 0 &&
                    <div className="error-display-container">
                        {errMsg}
                    </div>
                }
                {
                    successMsg.length > 0 &&
                    <div className="success-display-container">
                        {successMsg}
                    </div>

                }
                <form className='mt-4' onSubmit={handleSubmit(onSubmit)} action="">
                    <div className="row px-3 mb-3">
                        <label className='px-0' htmlFor="">Old Password</label>
                        <input
                            {...register('old_password', {
                                required: true,
                            })}
                            type="password"
                            className={errors?.old_password ? "form-control border-danger" : "form-control"}
                        />
                        {errors?.old_password?.type === "required" && <p className='mt-1 px-0 mb-0 text-danger'>This field is required</p>}
                        {errors?.old_password?.type === "minLength" && <p className='mt-1 px-0 mb-0 text-danger'>Password length is short</p>}
                    </div>
                    <div className="row px-3 mb-3">
                        <label className='px-0' htmlFor="">New Password</label>
                        <input
                            {...register('new_password', {
                                required: true,
                                minLength: 8,
                            })}
                            type="password"
                            className={errors?.new_password ? "form-control border-danger" : "form-control"} />
                        {errors?.new_password?.type === "required" && <p className='mt-1 px-0 mb-0 px-0 text-danger'>This field is required</p>}
                        {errors?.new_password?.type === "minLength" && <p className='mt-1 px-0 mb-0 text-danger'>Password length is short</p>}

                    </div>
                    <div className="row px-3 mb-3">
                        <label className='px-0' htmlFor="">Confirm Password</label>
                        <input
                            {...register('confirm_password', {
                                required: true,
                                minLength: 8,
                                validate: (val) => {
                                    if (watch('new_password') != val) {
                                        return "Your passwords do no match";
                                    }
                                },
                            })}
                            type="password"
                            className={errors?.confirm_password ? "form-control border-danger" : "form-control"} />
                        {errors?.confirm_password?.type === "required" && <p className='mt-1 px-0 mb-0 px-0 text-danger'>This field is required</p>}
                        {errors?.confirm_password?.type === "minLength" && <p className='mt-1 px-0 mb-0 text-danger'>Password length is short</p>}
                        {errors?.confirm_password?.type === "validate" && <p className='mt-1 px-0 mb-0 text-danger'>Password does not match</p>}
                    </div>
                    <div className="row px-3 d-flex justify-content-center mt-3">
                        <button className='btn btn-primary w-auto'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword