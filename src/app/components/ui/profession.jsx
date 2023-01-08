import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessionById,
    getProfessionsLoadingStatus
} from "../../store/professions";

const Profession = ({ id }) => {
    const professionLoading = useSelector(
        getProfessionsLoadingStatus()
    );
    const getProfession = useSelector(
        getProfessionById(id)
    );

    const prof = getProfession;
    if (!professionLoading) {
        return <p>{prof.name}</p>;
    } else return "Loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
