import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../authentication/auth';
import Select from 'react-select'
const AddCategory = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('access_token')
    const [options, setOptions] = useState([])
    const [renderApp, setRenderApp] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleChange = e => {
        setSelectedOption(e);
    }
    const auth = useAuth();
    // const options = [
    //     {
    //         value: 'beach', label: `<span class="material-symbols-outlined">
    //             map
    //         </span>`
    //     }
    // ]

    const loadData = async () => {
        try {
            Promise.all([
                await axios.get(`${auth.baseURL}/api/icon-list`),
            ]).then((response) => {
                setOptions(response[0].data.data)
                setRenderApp(true)
            })

        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        loadData()
    }, [])
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        const title = document.getElementById('categoryTitle').value;
        try {
            const response = await axios.post(`${auth.baseURL}/api/add-Category`, { name: title, icon: selectedOption.value },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
            setLoading(false)
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
                setTimeout(() => navigate('/Categorys'), 1000)
            }
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    return (
        <div>
            {renderApp &&
                <>
                    <h2>Add Category</h2>

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
                            <label for="exampleFormControlTextarea1" class="form-label">Category Title</label>
                            <input type="text" placeholder="Category Heading" class="form-control" id="categoryTitle"></input>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Icon</label>
                            <Select
                                placeholder="Select Option"
                                value={selectedOption}
                                options={options}
                                onChange={handleChange}
                                getOptionLabel={e => (
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {/* <img src={`${e.icon}`} alt="" />
                                        {e.icon} */}
                                        <img width={30} height={30} src={`data:image/svg+xml;utf8,${e.icon}`} />
                                        <span style={{ marginLeft: 5 }}>{e.text}</span>
                                    </div>
                                )}
                            />
                        </div>
                        {loading ?
                            <button class="btn add-btn" type="button" disabled>
                                <span class="spinner-border spinner-border-sm me-3" role="status" aria-hidden="true"></span>
                                Loading...
                            </button>

                            :
                            <input className='btn add-btn' type="submit" value={"Add Category"} />
                        }
                    </form>
                </>
            }
        </div>
    )
}

export default AddCategory