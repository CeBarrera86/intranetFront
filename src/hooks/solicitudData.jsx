import { useEffect } from 'react';

export function useLoadSolicitudData(
    setTiposDeObra,
    setLocalidades
) {
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const token = sessionStorage.getItem('token') || '';

        const fetchTipos = fetch('http://localhost:3002/api/tipos-de-obra', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            signal,
        }).then(async (res) => {
            if (!res.ok) throw new Error(`Tipos fetch failed: ${res.status}`);
            const json = await res.json();
            return json.data;
        });

        const fetchLocal = fetch('http://localhost:3002/api/localidades', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            signal,
        }).then(async (res) => {
            if (!res.ok) throw new Error(`Localidades fetch failed: ${res.status}`);
            const json = await res.json();
            return json.data;
        });

        // Ejecutar en paralelo y setear sólo si no fue abortado
        Promise.all([fetchTipos, fetchLocal])
            .then(([tiposData, localidadesData]) => {
                setTiposDeObra(tiposData);
                setLocalidades(localidadesData);
            })
            .catch((err) => {
                if (err.name === 'AbortError') {
                    // petición cancelada: ignore
                    return;
                }
                console.error('Error cargando datos iniciales:', err);
            });

        return () => {
            // cancelar fetchs en curso al unmount
            controller.abort();
        };
    }, [setTiposDeObra, setLocalidades]);
}