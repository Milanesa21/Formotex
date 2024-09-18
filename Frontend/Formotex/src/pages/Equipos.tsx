import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import './Equipos.css'; // Asegúrate de importar el CSS para estilos adicionales

const Equipos: React.FC = () => {
  interface Equipo {
    id: number;
    nombre: string;
    estado: string;
    ubicacion: string;
  }

  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newEquipo, setNewEquipo] = useState({ nombre: '', estado: '', ubicacion: '' });
  const { user } = useAuth();

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/equipos');
        setEquipos(response.data);
      } catch (error) {
        console.error('Error al obtener los equipos', error);
      }
    };
    fetchEquipos();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/api/equipos/${id}`);
      setEquipos(equipos.filter(equipo => equipo.id !== id));
    } catch (error) {
      console.error('Error al eliminar el equipo', error);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:4000/api/equipos', newEquipo);
      setNewEquipo({ nombre: '', estado: '', ubicacion: '' });
      setIsCreating(false);
      // Refrescar la lista de equipos
      const response = await axios.get('http://localhost:4000/api/equipos');
      setEquipos(response.data);
    } catch (error) {
      console.error('Error al crear el equipo', error);
    }
  };

  return (
    <div className="container">
      <h2>Equipos Informáticos</h2>
      {user?.role === 'admin' && (
        <>
          <button className="btn btn-primary mb-3" onClick={() => setIsCreating(!isCreating)}>
            {isCreating ? 'Cancelar' : 'Crear Equipo'}
          </button>
          {isCreating && (
            <div className="create-form">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Nombre del equipo"
                value={newEquipo.nombre}
                onChange={(e) => setNewEquipo({ ...newEquipo, nombre: e.target.value })}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Estado"
                value={newEquipo.estado}
                onChange={(e) => setNewEquipo({ ...newEquipo, estado: e.target.value })}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Ubicación"
                value={newEquipo.ubicacion}
                onChange={(e) => setNewEquipo({ ...newEquipo, ubicacion: e.target.value })}
              />
              <button className="btn btn-success" onClick={handleCreate}>
                Crear
              </button>
            </div>
          )}
        </>
      )}
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Ubicación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map(equipo => (
            <tr key={equipo.id}>
              <td>{equipo.nombre}</td>
              <td>{equipo.estado}</td>
              <td>{equipo.ubicacion}</td>
              <td>
                <button className="btn btn-info">Detalles</button>
                {user?.role === 'admin' && (
                  <button className="btn btn-danger" onClick={() => handleDelete(equipo.id)}>
                    Eliminar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Equipos;
