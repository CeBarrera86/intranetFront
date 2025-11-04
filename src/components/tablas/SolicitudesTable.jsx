import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net';
import { useNavigate } from 'react-router-dom'; // Add this import

const SolicitudesTable = ({ data = [] }) => {
    const tableRef = useRef(null);
    const navigate = useNavigate(); // Add this hook

    useEffect(() => {
        if (tableRef.current && data.length > 0) {
            // Destroy existing DataTable if it exists
            if ($.fn.DataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable().destroy();
            }
            // Initialize DataTable
            const table = $(tableRef.current).DataTable({
                data: data,
                columns: [
                    { title: 'ID', data: 'SOE_ID' },
                    { title: 'Estado', data: null, defaultContent: 'Pendiente' },
                    { title: 'Fecha Estado', data: 'SOE_APELLIDO', defaultContent: '01/01/1970' },
                    { title: 'Usuario', data: 'SOE_USUARIO' },
                    { title: 'Tipo', data: 'SOE_TIPO_ID' },
                    { title: 'Asociado', data: null, render: (row) => `${row.SOE_APELLIDO}, ${row.SOE_NOMBRE}` },
                    {
                        title: 'Direccion', data: null, render: (row) => {
                            const calle = row.SOE_CALLE || '';
                            const altura = row.SOE_ALTURA || '';
                            const piso = row.SOE_PISO ? ` Piso ${row.SOE_PISO}` : '';
                            const dpto = row.SOE_DPTO ? ` Dpto ${row.SOE_DPTO}` : '';
                            return `Calle ${calle} Nro. ${altura} ${piso}${dpto}`;
                        }
                    },
                ],
                paging: true,
                searching: true,
                responsive: true,
                language: {
                    url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json'
                }
            });

            // Add double-click event listener
            $(tableRef.current).on('dblclick', 'tbody tr', function () {
                const rowData = table.row(this).data();
                if (rowData) {
                    navigate(`/solicitudes/${rowData.SOE_ID}`); // Navigate to detail page on double-click
                }
            });
        }

        return () => {
            if (tableRef.current && $.fn.DataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).off('dblclick'); // Remove event listener
                $(tableRef.current).DataTable().destroy();
            }
        };
    }, [data, navigate]);

    // Rest of your component remains the same
    return (
        <div className="solicitudes-table">
            <table ref={tableRef} className="display" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Estado</th>
                        <th>Fecha Estado</th>
                        <th>Usuario</th>
                        <th>Tipo</th>
                        <th>Asociado</th>
                        <th>Direccion</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    );
};

export default SolicitudesTable;