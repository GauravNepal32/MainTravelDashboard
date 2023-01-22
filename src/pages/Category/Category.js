import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../authentication/auth';
import Loading from '../Loading/Loading';
const Category = () => {
    const [allCategory, setAllCategory] = useState();
    const [renderApp, setRenderApp] = useState(false)
    const role = JSON.parse(sessionStorage.getItem('userDetails'))
    const auth = useAuth();
    const loadData = async () => {
        axios.get(`${auth.baseURL}/api/get-category`).then((result) => {
            setAllCategory(result.data.data)
            setRenderApp(true)
        }).catch((err) => {
            console.log(err)
        })
    }


    const token = sessionStorage.getItem('access_token')
    useEffect(() => {
        loadData();
    }, [])


    const deleteCategory = async (id) => {
        const response = await axios.delete(`${auth.baseURL}/api/delete-category/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        if (response.status === 200) {
            toast.success("Category Deleted Successfully")
            setTimeout(() => { loadData() }, 500)

        } else {
            toast.error("Category Deleted UnSuccessfully")
            setTimeout(() => { loadData() }, 500)
        }
    }

    return (
        <div className=''>
            {renderApp ? <>
                <h2 className='page-heading p-4'>Category</h2>
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
                    <Link to="/add-Category" className='btn my-4 add-btn'>Add Category</Link>
                </div>
                <div className="main-container">
                    <table class="table">
                        <thead class="table-dark">
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Icon</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allCategory.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.name}</td>
                                    <td>
                                        <img width={30} height={30} src={`data:image/svg+xml;utf8,${category.icon}`} />

                                    </td>
                                    <td>
                                        <Link to={`/edit-Category/${category.id}`} className='btn view-btn'>
                                            Edit
                                        </Link>
                                        <button onClick={() => { deleteCategory(category.id) }} className='btn delete-btn ms-3'>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
                :
                <Loading />
            }

        </div>
    )
}

export default Category;