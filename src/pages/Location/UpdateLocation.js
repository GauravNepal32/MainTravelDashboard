import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../authentication/auth';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const UpdateLocation = () => {
    const id = useParams().id;
    const navigate = useNavigate();
    const [locationData, setLocationData] = useState();
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
            const response = await axios.get(`${auth.baseURL}/api/get-location/${id}`)
            if (response.status === 200) {
                setLocationData(response.data.data[0])
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
    const handleSubmit = async (id, oldImage, e) => {
        e.preventDefault();
        const name = document.getElementById('locationName').value;
        const district = document.getElementById('locationDistrict').value;
        const area = document.getElementById('locationArea').value;
        var description = value;
        description = description.replace(/\'/g, "\''");
        const image = document.getElementById('locationFile').files[0];
        try {
            const response = await axios.post(`${auth.baseURL}/api/update-location/${id}`, { name, description, district, area, oldImage, image },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log(response)
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
                setTimeout(() => navigate('/location'), 1000)
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
                <h2>Edit locations</h2>

                <form onSubmit={
                    (e) => {
                        handleSubmit(locationData.id, locationData.thumbnail, e)
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
                        <label htmlFor="exampleFormControlInput1" class="form-label">Location Name</label>
                        <input type="text" class="form-control" id="locationName" defaultValue={locationData.name} placeholder="Location Name" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">District Name</label>
                        <input type="text" class="form-control" defaultValue={locationData.district} id="locationDistrict" placeholder="District Name" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Area</label>
                        <input type="text" class="form-control" defaultValue={locationData.area} id="locationArea" placeholder="Area" />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" class="form-label">Description</label>
                        <div className="white-background">
                            <ReactQuill theme="snow" defaultValue={value} onChange={setValue} modules={modules} />
                        </div>
                    </div>
                    <div class="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" class="form-label me-4">Images: </label>
                        <input type="file" id="locationFile" />
                        <img src={`${locationData.thumbnail}`} width={50} alt="" />
                    </div>
                    <input className='btn add-btn' type="submit" value={"Save"} />
                    <Link className='btn ms-3' to="/location">Back</Link>
                </form>
            </>}

        </div>
    )
}


export default UpdateLocation