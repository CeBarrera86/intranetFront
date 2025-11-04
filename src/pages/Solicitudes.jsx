import React, { useEffect, useState } from 'react';
import SolicitudesTable from '../components/tablas/SolicitudesTable.jsx';

const Solicitudes = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    useEffect(() => {
        const fetchSolicitudes = async () => {
            if (isFetching) {
                const response = await fetch('http://localhost:3002/api/solicitudes', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                setSolicitudes(data.data);
                setIsFetching(false);
            }
        };
        fetchSolicitudes();
    }, []);


    return (
        <div>
            <SolicitudesTable data={solicitudes} />
        </div>
    );
};

export default Solicitudes;