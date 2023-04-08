import React from "react";
import classes from "./Search.module.css";
import cn from "classnames";

const Search = (props) => {
    const {value, onChange, children = "Search", placeholder = "search..."} = props;

    const inputClass = cn({
        [classes.input]: true,
        [classes.filled]: value.length
    });

    return (
        <label className={classes.label}>
            {children}
            <input
                /*на элементе в одном случае будет один класс в другом два*/
                className={inputClass}
                type={"text"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}/>
        </label>
    );
};

export default Search;