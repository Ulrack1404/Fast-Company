import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { useParams, useHistory } from "react-router-dom";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

// const EditUserPage = ({ userId }) => {
//     const [user, setUser] = useState();
//     const [professions, setProfession] = useState([]);
//     const [qualities, setQualities] = useState([]);
//     const params = useParams();
//     userId = params;

//     useEffect(() => {
//         api.users.getById(userId.userId).then((data) => setUser(data));
//     }, []);
//     const [data, setData] = useState({
//         name: "",
//         email: ""
//     });

//     const handleChange = (target) => {
//         setData((prevState) => ({
//             ...prevState,
//             [target.name]: target.value
//         }));
//     };

//     const getProfessionById = (id) => {
//         for (const prof of professions) {
//             if (prof.value === id) {
//                 return { _id: prof.value, name: prof.label };
//             }
//         }
//     };

//     const getQualities = (elements) => {
//         const qualitiesArray = [];
//         for (const elem of elements) {
//             for (const quality in qualities) {
//                 if (elem.value === qualities[quality].value) {
//                     qualitiesArray.push({
//                         _id: qualities[quality].value,
//                         name: qualities[quality].label,
//                         color: qualities[quality].color
//                     });
//                 }
//             }
//         }
//         return qualitiesArray;
//     };
//     // console.log("getQualities", getQualities(qualities));
//     // console.log("qualities", qualities);

//     useEffect(() => {
//         api.professions.fetchAll().then((data) => {
//             const professionsList = Object.keys(data).map((professionName) => ({
//                 label: data[professionName].name,
//                 value: data[professionName]._id
//             }));
//             setProfession(professionsList);
//         });
//         api.qualities.fetchAll().then((data) => {
//             const qualitiesList = Object.keys(data).map((optionName) => ({
//                 value: data[optionName]._id,
//                 label: data[optionName].name,
//                 color: data[optionName].color
//             }));
//             setQualities(qualitiesList);
//         });
//     }, []);

//     return (
//         <div className="container mt-5">
//             <div className="row">
//                 <div className="col-md-6 offset-md-3 shadow p-4">
//                     {user ? (
//                         <form>
//                             <TextField
//                                 label="Имя"
//                                 name="name"
//                                 value={user.name}
//                                 onChange={handleChange}
//                             />
//                             <TextField
//                                 label="Электронная почта"
//                                 type="email"
//                                 name="email"
//                                 value={user.email}
//                                 onChange={handleChange}
//                             />
//                             <SelectField
//                                 label="Выбери свою профессию"
//                                 options={professions}
//                                 name="profession"
//                                 onChange={handleChange}
//                                 value={user.profession.name}
//                             />
//                             <RadioField
//                                 options={[
//                                     { name: "Male", value: "male" },
//                                     { name: "Female", value: "female" },
//                                     { name: "Other", value: "other" }
//                                 ]}
//                                 value={user.sex}
//                                 name="sex"
//                                 onChange={handleChange}
//                                 label="Выберите ваш пол"
//                             />
//                             <MultiSelectField
//                                 options={qualities}
//                                 onChange={handleChange}
//                                 defaultValue={user.qualities}
//                                 name="qualities"
//                                 label="Выберите ваши качества"
//                             />

//                             <button
//                                 className="btn btn-primary w-100 mx-auto"
//                                 type="submit"
//                             >
//                                 Submit
//                             </button>
//                         </form>
//                     ) : (
//                         <p>Loading..</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

const EditUserPage = ({ userId }) => {
    const [data, setData] = useState();

    const [loader, setLoader] = useState(false);
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);

    const history = useHistory();

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const transform = (data) => {
        return data.map((el) => ({
            label: el.name,
            value: el._id,
            color: el.color
        }));
    };

    useEffect(() => {
        api.users.getById(userId).then(({ qualities, profession, ...data }) => {
            setData({
                ...data,
                profession: profession._id,
                qualities: transform(qualities)
            });
            setLoader(true);
        });
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { profession, qualities } = data;
        api.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then(() => history.push("/users/" + userId));
        console.log(data);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {loader ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Электронная почта"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={professions}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={data.qualities}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                className="btn btn-primary w-100 mx-auto"
                                type="submit"
                            >
                                Submit
                            </button>
                        </form>
                    ) : (
                        <p>Loading..</p>
                    )}
                </div>
            </div>
        </div>
    );
};

EditUserPage.propTypes = {
    userId: PropTypes.string
};

export default EditUserPage;
