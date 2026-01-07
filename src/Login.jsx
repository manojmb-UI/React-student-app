import axios from 'axios';
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({ mode: 'onChange' })
    const navigate = useNavigate()
    const handleLogin = (data) => {
        axios.get('http://localhost:3030/users')
            .then((res) => {
                const users = res.data;
                const user = users.find((user) => user.email === data.email && user.password === data.password);
                if (user) {
                    alert('Login Successful')
                    navigate('/dashboard')
                    localStorage.setItem('user', JSON.stringify(user));
                } else {
                    alert('Invalid Credentials')
                    reset();
                }
            })
    }
    return (
        <div
            className="wrapper"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?cs=srgb&dl=pexels-marta-klement-636760-1438072.jpg&fm=jpg')" }}
        >
            <div className="inner">
                <form>
                    <h2 className='mb-3 text-black'>EduTrack</h2>
                    <h6 className='mb-1'>Login Here</h6>
                    <p className='mb-4'>Use your credentials to access your account.</p>

                    <div className="form-wrapper">
                        <label htmlFor=''>Email</label>
                        <input type="text" className="form-control"
                            {...register('email', {
                                required: 'Email is Required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Invalid email format'
                                }
                            })}
                        />
                        {errors.email && (
                            <div className="text-danger pt-1">{errors.email.message}</div>
                        )}
                    </div>

                    <div className="form-wrapper">
                        <label htmlFor='' >Password</label>
                        <input type="password" className="form-control"
                            {...register('password', {
                                required: 'Password is Required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long'
                                }
                            })}
                        />
                        {errors.password && (
                            <div className="text-danger pt-1">{errors.password.message}</div>
                        )}
                    </div>


                    <button type="submit" disabled={!isValid} onClick={handleSubmit(handleLogin)} className='login_btns'>Login</button>
                    <div className='d-flex justify-content-center mt-2'>
                       <span>Don't have an account?  <Link to="/signin">Register Now</Link></span>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login
