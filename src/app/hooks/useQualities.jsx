import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import qualityService from "../services/qualities.service";
import { toast } from "react-toastify";

const QualityContext = React.createContext();

export const useQualities = () => {
    return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        getQualitiesList();
    }, []);

    async function getQualitiesList() {
        try {
            const { content } = await qualityService.get();
            setQualities(content);
            // console.log("qualities:", qualities);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function getQualities(id) {
        return qualities.find((q) => q._id === id);
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <QualityContext.Provider value={{ isLoading, qualities, getQualities }}>
            {children}
        </QualityContext.Provider>
    );
};
QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
