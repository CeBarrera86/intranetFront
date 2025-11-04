import { TextField, Typography, Button, MenuItem, Box, styled, ThemeProvider } from '@mui/material';
import appTheme from '../theme/Themes';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useLoadSolicitudData } from '../hooks/solicitudData';


const RootContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
}));

const MainContent = styled(Box)({
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
});

const NuevaSolicitud = () => {

    const [formData, setFormData] = useState({
        dni: '',
        apellido: '',
        nombre: '',
        calle: '',
        altura: '',
        piso: '',
        dpto: '',
        localidad: '',
        celular: '',
        email: '',
        tipo: '',
        username: sessionStorage.getItem('username') || '',
    });
    function clearForm() {
        alert('Limpio el formulario');
        setFormData({
            ...formData,
            dni: '',
            apellido: '',
            nombre: '',
            calle: '',
            altura: '',
            piso: '',
            dpto: '',
            localidad: '',
            celular: '',
            email: '',
        });
    }
    const [tiposDeObra, setTiposDeObra] = useState([]);
    const [localidades, setLocalidades] = useState([]);
    useLoadSolicitudData(setTiposDeObra, setLocalidades);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3002/api/crear-solicitud', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `No se pudo crear la solicitud - ${response.statusText}`,
                });
            }
            else {
                const data = await response.json();
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: `Solicitud creada con éxito con ID ${data.data.recordset[0].NewId}`,
                }).then((result) => {
                    console.log(result);
                    if (result.isConfirmed === true) {
                        window.location.href = '/';
                    }
                });
            }
        } catch (error) {
            console.error('Error al crear la solicitud:', error);
        }
    };

    return (
        <ThemeProvider theme={appTheme}>
            <RootContainer>
                <MainContent>
                    <Box
                        component="form"
                        sx={{
                            width: '100%',
                            backgroundColor: 'white',
                            padding: 4,
                            borderRadius: 2,
                            boxShadow: 3,
                        }}
                    >
                        <Typography variant="h4" component="h1" gutterBottom align="center">
                            Nueva Solicitud
                        </Typography>

                        {/* Conexión */}
                        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                            Conexión
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <TextField
                                select
                                label="Tipos"
                                variant="outlined"
                                sx={{ flexShrink: 0, width: '200px' }}
                                value={formData.tipo}
                                onChange={(e) => {
                                    const selectedTipo = tiposDeObra.find(tipo => tipo.TOE_ID === e.target.value);
                                    if (e.target.value === 15) {
                                        setFormData({
                                            ...formData,
                                            tipo: e.target.value,
                                            descripcion: selectedTipo ? selectedTipo.TOE_DESCRIPCION : '',
                                            dni: '30545719386',
                                            nombre: 'Corpico Ltda',
                                            apellido: 'Cooperativa',
                                            email: '2dojefe_tecnico@corpico.com.ar'
                                        })
                                    } else {
                                        clearForm();
                                        setFormData({
                                            ...formData,
                                            tipo: e.target.value,
                                            descripcion: selectedTipo ? selectedTipo.TOE_DESCRIPCION : '',
                                        });
                                    }

                                }}
                            >
                                {tiposDeObra.map((tipo) => (
                                    <MenuItem key={tipo.TOE_ID} value={tipo.TOE_ID}>
                                        {tipo.TOE_ABREVIATURA}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                label="Descripción"
                                variant="outlined"
                                multiline
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={formData.descripcion || ''}
                                InputLabelProps={{
                                    shrink: Boolean(formData.descripcion),
                                }}
                                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                            />
                        </Box>

                        {/* Titular */}
                        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                            Titular
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                fullWidth
                                label="DNI/CUIT"
                                variant="outlined"
                                sx={{ mb: 2, width: '320px' }}
                                value={formData.dni}
                                onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                            />
                            <TextField
                                fullWidth
                                label="Nombre"
                                variant="outlined"
                                sx={{ mb: 2 }}
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            />
                            <TextField
                                fullWidth
                                label="Apellido"
                                variant="outlined"
                                sx={{ mb: 2 }}
                                value={formData.apellido}
                                onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                            />
                        </Box>
                        {/* Dirección */}
                        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                            Dirección
                        </Typography>
                        <Box sx={{ display: 'flex-column', gap: 2 }}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Calle"
                                    variant="outlined"
                                    sx={{ mb: 2 }}
                                    value={formData.calle}
                                    onChange={(e) => setFormData({ ...formData, calle: e.target.value })}
                                />
                                <TextField
                                    select
                                    fullWidth
                                    label="Localidad"
                                    variant="outlined"
                                    sx={{ mb: 2 }}
                                    value={formData.localidad}
                                    onChange={(e) => {
                                        setFormData({ ...formData, localidad: e.target.value });
                                    }}
                                >
                                    {localidades.map((loc) => (
                                        <MenuItem key={loc.LOC_ID} value={loc.LOC_ID}>
                                            {loc.LOC_DESCRIPCION}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Altura"
                                    variant="outlined"
                                    sx={{ mb: 2 }}
                                    value={formData.altura}
                                    onChange={(e) => setFormData({ ...formData, altura: e.target.value })}
                                />
                                <TextField
                                    fullWidth
                                    label="Piso"
                                    variant="outlined"
                                    sx={{ mb: 2 }}
                                    value={formData.piso}
                                    onChange={(e) => setFormData({ ...formData, piso: e.target.value })}
                                />
                                <TextField
                                    fullWidth
                                    label="Dpto"
                                    variant="outlined"
                                    sx={{ mb: 2 }}
                                    value={formData.dpto}
                                    onChange={(e) => setFormData({ ...formData, dpto: e.target.value })}
                                />
                            </Box>
                        </Box>

                        {/* Contacto */}
                        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                            Contacto
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                fullWidth
                                label="Celular"
                                variant="outlined"
                                sx={{ mb: 2 }}
                                value={formData.celular}
                                onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                variant="outlined"
                                sx={{ mb: 3 }}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            onClick={handleSubmit}
                        >
                            Enviar Solicitud
                        </Button>
                    </Box>
                </MainContent>
            </RootContainer>
        </ThemeProvider>
    );
};

export default NuevaSolicitud;
