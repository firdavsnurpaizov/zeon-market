import axios from 'axios';
import React, { useEffect, useState } from 'react';
import style from "./Offert.module.css"

const Offer = () => {

    const [offert, setOffert] = useState([])
    // console.log(offert);

    useEffect(() => {
        axios(' http://localhost:3000/oofert').then((response) => {
            setOffert(response.data);
            return response.data
        })
    }, [])

    return (
        <div className="container">
            <h3>Публичная офферта</h3>
            <div className={style.offert}>
            {offert.map(off => off.offert)}
            </div>
        </div>
    );
};

export default Offer;