import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/detalleSolicitud.css';

/**
 * Componente para mostrar los detalles de una solicitud
 * @param {Object} props
 * @param {import('../types/solicitud').Solicitud} props.solicitud
 */
const SolicitudDetail = () => {
  const { id } = useParams();
  const [solicitud, setSolicitud] = useState(null);
  useEffect(() => {
    const fetchSolicitud = async () => {
      const response = await fetch(`http://localhost:3002/api/solicitud?solicitudId=${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setSolicitud(data);
    };

    fetchSolicitud();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatAddress = () => {
    const parts = [
      solicitud.SOE_CALLE,
      solicitud.SOE_ALTURA,
      solicitud.SOE_PISO && `Piso ${solicitud.SOE_PISO}`,
      solicitud.SOE_DPTO && `Dpto ${solicitud.SOE_DPTO}`,
    ].filter(Boolean);

    return parts.join(', ');
  };

  const PersonIcon = () => (
    <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
  );

  const LocationIcon = () => (
    <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
  );

  const WorkIcon = () => (
    <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm4-3a1 1 0 00-1 1v1h2V4a1 1 0 00-1-1zm4 3H6v8h8V6z" clipRule="evenodd" />
    </svg>
  );

  const ClockIcon = () => (
    <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
    </svg>
  );

  const handleEdit = () => {
    console.log('Editando solicitud:', solicitud.SOE_ID);
  };

  const handleGenerateReport = () => {
    console.log('Generando reporte para solicitud:', solicitud.SOE_ID);
  };

  const handleShowHistory = () => {
    console.log('Mostrando historial de solicitud:', solicitud.SOE_ID);
  };

  return (
    <div className="container">
      <div className="card">
        {/* Header */}
        <div className="header">
          <div className="headerContent">
            <h1 className="title">
              {solicitud.SOE_NOMBRE} {solicitud.SOE_APELLIDO}
            </h1>
            <p className="subtitle">Solicitud de Obra Eléctrica</p>
            <div className="idBadge">
              ID: {solicitud.SOE_ID}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          {/* Información Personal */}
          <div className="section">
            <h2 className="sectionTitle">
              <PersonIcon />
              Información Personal
            </h2>
            <div className="grid">
              <div className="gridItem">
                <div className="fieldLabel">CUIT</div>
                <div className="fieldValue">{solicitud.SOE_CUIT}</div>
              </div>
              <div className="gridItem">
                <div className="fieldLabel">Nombre Completo</div>
                <div className="fieldValue">
                  {solicitud.SOE_NOMBRE} {solicitud.SOE_APELLIDO}
                </div>
              </div>
              <div className="gridItem">
                <div className="fieldLabel">Email</div>
                <div className="fieldValue">{solicitud.SOE_EMAIL}</div>
              </div>
              <div className="gridItem">
                <div className="fieldLabel">Celular</div>
                <div className="fieldValue">{solicitud.SOE_CELULAR}</div>
              </div>
            </div>
          </div>

          {/* Dirección */}
          <div className="section">
            <h2 className="sectionTitle">
              <LocationIcon />
              Ubicación
            </h2>
            <div className="grid">
              <div className="gridItem">
                <div className="fieldLabel">Dirección Completa</div>
                <div className="fieldValue">{formatAddress()}</div>
              </div>
              <div className="gridItem">
                <div className="fieldLabel">Localidad</div>
                <div className="fieldValue">{solicitud.SOE_LOCALIDAD_ID}</div>
              </div>
            </div>
          </div>

          {/* Información Técnica */}
          <div className="section">
            <h2 className="sectionTitle">
              <WorkIcon />
              Información Técnica
            </h2>
            <div className="grid">
              <div className="gridItem">
                <div className="fieldLabel">Tipo</div>
                <div className="fieldValue">
                  <span className="statusBadge">{solicitud.SOE_TIPO_ID}</span>
                </div>
              </div>
              <div className="gridItem">
                <div className="fieldLabel">Subestación</div>
                <div className={`fieldValue ${!solicitud.SOE_SUBESTACION ? 'empty' : ''}`}>
                  {solicitud.SOE_SUBESTACION || 'No especificada'}
                </div>
              </div>
              <div className="gridItem">
                <div className="fieldLabel">Asociado</div>
                <div className={`fieldValue ${!solicitud.SOE_ASOCIADO ? 'empty' : ''}`}>
                  {solicitud.SOE_ASOCIADO || 'No especificado'}
                </div>
              </div>
              <div className="gridItem">
                <div className="fieldLabel">Suministro</div>
                <div className={`fieldValue ${!solicitud.SOE_SUMINISTRO ? 'empty' : ''}`}>
                  {solicitud.SOE_SUMINISTRO || 'No especificado'}
                </div>
              </div>
              <div className="gridItem">
                <div className="fieldLabel">Obra</div>
                <div className={`fieldValue ${!solicitud.SOE_OBRA ? 'empty' : ''}`}>
                  {solicitud.SOE_OBRA || 'No especificada'}
                </div>
              </div>
              <div className="gridItem">
                <div className="fieldLabel">Usuario</div>
                <div className="fieldValue">{solicitud.SOE_USUARIO}</div>
              </div>
            </div>
          </div>

          {/* Fechas */}
          <div className="section">
            <h2 className="sectionTitle">
              <ClockIcon />
              Información de Fechas
            </h2>
            <div className="dateGrid">
              <div className="dateItem">
                <div className="dateLabel">Fecha de Creación</div>
                <div className="dateValue">{formatDate(solicitud.SOE_FECHA)}</div>
              </div>
              <div className="dateItem">
                <div className="dateLabel">Última Actualización</div>
                <div className="dateValue">{formatDate(solicitud.SOE_UPDATE)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="actions">
          <button
            className="button buttonPrimary"
            onClick={handleEdit}
          >
            Editar Solicitud
          </button>
          <button
            className="button buttonSecondary"
            onClick={handleGenerateReport}
          >
            Generar Reporte
          </button>
          <button
            className="button buttonSecondary"
            onClick={handleShowHistory}
          >
            Historial
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolicitudDetail;