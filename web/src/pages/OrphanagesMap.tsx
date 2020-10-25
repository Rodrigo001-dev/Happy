import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';

import api from '../services/api';

import '../styles/pages/orphanages-map.css';

interface OrphanageProps {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
};

// const mapIcon = Leaflet.icon({
//   iconUrl: mapMarkerImg,

//   iconSize: [58, 68], // largura 58 e altura 68 
//   // hrizontalmente(eixo X) 29 é metade de 58, ou seja, no meio e no 
//   // eixo Y é em baixo, ou seja, 68
//   iconAnchor: [29, 68],

//   popupAnchor: [170, 2] // qual a posição na tela que o popup vai renderizar
// }); // icone personalizado

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<OrphanageProps[]>([]);

  useEffect(() => {
    api.get('orphanages').then(response => {
      // response.data tem todos os orfanatos
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <span>Guapiaçu</span>
          <strong>São Paulo</strong>
        </footer>
      </aside>

      <Map 
        center={[-20.7865739, -49.2334783]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer 
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
        />

        {orphanages.map(orphanage => {
          return (
            <Marker 
              key={orphanage.id}
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup 
                closeButton={false} 
                minWidth={240} 
                maxWidth={240} 
                className="map-popup"
              > 
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;