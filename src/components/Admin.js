import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './style/Admin.scss';

export default function Admin() {
  const { register, handleSubmit } = useForm();

  const [projets, setProjets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/projets`)
      .then((reponse) => {
        console.log(reponse);
        setProjets(reponse.data);
        setIsLoading(false);
      })
      .catch(console.error);
  }, [isLoading]);

  const onSubmit = (data) => {
    console.log(data);
    const source = axios.CancelToken.source();
    axios
      .post('http://localhost:5000/admin/projets', data, {
        cancelToken: source.token,
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message);
        } else {
          console.log('Error:', err.message);
        }
      });
  };

  const onDelete = (id) => {
    axios
      .delete(`http://localhost:5000/admin/projets/${id}`)
      .then(setIsLoading(true))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="administration">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="title" ref={register} placeholder="title" />
        <input name="Logo" ref={register} placeholder="Logo" />
        <input
          name="Client_Description"
          ref={register}
          placeholder="Client Description"
        />
        <input
          name="Projet_Description"
          ref={register}
          placeholder="Projet Description"
        />
        <input name="Methode" ref={register} placeholder="Methode" />
        <input
          name="Details_Client"
          ref={register}
          placeholder="Details Client"
        />
        <input name="Lien_Client" ref={register} placeholder="Lien Client" />

        <input name="Techno_id" ref={register} placeholder="techno" />
        <input name="Client_name" ref={register} placeholder="Nom Client" />
        <input name="screen1" ref={register} placeholder="screen projet" />
        <input name="screen2" ref={register} placeholder="screen projet" />
        <input name="screen3" ref={register} placeholder="screen projet" />
        <input name="screen4" ref={register} placeholder="screen projet" />
        <input name="date" ref={register} placeholder="date" />
        <input
          name="projet_context"
          ref={register}
          placeholder="projet_context"
        />
        <input type="submit" />
      </form>

      <div>
        {projets.map((proj) => (
          <div>
            <p key={proj.id}>{proj.title}</p>
            <button type="button" onClick={() => onDelete(proj.id)}>
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
