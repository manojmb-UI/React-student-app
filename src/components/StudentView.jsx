import axios from 'axios'
import  { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function StudentView() {
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')
    const [studentDetails, setStudentDetails] = useState(null)
    function getStudentDetails(id) {
        axios.get(`http://localhost:3030/students/${id}`)
            .then((res) => {
                console.log(res.data)
                setStudentDetails(res.data)
            })
            .catch(() => alert('Failed to load student'))
    }
    useEffect(() => {
        getStudentDetails(id);
    }, [id])
    return (
        <div>
            <div className="container">
                <div className='d-flex align-items-center mb-4 mt-2'>
                    <i class="fa-solid fa-arrow-left cursor-pointer" onClick={() => window.history.back()}></i>
                    <h2 className='ps-3'>Student Details</h2>

                </div>
                <div>
                    {
                        studentDetails && (
                            <div className="row student-view-container">
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="">Student Name</label>
                                    <p>{studentDetails.studentName}</p>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="">Email</label>
                                    <p>{studentDetails.email}</p>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="">Date of Birth</label>
                                    <p>{studentDetails.dob}</p>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="">Class</label>
                                    <p>{studentDetails.class}</p>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="">Roll No</label>
                                    <p>{studentDetails.rollNo}</p>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="">Gender</label>
                                    <p>{studentDetails.gender}</p>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="">Address</label>
                                    <p>{studentDetails.address}</p>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label htmlFor="">Status</label>
                                    <p>{studentDetails.status}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default StudentView