import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../authentication/auth';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from "react-select";


const AddPackage = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('access_token')
    const auth = useAuth();
    const [value, setValue] = useState('');
    const [location, setLocation] = useState([]);
    const [selectLocation, setSelectLocation] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectCategory, setSelectCategory] = useState([]);
    const [include, setInclude] = useState('');
    const [exclude, setExclude] = useState('');
    const [duration, setDuration] = useState(0);
    const [loading, setLoading] = useState(false)
    const [dayBreak, setInputFields] = useState([
        { day: '', description: '' }
    ])


    const addFields = (e) => {
        e.preventDefault();
        let newfield = { day: '', description: '' }

        setInputFields([...dayBreak, newfield])
    }
    const handleFormChange = (index, event) => {
        let data = [...dayBreak];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }
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

    const Includedmodules = {
        toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "bullet" }],
        ],
    };

    const loadLocation = async () => {
        try {
            Promise.all([
                await axios.get(`${auth.baseURL}/api/get-location-list`),
                await axios.get(`${auth.baseURL}/api/get-category-list`),
            ]).then(response => {
                setLocation(response[0].data.data)
                setCategory(response[1].data.data)
            })

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {

    }, [duration])

    useEffect(() => {
        loadLocation();
    }, [])
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        const name = document.getElementById('packageName').value;
        const location = selectLocation.value;
        const category = selectCategory.value;
        const starting_price = document.getElementById('packagePrice').value;
        const max_guests = document.getElementById('packageGuests').value;
        const min_age = document.getElementById('packageLimit').value;
        const language = document.getElementById('packageLanguage').value;
        var description = value;
        description = description.replace(/\'/g, "\''");
        var include_list = include;
        include_list = include_list.replace(/\'/g, "\''");
        var exclude_list = exclude;
        exclude_list = exclude_list.replace(/\'/g, "\''");
        const image = document.getElementById('packageFile').files[0]
        const stDay = JSON.stringify(dayBreak);
        try {
            const response = await axios.post(`${auth.baseURL}/api/add-package`, { name, location, category, duration, starting_price, max_guests, min_age, language, description, include_list, stDay, exclude_list, image },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
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
                setTimeout(() => navigate('/package'), 500)
            }
        } catch (err) {
            setLoading(false)
        }
    }
    return (
        <div>
            <h2>Add Packages</h2>
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
                    <label for="exampleFormControlInput1" class="form-label">Package Name</label>
                    <input type="text" class="form-control" id="packageName" placeholder="Packages Name" />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Package Location</label>
                    <Select value={selectLocation} onChange={(choice) => { setSelectLocation(choice) }} isSearchable="true" placeholder="Select a Location" options={location} />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Package Category</label>
                    <Select value={selectCategory} onChange={(choice) => { setSelectCategory(choice) }} isSearchable="true" placeholder="Select a Category" options={category} />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Package Starting Price</label>
                    <input type="number" class="form-control" min={0} id="packagePrice" placeholder="Packages Starting Price" />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Maximum Guests in the Package</label>
                    <input type="number" class="form-control" min={0} id="packageGuests" placeholder="Maximum Guests in Package" />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Minimum Age Limt</label>
                    <input type="number" class="form-control" min={0} id="packageLimit" placeholder="Minimum Age Limt" />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Languages Supported</label>
                    <input type="text" class="form-control" id="packageLanguage" placeholder="Languages Supported" />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Package Description</label>
                    <div className="white-background">
                        <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} placeholder="Describe about the package in short" />
                    </div>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Things Included in the package</label>
                    <div className="white-background">
                        <ReactQuill theme="snow" value={include} onChange={setInclude} modules={Includedmodules} placeholder="Please write the content in list format" />
                    </div>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Things Excluded in the package</label>
                    <div className="white-background">
                        <ReactQuill theme="snow" value={exclude} onChange={setExclude} modules={Includedmodules} placeholder="Please write the content in list format" />
                    </div>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Package Duration</label>
                    <input type="number" value={duration} class="form-control" onChange={(e) => { setDuration(e.target.value) }} min={0} id="packageDuration" placeholder="Packages Duration" />
                </div>
                <div className=" mt-3">
                    <span className='fw-bold fs-3'>
                        Day to Day Break Down
                    </span>
                    <div className="mt-3"></div>
                    {dayBreak.map((input, index) => {
                        return (
                            <div className="bg-white p-4 mb-3 rounded">
                                <div key={index}>
                                    <input
                                        name='day'
                                        type='number'
                                        className='form-control'
                                        placeholder='Day Number'
                                        value={input.day}
                                        onChange={event => handleFormChange(index, event)}
                                    />
                                    <textarea
                                        className='form-control mt-3'
                                        name='description'
                                        placeholder='Description about the day'
                                        value={input.description}
                                        onChange={event => handleFormChange(index, event)}
                                    />
                                </div>
                            </div>
                        )
                    })}
                    <button className='btn btn-primary mb-3' onClick={addFields}>Add More</button>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label me-4">Thumbnail: </label>
                    <input type="file" id='packageFile' />
                </div>
                {loading ?
                    <button class="btn add-btn" type="button" disabled>
                        <span class="spinner-border spinner-border-sm me-3" role="status" aria-hidden="true"></span>
                        Loading...
                    </button> :
                <input className='btn add-btn' type="submit" value={"Add packages"} />
                }
            </form>
        </div>
    )
}

export default AddPackage
