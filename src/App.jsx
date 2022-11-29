import React from 'react';
import shortid from 'shortid' //https://www.npmjs.com/package/shortid

function App() {

  const [tarea, setTarea] = React.useState('')
  const [tareas, setTareas] = React.useState([])
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState('')
  const [error, setError] = React.useState(null)

  const agregarTarea = e => {
    e.preventDefault()
    if (!tarea.trim()) {
      console.log('Campo vacio')
      setError('El campo no puede estar Vacío')
      return
    }
    setTareas([
      ...tareas,
      { tarea, id: shortid.generate() }
    ])
    setTarea('')
    setError(null)
  }

  const eliminarTarea = id => {
    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado)
  }

  const editar = item => {
    setModoEdicion(true)
    setTarea(item.tarea)
    setId(item.id)
  }

  const editarTarea = e => {
    e.preventDefault()
    if (!tarea.trim()) {
      console.log('Campo vacio')
      setError('El campo no puede estar vacío')
      return
    }

    const arrayEditado = tareas.map(item => item.id === id ? { id, tarea } : item)
    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea('')
    setId('')
    setError(null)
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD REACT 17</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className="list-group">
            {
              tareas.length === 0 ? (
                <li className="list-group-item list-group-item-action list-group-item-primary">Sin Tareas</li>
              ) : (
                tareas.map(item => (
                  <li className="list-group-item list-group-item-action list-group-item-success" key={item.id}>
                    <span className="lead">{item.tarea}</span>
                    <button
                      className="btn btn-outline-danger btn-sm float-end mx-2"
                      onClick={() => eliminarTarea(item.id)}
                    >Eliminar</button>
                    <button
                      className="btn btn-outline-warning btn-sm float-end"
                      onClick={() => editar(item)}
                    >Editar</button>
                  </li>
                ))
              )
            }
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {
              modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
            }
          </h4>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {
              error ? <span className="text-danger">{error}</span> : null
            }
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese Tarea"
              onChange={e => setTarea(e.target.value)}
              value={tarea}
            />
            <div className="d-grid gap-2">
              {
                modoEdicion ? (
                  <button className="btn btn-warning " type="submit">Editar</button>
                ) : (
                  <button className="btn btn-dark " type="submit">Agregar</button>
                )
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
