import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'

function StudentList() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([])
    function addStudent() {
        navigate('/studentForm');
    }

    useEffect(() => {
        fetchStudents();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'dob', headerName: 'Date of Birth', width: 100 },
        { field: 'class', headerName: 'Class', width: 100, type: 'number' },
        { field: 'rollNo', headerName: 'Roll No', width: 100, type: 'number' },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <>
                    <IconButton
                        color="primary"
                        onClick={(event) => {
                            event.stopPropagation();
                            handleEdit(params.row.id)
                        }}
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        color="error"
                        onClick={(event) => {
                            event.stopPropagation();
                             handleDelete(params.row.id)
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }

    ]
    function handleEdit(id) {
        navigate(`/studentForm?id=${id}`);
    }

    function handleDelete(id) {
        const isConfirmed = window.confirm(
            'Are you sure you want to delete this student Details?'
        )

        if (!isConfirmed) return

        axios.delete(`http://localhost:3030/students/${id}`)
            .then(() => {
                alert('Student deleted successfully')
                fetchStudents();
            })
            .catch(() => {
                alert('Failed to delete student')
            })
    }


    function fetchStudents() {
        axios.get('http://localhost:3030/students')
            .then((response) => {
                console.log(response.data, "response");
                const mappedRows = response.data.map((student) => ({
                    id: student.id,
                    name: student.studentName,
                    email: student.email,
                    dob: student.dob,
                    class: student.class,
                    rollNo: student.rollNo,
                }))
                setRows(mappedRows)
                console.log(rows, "rows");
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <div className="mb-5">
            <div className='d-flex justify-content-between align-items-center mb-4 mt-2'>
                <h2>Student List</h2>
                <button className='btn btn-dark' onClick={addStudent}>Add Student</button>
            </div>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 }
                    }
                }}
                onRowClick={(params) => {
                    navigate(`/studentView?id=${params.row.id}`);
                }}
            />
        </div>

    )
}

export default StudentList