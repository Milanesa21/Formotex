import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import './Equipos.css';

const Equipos: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const grupoId = queryParams.get('grupoId') || ''; // Cambiado a grupoId

  interface Equipo {
    id: number;
    nombre: string;
    estado: string;
    ubicacion: string;
  }

  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newEquipo, setNewEquipo] = useState({ nombre: '', estado: '', ubicacion: '' });
  const [editEquipo, setEditEquipo] = useState<Equipo | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/equipos?grupoId=${grupoId}`);
        setEquipos(response.data);
      } catch (error) {
        console.error('Error al obtener los equipos', error);
      }
    };
    fetchEquipos();
  }, [grupoId]);

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
      await axios.post('http://localhost:4000/api/equipos/', { ...newEquipo, grupoId });
      setNewEquipo({ nombre: '', estado: '', ubicacion: '' });
      setIsCreating(false);
      const response = await axios.get(`http://localhost:4000/api/equipos?grupoId=${grupoId}`);
      setEquipos(response.data);
    } catch (error) {
      console.error('Error al crear el equipo', error);
    }
  };

  const handleEdit = async () => {
    if (editEquipo) {
      try {
        await axios.put(`http://localhost:4000/api/equipos/${editEquipo.id}`, editEquipo);
        setEditEquipo(null);
        const response = await axios.get(`http://localhost:4000/api/equipos?grupoId=${grupoId}`);
        setEquipos(response.data);
      } catch (error) {
        console.error('Error al editar el equipo', error);
      }
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
                <button className="btn btn-warning" onClick={() => setEditEquipo(equipo)}>
                  Editar
                </button>
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

      {editEquipo && (
        <div className="modal" onClick={() => setEditEquipo(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Editar Equipo</h3>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Nombre del equipo"
              value={editEquipo.nombre}
              onChange={(e) => setEditEquipo({ ...editEquipo, nombre: e.target.value })}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Estado"
              value={editEquipo.estado}
              onChange={(e) => setEditEquipo({ ...editEquipo, estado: e.target.value })}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ubicación"
              value={editEquipo.ubicacion}
              onChange={(e) => setEditEquipo({ ...editEquipo, ubicacion: e.target.value })}
            />
            <button className="btn btn-success" onClick={handleEdit}>
              Guardar Cambios
            </button>
            <button className="btn btn-secondary" onClick={() => setEditEquipo(null)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Equipos;
