import React, { FormEvent, useState, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";

import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import { FiPlus } from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";

import api from "../services/api";

import '../styles/pages/create-orphanage.css';

export default function CreateOrphanage() {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');

  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  
  const [images, setImages] = useState<File[]>([]);
  // é um array de strings porque é um array com vários endereçosde 
  // preview das imagens
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    // pegar a latitude e longitude  que o usuário selecionou
    const { lat, lng } = event.latlng;
    
    setPosition({
      latitude: lat,
      longitude: lng,
    });
  };

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    // console.log(event.target.files);

    // se o usuário não selecionou alguma imagem
    if (!event.target.files) {
      return; // o return é para a função não continuar executando
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    // variável com todos os previews de todas as imagens
    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  };

  async function handleSubmit(event: FormEvent) {
    // vai prevenir o funcionamento padrão do formulário
    event.preventDefault();

    const { latitude, longitude } = position;

    // como o JSON não aceita images tem que ser FormData(multipart Form)
    const data = new FormData();

    // setando cada um dos campos manualmente para cadastrar um orfanato
    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    
    images.forEach(image => {
      data.append('images', image);
    });

    // cadstrando orfanato
    await api.post('orphanages', data);

    alert('Cadastro realizado com sucesso!');

    history.push('/app');

    // console.log({ 
    //   name, 
    //   about, 
    //   latitude, 
    //   longitude, 
    //   instructions, 
    //   opening_hours,
    //   open_on_weekends,
    //   images
    // });
  };

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-20.7865739, -49.2334783]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
              />

              {position.latitude !== 0 && (
                <Marker 
                  interactive={false} 
                  icon={mapIcon} 
                  position={[position.latitude, position.longitude]} 
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              {/* toda vez que o valor do input mudar(onChange) quando */}
              {/* ele tiver uma alteração eu vou receber um evento e o  */}
              {/* evento vai disparar uma função que vai chamar a minha */}
              {/* função setName que vai alterar o valor daquele estado */}
              {/* com o valor que foi digitado dentro do input. */}
              {/* event.target eu vou pagar o input .value eu pego o valor */}
              {/* dele */}
              <input 
                id="name" 
                value={name} 
                onChange={event => setName(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name" 
                maxLength={300} 
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name} />
                  )
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              
              <input multiple onChange={handleSelectImages} type="file" id="image[]" />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions" 
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input 
                id="opening_hours" 
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  // se open_on_weekends for igual a true eu vou colocar
                  // active
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button 
                  type="button"
                  // se não está como open_on_weekends, ou seja, se 
                  // open_on_weekends é false então eu vou mostrar isso
                  // active
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
