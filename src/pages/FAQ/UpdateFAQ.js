import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../authentication/auth';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const UpdateFAQ = () => {
    const id = useParams().id;
    const navigate = useNavigate();
    const [faqData, setFaqData] = useState();
    const [renderApp, setRenderApp] = useState(false)
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

    const loadData = async () => {
        try {
            const response = await axios.get(`${auth.baseURL}/api/get-faq/${id}`)
            if (response.status === 200) {
                setFaqData(response.data.data[0])
                setValue(response.data.data[0].description)
                setRenderApp(true)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        loadData()
    }, [])
    const handleSubmit = async (id, e) => {
        e.preventDefault();
        const title = document.getElementById('faqTitle').value;
        var description = value;
        description = description.replace(/\'/g, "\''");
        try {
            const response = await axios.post(`${auth.baseURL}/api/update-faq/${id}`, { title, description },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            if (response.status === 200) {
                toast.success('Data Edited successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => navigate('/faqs'), 1000)
            } else if (response.status === 400) {
                console.log("Couldnot update the data")
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            {renderApp && <>
                <h2>Edit Partner</h2>

                <form onSubmit={
                    (e) => {
                        handleSubmit(faqData.id, e)
                    }
                } action="">
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
                        <input type="text" placeholder="FAQ Heading" defaultValue={faqData.title} class="form-control" id="faqTitle"></input>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">FAQ Description</label>
                        <div className="white-background">
                            <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} placeholder="Enter content to be displayed in webpage" />
                        </div>
                    </div>
                    <input className='btn add-btn' type="submit" value={"Save"} />
                    <Link className='btn ms-3' to="/faqs">Back</Link>
                </form>
            </>}

        </div>
    )
}


export default UpdateFAQ