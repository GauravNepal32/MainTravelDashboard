import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../authentication/auth';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from "react-select";
import EditDay from './EditDay';


const UpdatePackage = () => {
    const id = useParams().id;
    const navigate = useNavigate();
    const [oldData, setOldData] = useState([]);
    const token = sessionStorage.getItem('access_token')
    const auth = useAuth();
    const [value, setValue] = useState('');
    const [location, setLocation] = useState([]);
    const [selectLocation, setSelectLocation] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectCategory, setSelectCategory] = useState([]);
    const [include, setInclude] = useState('');
    const [exclude, setExclude] = useState('');
    const [renderApp, setRenderApp] = useState(false)

    const [dayBreak, setInputFields] = useState([
        { day: '', description: '' }
    ])

    // console.log(dayBreak.serializeArray())

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

    const loadData = async () => {
        try {
            const response = await axios.get(`${auth.baseURL}/api/get-package/${id}`);
            setOldData(response.data.data)
            console.log(response.data.data[0].location_id)
            setSelectLocation({ label: `${response.data.data[0].location}`, value: `${response.data.data[0].location_id}` })
            setSelectCategory({ label: `${response.data.data[0].category}`, value: `${response.data.data[0].category_id}` })
            setValue(response.data.data[0].description)
            setInclude(response.data.data[0].include_list)
            setExclude(response.data.data[0].exclude_list)
            setRenderApp(true)
        } catch (err) {
            console.log(err)
            setRenderApp(true)
        }
    }

    useEffect(() => {
        loadData()
    }, [])
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
        loadLocation();
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = document.getElementById('packageName').value;
        console.log(name)
        const location = selectLocation.value;
        console.log(location)
        const category = selectCategory.value;
        const starting_price = document.getElementById('packagePrice').value;
        console.log(starting_price)
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
        const duration = document.getElementById('packageDuration').value;
        console.log(duration)
        try {
            const response = await axios.post(`${auth.baseURL}/api/update-package/${id}`, { name, location, category, duration, starting_price, max_guests, min_age, language, description, include_list, dayBreak, exclude_list, image },
                {
                    headers: {
                        "Content-Type": "application/json",
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
                setTimeout(() => navigate('/package'), 500)
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            {renderApp &&
                <>
                    <h2>Update Packages</h2>
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
                            <input type="text" defaultValue={oldData[0].package_title} class="form-control" id="packageName" placeholder="Packages Name" />
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
                            <input type="number" defaultValue={oldData[0].starting_price} class="form-control" min={0} id="packagePrice" placeholder="Packages Starting Price" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Maximum Guests in the Package</label>
                            <input type="number" class="form-control" defaultValue={oldData[0].max_guests} min={0} id="packageGuests" placeholder="Maximum Guests in Package" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Minimum Age Limt</label>
                            <input type="number" class="form-control" defaultValue={oldData[0].min_age} min={0} id="packageLimit" placeholder="Minimum Age Limt" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Languages Supported</label>
                            <input type="text" class="form-control" id="packageLanguage" defaultValue={oldData[0].language} placeholder="Languages Supported" />
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
                            <input type="number" defaultValue={oldData[0].duration} class="form-control" min={0} id="packageDuration" placeholder="Packages Duration" />
                        </div>
                        <div className=" mt-3">
                            <span className='fw-bold fs-3'>
                                Day to Day Break Down
                            </span>
                            <div className="mt-3"></div>
                            {console.log(oldData)}
                            {oldData[0].day_id !== null &&
                                <>
                                    {oldData.map((m, index) => (
                                        <EditDay loadData={loadData} id={m.day_id} index={index} day={m.day} description={m.day_description} />
                                    ))}
                                </>
                            }
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

                        <input className='btn add-btn' type="submit" value={"Update packages"} />
                    </form>
                </>
            }
        </div>
    )
}

export default UpdatePackage
