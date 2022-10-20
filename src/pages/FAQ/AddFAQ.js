import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../authentication/auth';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const AddFAQ = () => {
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
        const title = document.getElementById('faqTitle').value;
        var description = value;
        description = description.replace(/\'/g, "\''");
        try {
            const response = await axios.post(`${auth.baseURL}/api/add-faq`, { title, description },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
            if (response.status === 200) {
                toast.success('Data Added successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => navigate('/faqs'), 1000)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h2>Add FAQ</h2>

            <form onSubmit={handleSubmit} action="">
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
                    <label for="exampleFormControlTextarea1" class="form-label">FAQ Title</label>
                    <input type="text" placeholder="FAQ Heading" class="form-control" id="faqTitle"></input>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">FAQ Description</label>
                    <div className="white-background">
                        <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} placeholder="Enter content to be displayed in webpage" />
                    </div>
                </div>
                <input className='btn add-btn' type="submit" value={"Add FAQ"} />
            </form>
        </div>
    )
}

export default AddFAQ