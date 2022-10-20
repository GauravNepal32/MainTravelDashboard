import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../authentication/auth';
const FAQ = () => {
    const [allFAQ, setAllFAQ] = useState();
    const [renderApp, setRenderApp] = useState(false)
    const role = JSON.parse(sessionStorage.getItem('userDetails'))
    const auth = useAuth();
    const loadData = async () => {
        axios.get(`${auth.baseURL}/api/get-faqs`).then((result) => {
            setAllFAQ(result.data.data)
            setRenderApp(true)
        }).catch((err) => {
            console.log(err)
        })
    }


    const token = sessionStorage.getItem('access_token')
    useEffect(() => {
        loadData();
    }, [allFAQ])

    const truncate = (str, max, suffix) => str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;

    const deleteFAQ = async (id) => {
        const response = await axios.delete(`${auth.baseURL}/api/delete-faq/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    role: `${role.role}`,
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
                <h2 className='page-heading p-4'>FAQ</h2>
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
                    <Link to="/add-faq" className='btn my-4 add-btn'>Add FAQ</Link>
                </div>
                <div className="main-container">
                    <table class="table">
                        <thead class="table-dark">
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allFAQ.map((faq) => (
                                <tr key={faq.id}>
                                    <td>{faq.title}</td>
                                    <td><div className='backend-small-text' dangerouslySetInnerHTML={{ __html: `${truncate(faq.description, 70, '...')}` }}></div></td>
                                    <td>
                                        <Link to={`/edit-faq/${faq.id}`} className='btn view-btn'>
                                            Edit
                                        </Link>
                                        <button onClick={() => { deleteFAQ(faq.id) }} className='btn delete-btn ms-3'>
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

export default FAQ;