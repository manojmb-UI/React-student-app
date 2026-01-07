import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

function Signin() {
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({ mode: 'onChange' })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const navigate = useNavigate();

    const handleRegister = (e) => {
        const data = {
            firstName: e.firstName,
            lastName: e.lastName,
            email: e.email,
            password: e.password,
            confirmPassword: e.confirmPassword
        }
        console.log(data, 'data')

        axios.post('http://localhost:3030/users', data)
            .then((res) => {
                alert('Registration Successful')
                navigate('/')
            })
            .catch((err) => {
                alert('Registration Failed')
            })
    }

    return (
        <div
            className="wrapper"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?cs=srgb&dl=pexels-marta-klement-636760-1438072.jpg&fm=jpg')" }}
        >
            <div className="inner">
                <form>
                    <div className='d-flex align-items-center mb-5 mt-2'>
                        <i class="fa-solid fa-arrow-left cursor-pointer pe-4" onClick={() => window.history.back()}></i>
                        <h5>Registration Form</h5>
                    </div>
                    

                    <div className="form-group">
                        <div className="form-wrapper">
                            <label>First Name</label>
                            <input type="text" className="form-control"
                                {
                                ...register("firstName", {
                                    required: 'First Name is required',
                                    minLength: {
                                        value: 3,
                                        message: 'First Name must be at least 3 characters'
                                    },
                                    pattern: {
                                        value: /^[A-Za-z]+$/i,
                                        message: 'First Name must contain only letters'
                                    }
                                })
                                }
                            />
                            {errors.firstName && <p className="text-danger pt-1">{errors.firstName.message}</p>}
                        </div>
                        <div className="form-wrapper">
                            <label>Last Name</label>
                            <input type="text" className="form-control"
                                {
                                ...register("lastName", {
                                    required: 'Last Name is required',
                                    minLength: {
                                        value: 3,
                                        message: 'Last Name must be at least 3 characters'
                                    },
                                    pattern: {
                                        value: /^[A-Za-z]+$/i,
                                        message: 'Last Name must contain only letters'
                                    }
                                })
                                }
                            />
                            {errors.lastName && <p className="text-danger pt-1">{errors.lastName.message}</p>}
                        </div>
                    </div>

                    <div className="form-wrapper">
                        <label>Email</label>
                        <input type="text" className="form-control"
                            {
                            ...register("email", {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            })
                            }
                        />
                        {errors.email && <p className="text-danger pt-1">{errors.email.message}</p>}
                    </div>

                    <div className="form-wrapper">
                        <label>Password</label>

                        <div class="input-group mb-3">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className="form-control"
                                {...register("password", {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters'
                                    }
                                })}
                            />

                            <span class="input-group-text" id="basic-addon2">
                                <button
                                    type="button"
                                    className="eye password-eye eye_btns"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </span>
                        </div>


                        {errors.password && <p className="text-danger pt-1">{errors.password.message}</p>}
                    </div>

                    <div className="form-wrapper">
                        <label>Confirm Password</label>
                        <div class="input-group mb-3">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirm-password"
                                className="form-control"
                                {...register("confirmPassword", {
                                    required: 'Confirm Password is required',
                                    validate: (value, formValues) =>
                                        value === formValues.password || 'Passwords do not match'
                                })}
                            />
                            <span class="input-group-text" id="basic-addon2">
                                <button
                                    type="button"
                                    className="eye conform-password-eye eye_btns"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </span>
                        </div>




                        {errors.confirmPassword && <p className="text-danger pt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    <button onClick={handleSubmit(handleRegister)} className='login_btns'>Register Now</button>
                </form>
            </div>
        </div>
    )
}

export default Signin