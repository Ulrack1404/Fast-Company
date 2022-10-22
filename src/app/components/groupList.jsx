import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    const renderUsers = (item) => {
        return (
            <li
                key={item[valueProperty]}
                className={`list-group-item ${
                    item === selectedItem ? "active" : ""
                }`}
                onClick={() => onItemSelect(item)}
                role="button"
            >
                {item[contentProperty]}
            </li>
        );
    };

    return (
        <ul className="list-group">
            {Array.isArray(items)
                ? items.map((item) => renderUsers(item))
                : Object.keys(items).map((item) => renderUsers(items[item]))}
        </ul>
    );
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};

export default GroupList;
