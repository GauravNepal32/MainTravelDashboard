import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../authentication/auth';
import Select from 'react-select'
import Loading from '../Loading/Loading';

const UpdateCategory = () => {
    const id = useParams().id;
    const navigate = useNavigate();
    const [categoryData, setCategoryData] = useState([]);
    const [renderApp, setRenderApp] = useState(false)
    const token = sessionStorage.getItem('access_token')
    const auth = useAuth();
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([])
    const [loading, setLoading] = useState(false)
    const handleChange = e => {
        setSelectedOption(e);
    }
    const loadData = async () => {
        try {
            Promise.all([
                await axios.get(`${auth.baseURL}/api/get-category/${id}`),
                await axios.get(`${auth.baseURL}/api/icon-list`),
            ]).then((response) => {
                if (response[0].status === 200) {
                    setCategoryData(response[0].data.data[0])
                    setOptions(response[1].data.data)
                    setRenderApp(true)
                }
            })

        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (renderApp) {
            options.map((option) => {
                { Number(option.value) === Number(categoryData.icon) && setSelectedOption(option) }
            })
        }
    }, [options])
    useEffect(() => {
        loadData()
    }, [])
    const handleSubmit = async (id, e) => {
        setLoading(true)
        e.preventDefault();
        const title = document.getElementById('CategoryTitle').value;
        try {
            const response = await axios.post(`${auth.baseURL}/api/update-category/${id}`, { name: title, icon: selectedOption.value },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setLoading(false)
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
                setTimeout(() => navigate('/Categorys'), 1000)
            } else if (response.status === 400) {
                console.log("Couldnot update the data")
            }
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }
    return (
        <div>
            {renderApp && <>
                <h2>Edit Category</h2>

                <form onSubmit={
                    (e) => {
                        handleSubmit(categoryData.id, e)
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
                        <label for="exampleFormControlTextarea1" class="form-label">Category Title</label>
                        <input type="text" placeholder="Category Heading" defaultValue={categoryData.name} class="form-control" id="CategoryTitle"></input>
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
                                    <img width={30} height={30} src={`data:image/svg+xml;utf8,${e.icon}`} />
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
                        <>
                            <input className='btn add-btn' type="submit" value={"Save"} />
                            <Link className='btn ms-3' to="/Categorys">Back</Link>
                        </>
                    }
                </form>
            </>}

        </div>
    )
}


export default UpdateCategory