import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, User, AlertCircle, Info, CheckCircle, Clock, Shield, FileText, Navigation } from 'lucide-react';
import '../styles/dondeVotar.css';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

interface LocalVotacion {
  dni: string;
  nombreCompleto: string;
  localVotacion: string;
  direccion: string;
  mesa: string;
  distrito: string;
  departamento: string;
  lat?: number;
  lng?: number;
}

export const DondeVotar: React.FC = () => {
  const [dni, setDni] = useState('');
  const [resultado, setResultado] = useState<LocalVotacion | null>(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  const buscarLocal = async () => {
    // Validación
    if (dni.length !== 8) {
      setError('Por favor, ingrese un DNI válido de 8 dígitos');
      setResultado(null);
      return;
    }

    if (!/^\d+$/.test(dni)) {
      setError('El DNI solo debe contener números');
      setResultado(null);
      return;
    }

    setError('');
    setIsSearching(true);

    // Simular búsqueda en API
    try {
      const response = await fetch('/data/localesVotacion.json');
      const data: LocalVotacion[] = await response.json();
      
      // Buscar por DNI
      const localEncontrado = data.find(local => local.dni === dni);

      setTimeout(() => {
        if (localEncontrado) {
          setResultado(localEncontrado);
          setError('');
        } else {
          setResultado(null);
          setError('No se encontró información para el DNI ingresado. Verifique el número e intente nuevamente.');
        }
        setIsSearching(false);
      }, 800);
    } catch (err) {
      setError('Error al buscar la información. Por favor, intente nuevamente.');
      setIsSearching(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    buscarLocal();
  };

  const handleDniChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Solo números
    if (value.length <= 8) {
      setDni(value);
      setError('');
    }
  };

  // Inicializar mapa de Google Maps
  useEffect(() => {
    if (!resultado || !mapRef.current) return;

    // Esperar a que Google Maps esté cargado
    const initMap = () => {
      if (!window.google || !window.google.maps) {
        setTimeout(initMap, 100);
        return;
      }

      const lat = resultado.lat;
      const lng = resultado.lng;
      
      if (lat && lng) {
        const location = new window.google.maps.LatLng(lat, lng);

        // Crear o actualizar el mapa
        if (!mapInstanceRef.current) {
          mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
            center: location,
            zoom: 16,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ]
          });
        } else {
          mapInstanceRef.current.setCenter(location);
          mapInstanceRef.current.setZoom(16);
        }

        // Eliminar marcador anterior si existe
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        // Crear nuevo marcador
        markerRef.current = new window.google.maps.Marker({
          position: location,
          map: mapInstanceRef.current,
          title: resultado.localVotacion,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#2563eb',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2
          }
        });

        // Agregar info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 0.5rem;">
              <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 700;">${resultado.localVotacion}</h3>
              <p style="margin: 0; font-size: 0.875rem; color: #64748b;">${resultado.direccion}</p>
            </div>
          `
        });

        markerRef.current.addListener('click', () => {
          infoWindow.open(mapInstanceRef.current, markerRef.current);
        });
      } else {
        // Fallback: geocodificar si no hay coordenadas
        const geocoder = new window.google.maps.Geocoder();
        const address = `${resultado.direccion}, ${resultado.distrito}, ${resultado.departamento}, Perú`;

        geocoder.geocode({ address: address }, (results: any, status: string) => {
          if (status === 'OK' && results && results[0]) {
            const location = results[0].geometry.location;

            // Crear o actualizar el mapa
            if (!mapInstanceRef.current) {
              mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
                center: location,
                zoom: 16,
                styles: [
                  {
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }]
                  }
                ]
              });
            } else {
              mapInstanceRef.current.setCenter(location);
              mapInstanceRef.current.setZoom(16);
            }

            // Eliminar marcador anterior si existe
            if (markerRef.current) {
              markerRef.current.setMap(null);
            }

            // Crear nuevo marcador
            markerRef.current = new window.google.maps.Marker({
              position: location,
              map: mapInstanceRef.current,
              title: resultado.localVotacion,
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#2563eb',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2
              }
            });

            // Agregar info window
            const infoWindow = new window.google.maps.InfoWindow({
              content: `
                <div style="padding: 0.5rem;">
                  <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 700;">${resultado.localVotacion}</h3>
                  <p style="margin: 0; font-size: 0.875rem; color: #64748b;">${resultado.direccion}</p>
                </div>
              `
            });

            markerRef.current.addListener('click', () => {
              infoWindow.open(mapInstanceRef.current, markerRef.current);
            });
          } else {
            console.error('Error al geocodificar la dirección:', status);
          }
        });
      }
    };

    initMap();
  }, [resultado]);

  const handleOpenGoogleMaps = () => {
    if (resultado?.lat && resultado?.lng) {
      const url = `https://www.google.com/maps/search/?api=1&query=${resultado.lat},${resultado.lng}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="donde-votar">
      <div className="donde-votar__container">
        {/* Header Section */}
        <section className="donde-votar__header">
          <h1 className="donde-votar__title">¿Dónde Voto?</h1>
          <p className="donde-votar__subtitle">
            Encuentra tu centro de votación con tu DNI
          </p>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="donde-votar__form">
            <div className="donde-votar__input-group">
              <label htmlFor="dni" className="donde-votar__label">
                Número de DNI
              </label>
              <div className="donde-votar__input-wrapper">
                <input
                  type="text"
                  id="dni"
                  value={dni}
                  onChange={handleDniChange}
                  placeholder="Ingrese 8 dígitos"
                  className={`donde-votar__input ${error ? 'donde-votar__input--error' : ''}`}
                  maxLength={8}
                />
                <button
                  type="submit"
                  className="donde-votar__button"
                  disabled={isSearching || dni.length !== 8}
                >
                  {isSearching ? (
                    <>
                      <span className="donde-votar__spinner"></span>
                      Buscando...
                    </>
                  ) : (
                    <>
                      <Search size={20} />
                      Buscar
                    </>
                  )}
                </button>
              </div>
              {error && (
                <div className="donde-votar__error">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}
            </div>
          </form>
        </section>

        {/* Success Banner */}
        {resultado && (
          <div className="donde-votar__success-banner">
            <CheckCircle size={24} />
            <span>Centro de votación encontrado</span>
          </div>
        )}

        {/* Results Section */}
        {resultado && (
          <section className="donde-votar__results">
            {/* Información Principal: Local de Votación y Dirección */}
            <div className="donde-votar__location-card">
              <div className="donde-votar__location-header">
                <div className="donde-votar__location-main">
                  <div className="donde-votar__location-icon">
                    <MapPin size={24} />
                  </div>
                  <div className="donde-votar__location-content">
                    <span className="donde-votar__location-label">LOCAL DE VOTACIÓN</span>
                    <h2 className="donde-votar__location-name">{resultado.localVotacion}</h2>
                    <p className="donde-votar__location-address">
                      <MapPin size={16} />
                      {resultado.direccion}
                    </p>
                  </div>
                </div>
                {/* Horario de Votación integrado */}
                <div className="donde-votar__schedule-card">
                  <Clock size={24} className="donde-votar__schedule-icon" />
                  <div className="donde-votar__schedule-content">
                    <span className="donde-votar__schedule-label">Horario de Votación</span>
                    <span className="donde-votar__schedule-time">7:00 AM - 4:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Nombre Completo - Ubicado aquí para mayor relevancia */}
              <div className="donde-votar__user-info-inline">
                <div className="donde-votar__user-icon">
                  <User size={24} />
                </div>
                <div className="donde-votar__user-text">
                  <span className="donde-votar__user-label">Nombre Completo</span>
                  <span className="donde-votar__user-value">{resultado.nombreCompleto}</span>
                </div>
              </div>

              <div className="donde-votar__location-details">
                <div className="donde-votar__location-detail">
                  <span className="donde-votar__location-detail-label">Mesa N°</span>
                  <span className="donde-votar__location-detail-value">{resultado.mesa}</span>
                </div>
                <div className="donde-votar__location-detail">
                  <span className="donde-votar__location-detail-label">Distrito</span>
                  <span className="donde-votar__location-detail-value">{resultado.distrito}</span>
                </div>
                <div className="donde-votar__location-detail">
                  <span className="donde-votar__location-detail-label">Departamento</span>
                  <span className="donde-votar__location-detail-value">{resultado.departamento}</span>
                </div>
              </div>
            </div>

            {/* Mapa de Google Maps */}
            <div className="donde-votar__map-section">
              <div className="donde-votar__map-card">
                <div className="donde-votar__map-header">
                  <MapPin size={20} className="donde-votar__map-header-icon" />
                  <span className="donde-votar__map-header-text">{resultado.distrito}</span>
                </div>
                <div ref={mapRef} className="donde-votar__map-container"></div>
                <button 
                  className="donde-votar__map-button"
                  onClick={handleOpenGoogleMaps}
                >
                  <Navigation size={18} />
                  Abrir en Google Maps
                </button>
              </div>
            </div>

            {/* Instrucciones y Seguridad en 2 columnas */}
            <div className="donde-votar__instructions-section">
              <div className="donde-votar__instruction-card">
                <div className="donde-votar__instruction-header">
                  <div className="donde-votar__instruction-icon">
                    <FileText size={20} />
                  </div>
                  <h4 className="donde-votar__instruction-title">Instrucciones para Votar</h4>
                </div>
                <ul className="donde-votar__instruction-list">
                  <li><CheckCircle size={14} /> Lleva tu DNI original y en buen estado</li>
                  <li><CheckCircle size={14} /> No uses ropa con logos políticos</li>
                  <li><CheckCircle size={14} /> Llega temprano para evitar aglomeraciones</li>
                  <li><CheckCircle size={14} /> Respeta las indicaciones de los miembros de mesa</li>
                </ul>
              </div>

              <div className="donde-votar__instruction-card">
                <div className="donde-votar__instruction-header">
                  <div className="donde-votar__instruction-icon donde-votar__instruction-icon--green">
                    <Shield size={20} />
                  </div>
                  <h4 className="donde-votar__instruction-title">Seguridad</h4>
                </div>
                <ul className="donde-votar__instruction-list">
                  <li><CheckCircle size={14} /> No compartas tu DNI con desconocidos</li>
                  <li><CheckCircle size={14} /> Verifica que estés en el centro correcto</li>
                  <li><CheckCircle size={14} /> Reporta cualquier irregularidad a las autoridades</li>
                  <li><CheckCircle size={14} /> No lleves objetos prohibidos al centro de votación</li>
                </ul>
              </div>
            </div>

            {/* Important Notice */}
            <div className="donde-votar__notice">
              <div className="donde-votar__notice-icon">
                <Info size={20} />
              </div>
              <div className="donde-votar__notice-text">
                <strong>Importante:</strong> Esta es una asignación simulada y podría no ser la definitiva. 
                Consulte las fuentes oficiales para confirmar su local de votación final.
              </div>
            </div>
          </section>
        )}

        {/* Empty State - Helpful Tips */}
        {!resultado && !error && (
          <section className="donde-votar__tips">
            <h3 className="donde-votar__tips-title">¿Cómo funciona?</h3>
            <div className="donde-votar__tips-grid">
              <div className="donde-votar__tip-card">
                <div className="donde-votar__tip-number">1</div>
                <h4 className="donde-votar__tip-title">Ingresa tu número de DNI (8 dígitos) en el campo de búsqueda</h4>
              </div>
              <div className="donde-votar__tip-card">
                <div className="donde-votar__tip-number">2</div>
                <h4 className="donde-votar__tip-title">Haz clic en "Buscar" para encontrar tu centro de votación</h4>
              </div>
              <div className="donde-votar__tip-card">
                <div className="donde-votar__tip-number">3</div>
                <h4 className="donde-votar__tip-title">Revisa la información de tu mesa y ubicación</h4>
              </div>
              <div className="donde-votar__tip-card">
                <div className="donde-votar__tip-number">4</div>
                <h4 className="donde-votar__tip-title">Usa "Ver Ruta" para obtener indicaciones de cómo llegar</h4>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
