import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

const Equipos: React.FC = () => {
  interface Equipo {
    id: number;
    nombre: string;
    estado: string;
    ubicacion: string;
  }

  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEquipos = async () => {
      const response = await axios.get('http://localhost:3000/api/equipos');
      setEquipos(response.data);
    };
    fetchEquipos();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/equipos/${id}`);
      setEquipos(equipos.filter(equipo => equipo.id !== id));
    } catch (error) {
      console.error('Error al eliminar el equipo', error);
    }
  };

  return (
    <div className="container">
      <h2>Equipos Informáticos</h2>
      {user?.role === 'admin' && (
        <button className="btn btn-primary" onClick={() => alert('Formulario para crear equipo')}>
          Crear Equipo
        </button>
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
