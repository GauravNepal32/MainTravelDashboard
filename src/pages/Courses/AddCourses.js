import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../authentication/auth';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddCourses = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('access_token')
    const auth = useAuth();
    const [value, setValue] = useState('');

    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ color: ['#e6893c', '#2659a5'] }],
            [{ 'align': ['', 'center', 'justify'] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
        ],
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = document.getElementById('courseName').value;
        var description = value;
        description = description.replace(/\'/g, "\''");
        const image = document.getElementById('courseFile').files[0]
        try {
            const response = await axios.post(`${auth.baseURL}/api/add-courses`, { name, description, image },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`
                    }
                })
            if (response.status === 200) {
                console.log(response)
                toast.success('Data Added successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => navigate('/courses'), 500)
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <h2>Add Courses</h2>

            <form encType='multipart/form-data' onSubmit={handleSubmit} action="">
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Course Name</label>
                    <input type="text" class="form-control" id="courseName" placeholder="Courses Name" />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                    <div className="white-background">
                        <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} placeholder="Enter content to be displayed in webpage" />
                    </div>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label me-4">Images: </label>
                    <input type="file" id='courseFile' />
                </div>
                <input className='btn add-btn' type="submit" value={"Add Courses"} />
            </form>
        </div>
    )
}

export default AddCourses