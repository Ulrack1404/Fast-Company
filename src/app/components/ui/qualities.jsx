import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../hooks/useQualities";

const Qualities = ({ qualArray }) => {
    const { isLoading, getQualities } = useQualities();

    const qual = () => {
        return qualArray.map((i) => {
            return getQualities(i);
        });
    };

    if (!isLoading) {
        return qual().map((i) => {
            return (
                <span className={"badge m-1 bg-" + i.color} key={i._id}>
                    {i.name}
                </span>
            );
        });
    } else return "loading!!!";
};
Qualities.propTypes = {
    qualArray: PropTypes.array
};

export default Qualities;
