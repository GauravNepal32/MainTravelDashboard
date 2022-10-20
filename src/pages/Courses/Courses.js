import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../authentication/auth';
export const Courses = () => {
    const [allCourses, setAllCourses] = useState();
    const [renderApp, setRenderApp] = useState(false)
    const auth = useAuth();
    const loadData = async () => {
        axios.get(`${auth.baseURL}/api/get-courses`).then((result) => {
            setAllCourses(result.data.data)
            setRenderApp(true)
        }).catch((err) => {
            console.log(err)
        })
    }


    const token = sessionStorage.getItem('access_token')
    useEffect(() => {
        loadData();
    }, [allCourses])

    const truncate = (str, max, suffix) => str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;

    const deleteContact = async (id) => {
        const response = await axios.delete(`${auth.baseURL}/api/delete-courses/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log(response)
        if (response.status === 200) {
            toast.success("Courses Deleted Successfully")
            setTimeout(() => { loadData() }, 500)

        } else {
            toast.error("Courses Deleted UnSuccessfully")
            setTimeout(() => { loadData() }, 500)
        }
    }

    return (
        <div className=''>
            {renderApp && <>
                <h2 className='page-heading p-4'>Courses</h2>
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
                <div className="text-end">
                    <Link to="/add-courses" className='btn my-4 add-btn'>Add Courses</Link>
                </div>
                <div className="main-container">
                    <table class="table">
                        <thead class="table-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Image</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allCourses.map((course) => (
                                <tr key={course.id}>
                                    <td>{course.name}</td>
                                    <td><div className='backend-small-text' dangerouslySetInnerHTML={{ __html: `${truncate(course.description, 70, '...')}` }}></div></td>
                                    <td><a target="_blank" href={`${course.image}`}>
                                        <img width={50} src={`${course.image}`} />
                                    </a></td>
                                    <td>
                                        <Link to={`/edit-courses/${course.id}`} className='btn view-btn'>
                                            Edit
                                        </Link>
                                        <button onClick={() => { deleteContact(course.id) }} className='btn delete-btn ms-3'>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>}

        </div>
    )
}
