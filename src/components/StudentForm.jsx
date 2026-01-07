import axios from "axios";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function StudentForm() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3030/students/${id}`)
        .then((res) => {
          reset(res.data)
        })
        .catch(() => alert('Failed to load student'))
    }
  }, [id])



  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
  const handleStudentSubmit = async (data) => {
    try {
      if (id) {
        await axios.put(`http://localhost:3030/students/${id}`, data)
        alert('Student Updated Successfully')
        navigate('/studentList')
      } else {
        await axios.post('http://localhost:3030/students', data)
        alert('Student Added Successfully')
        navigate('/studentList')
      }
    } catch (error) {
      console.error('Student save error:', error)

      if (error.response) {
        alert(error.response.data?.message || 'Server error occurred')
      } else if (error.request) {
        alert('Network error. Please check your connection.')
      } else {
        alert('Something went wrong. Please try again.')
      }
    }
  }

  return (
    <div className="container">
      <div className='d-flex align-items-center mb-4 mt-2'>
        <i class="fa-solid fa-arrow-left cursor-pointer" onClick={() => window.history.back()}></i>
        <h2 className='ps-3'>Student Details</h2>

      </div>
      <form className="student_form p-0">
        {/* Row 1 */}
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>Student Name</label>
              <input
                {
                ...register('studentName', {
                  required: 'Student Name is required',
                  minLength: {
                    value: 3,
                    message: 'Student Name must be at least 3 characters long'
                  }
                })
                }
                type="text"
                className="form-control"
                placeholder="Enter name"
              />
              {
                errors.studentName && (
                  <div className="text-danger pt-1">{errors.studentName.message}</div>
                )
              }
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label>Email</label>
              <input
                {
                ...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email format'
                  }
                })
                }
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
              {
                errors.email && (
                  <div className="text-danger pt-1">{errors.email.message}</div>
                )
              }
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label>Phone Number</label>
              <input
                {
                ...register('phoneNumber', {
                  required: 'Phone Number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Invalid phone number format'
                  }
                })
                }
                type="text"
                className="form-control"
                placeholder="Enter phone"
              />
              {
                errors.phoneNumber && (
                  <div className="text-danger pt-1">{errors.phoneNumber.message}</div>
                )
              }
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>Class</label>
              <select
                {
                ...register('class', {
                  required: 'Class is required'
                })
                }
                className="form-control"
                placeholder="Enter class"
              >
                <option value="">Select Class</option>
                <option value="XII">XII</option>
                <option value="XI">XI</option>
                <option value="X">X</option>
                <option value="IX">IX</option>
                <option value="VIII">VIII</option>
                <option value="VII">VII</option>
                <option value="VI">VI</option>
              </select>
              {errors.class && (
                <div className="text-danger pt-1">{errors.class.message}</div>
              )
              }
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label>Roll No</label>
              <input
                {
                ...register('rollNo', {
                  required: 'Roll No is required'
                })
                }
                type="text"
                className="form-control"
                placeholder="Enter roll number"
              />
              {errors.rollNo && (
                <div className="text-danger pt-1">{errors.rollNo.message}</div>
              )
              }
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label>Gender</label>
              <select className="form-control"
                {
                ...register('gender', {
                  required: 'Gender is required'
                })
                }
              >
                <option>Select</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              {errors.gender && (
                <div className="text-danger pt-1">{errors.gender.message}</div>
              )
              }
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" className="form-control" placeholder="Enter DOB"
                {...register('dob', {
                  required: 'Date of Birth is required'
                })
                }
              />
              {errors.dob && (
                <div className="text-danger pt-1">{errors.dob.message}</div>
              )
              }
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label>Address</label>
              <input
                {
                ...register('address', {
                  required: 'Address is required'
                })
                }
                type="text"
                className="form-control"
                placeholder="Enter address"
              />
              {errors.address && (
                <div className="text-danger pt-1">{errors.address.message}</div>
              )
              }
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label>Status</label>
              <select className="form-control"
                {...register('status', {
                  required: 'Status is required'
                })
                }
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
              {errors.status && (
                <div className="text-danger pt-1">{errors.status.message}</div>
              )
              }
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-end'>
          <button type="submit" className="btn btn-dark" disabled={!isValid} onClick={handleSubmit(handleStudentSubmit)}>
            {id ? 'Update Student' : 'Save Student'}
          </button>
        </div>

      </form>
    </div>
  );
}

export default StudentForm;
