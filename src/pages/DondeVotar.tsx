import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, AlertCircle, CheckCircle, Clock, Shield, FileText, Navigation, Bus, User } from 'lucide-react';
import '../styles/dondeVotar.css';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

interface Transporte {
  referencias?: string;
  rutas?: string[];
  tiempoAprox?: string;
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
  transporte?: Transporte;
}

export const DondeVotar: React.FC = () => {
  const [dni, setDni] = useState('');
  const [resultado, setResultado] = useState<LocalVotacion | null>(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const infoWindowRef = useRef<any>(null);
  const streetViewServiceRef = useRef<any>(null);

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

  // Limpiar mapa y Street View cuando cambia el resultado
  useEffect(() => {
    // Limpiar referencias anteriores cuando cambia el resultado
    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
        infoWindowRef.current = null;
      }
      if (streetViewServiceRef.current) {
        streetViewServiceRef.current = null;
      }
    };
  }, [resultado?.dni]); // Dependencia basada en DNI para forzar limpieza

  // Inicializar mapa de Google Maps
  useEffect(() => {
    if (!resultado || !mapRef.current) return;

    // Esperar a que Google Maps esté cargado
    const initMap = () => {
      if (!window.google || !window.google.maps) {
        setTimeout(initMap, 100);
        return;
      }

      // Limpiar instancias anteriores
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
        infoWindowRef.current = null;
      }

      const lat = resultado.lat;
      const lng = resultado.lng;
      
      if (lat && lng) {
        const location = new window.google.maps.LatLng(lat, lng);

        // Destruir mapa anterior si existe para forzar reinicio completo
        if (mapInstanceRef.current) {
          // Cerrar cualquier Street View activo
          const streetViewPanorama = mapInstanceRef.current.getStreetView();
          if (streetViewPanorama) {
            streetViewPanorama.setVisible(false);
          }
          // Limpiar el contenedor del mapa
          if (mapRef.current) {
            mapRef.current.innerHTML = '';
          }
        }

        // Crear nueva instancia del mapa (siempre crear nueva para evitar problemas con Street View)
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          center: location,
          zoom: 16,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ],
          streetViewControl: true,
          fullscreenControl: true
        });

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
        infoWindowRef.current = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 0.5rem;">
              <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 700;">${resultado.localVotacion}</h3>
              <p style="margin: 0; font-size: 0.875rem; color: #64748b;">${resultado.direccion}</p>
            </div>
          `
        });

        markerRef.current.addListener('click', () => {
          if (infoWindowRef.current) {
            infoWindowRef.current.open(mapInstanceRef.current, markerRef.current);
          }
        });

        // Listener para detectar cuando se activa Street View y limpiarlo al cambiar de local
        mapInstanceRef.current.addListener('streetview_changed', () => {
          const streetViewPanorama = mapInstanceRef.current.getStreetView();
          if (streetViewPanorama && streetViewPanorama.getVisible()) {
            streetViewServiceRef.current = streetViewPanorama;
          }
        });
      } else {
        // Fallback: geocodificar si no hay coordenadas
        const geocoder = new window.google.maps.Geocoder();
        const address = `${resultado.direccion}, ${resultado.distrito}, ${resultado.departamento}, Perú`;

        geocoder.geocode({ address: address }, (results: any, status: string) => {
          if (status === 'OK' && results && results[0]) {
            const location = results[0].geometry.location;

            // Destruir mapa anterior si existe
            if (mapInstanceRef.current) {
              const streetViewPanorama = mapInstanceRef.current.getStreetView();
              if (streetViewPanorama) {
                streetViewPanorama.setVisible(false);
              }
              if (mapRef.current) {
                mapRef.current.innerHTML = '';
              }
            }

            // Crear nueva instancia del mapa
            mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
              center: location,
              zoom: 16,
              styles: [
                {
                  featureType: 'poi',
                  elementType: 'labels',
                  stylers: [{ visibility: 'off' }]
                }
              ],
              streetViewControl: true,
              fullscreenControl: true
            });

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
            infoWindowRef.current = new window.google.maps.InfoWindow({
              content: `
                <div style="padding: 0.5rem;">
                  <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 700;">${resultado.localVotacion}</h3>
                  <p style="margin: 0; font-size: 0.875rem; color: #64748b;">${resultado.direccion}</p>
                </div>
              `
            });

            markerRef.current.addListener('click', () => {
              if (infoWindowRef.current) {
                infoWindowRef.current.open(mapInstanceRef.current, markerRef.current);
              }
            });

            // Listener para Street View
            mapInstanceRef.current.addListener('streetview_changed', () => {
              const streetViewPanorama = mapInstanceRef.current.getStreetView();
              if (streetViewPanorama && streetViewPanorama.getVisible()) {
                streetViewServiceRef.current = streetViewPanorama;
              }
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
    } else if (resultado?.direccion) {
      const encodedAddress = encodeURIComponent(`${resultado.direccion}, ${resultado.distrito}, ${resultado.departamento}, Perú`);
      const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
      window.open(url, '_blank');
    }
  };

  const handleOpenDirections = () => {
    if (resultado?.lat && resultado?.lng) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${resultado.lat},${resultado.lng}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="donde-votar">
      <div className="donde-votar__container">
        {/* Title and Subtitle */}
        <div className="donde-votar__title-section">
          <h1 className="donde-votar__title">¿Dónde Voto?</h1>
          <p className="donde-votar__subtitle">
            Encuentra tu centro de votación con tu DNI
          </p>
        </div>

        {/* Search Form Card */}
        <section className="donde-votar__form-card">
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

        {/* Results Section - 2 Column Layout */}
        {resultado && (
          <>
            {/* Two Column Layout: Left (Location Card) + Right (Map Card) */}
            <div className="donde-votar__results-grid">
              {/* Left Column: Location Card */}
              <div className="donde-votar__location-card">
                <div className="donde-votar__location-header">
                  <div className="donde-votar__location-icon">
                    <MapPin size={24} />
                  </div>
                  <div className="donde-votar__location-content">
                    <span className="donde-votar__location-label">LOCAL DE VOTACIÓN</span>
                    <h2 className="donde-votar__location-name">{resultado.localVotacion}</h2>
                    <p className="donde-votar__location-address">{resultado.direccion}</p>
                  </div>
                </div>

                {/* Horario de Votación - Mini Card */}
                <div className="donde-votar__schedule-card">
                  <Clock size={20} className="donde-votar__schedule-icon" />
                  <div className="donde-votar__schedule-content">
                    <span className="donde-votar__schedule-label">Horario de Votación</span>
                    <span className="donde-votar__schedule-time">7:00 AM - 4:00 PM</span>
                  </div>
                </div>

                {/* Mesa, Distrito, Departamento - 3 Columns */}
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

                {/* Nombre Completo */}
                <div className="donde-votar__user-info">
                  <div className="donde-votar__user-icon">
                    <User size={24} />
                  </div>
                  <div className="donde-votar__user-content">
                    <span className="donde-votar__user-label">NOMBRE COMPLETO</span>
                    <span className="donde-votar__user-value">{resultado.nombreCompleto}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Map Card */}
              <div className="donde-votar__map-card">
                <div className="donde-votar__map-header">
                  <MapPin size={20} className="donde-votar__map-header-icon" />
                  <span className="donde-votar__map-header-text">{resultado.distrito}</span>
                </div>
                <div 
                  ref={mapRef} 
                  className="donde-votar__map-container"
                ></div>
                <div className="donde-votar__map-buttons">
                  <button 
                    className="donde-votar__map-button"
                    onClick={handleOpenGoogleMaps}
                  >
                    <MapPin size={18} />
                    Abrir en Google Maps
                  </button>
                  {resultado?.lat && resultado?.lng && (
                    <button 
                      className="donde-votar__map-button donde-votar__map-button--primary"
                      onClick={handleOpenDirections}
                    >
                      <Navigation size={18} />
                      Como LLego?
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Three Cards Grid: Instrucciones, Seguridad, Transporte */}
            <div className="donde-votar__info-cards-grid">
              {/* Card 1: Instrucciones */}
              <div className="donde-votar__info-card">
                <div className="donde-votar__info-card-header">
                  <div className="donde-votar__info-card-icon">
                    <FileText size={20} />
                  </div>
                  <h4 className="donde-votar__info-card-title">Instrucciones para Votar</h4>
                </div>
                <ul className="donde-votar__info-card-list">
                  <li><CheckCircle size={14} /> Lleva tu DNI original y en buen estado</li>
                  <li><CheckCircle size={14} /> No uses ropa con logos políticos</li>
                  <li><CheckCircle size={14} /> Llega temprano para evitar aglomeraciones</li>
                  <li><CheckCircle size={14} /> Respeta las indicaciones de los miembros de mesa</li>
                </ul>
              </div>

              {/* Card 2: Seguridad */}
              <div className="donde-votar__info-card">
                <div className="donde-votar__info-card-header">
                  <div className="donde-votar__info-card-icon donde-votar__info-card-icon--shield">
                    <Shield size={20} />
                  </div>
                  <h4 className="donde-votar__info-card-title">Seguridad</h4>
                </div>
                <ul className="donde-votar__info-card-list">
                  <li><CheckCircle size={14} /> No compartas tu DNI con desconocidos</li>
                  <li><CheckCircle size={14} /> Verifica que estés en el centro correcto</li>
                  <li><CheckCircle size={14} /> Reporta cualquier irregularidad a las autoridades</li>
                  <li><CheckCircle size={14} /> No lleves objetos prohibidos al centro de votación</li>
                </ul>
              </div>

              {/* Card 3: Transporte */}
              <div className="donde-votar__info-card">
                <div className="donde-votar__info-card-header">
                  <div className="donde-votar__info-card-icon donde-votar__info-card-icon--bus">
                    <Bus size={20} />
                  </div>
                  <h4 className="donde-votar__info-card-title">Transporte</h4>
                </div>
                {resultado.transporte ? (
                  <>
                   
                    {resultado.transporte.rutas && resultado.transporte.rutas.length > 0 && (
                      <>
                        <p className="donde-votar__transport-label">Rutas disponibles:</p>
                        <ul className="donde-votar__info-card-list">
                          {resultado.transporte.rutas.map((ruta, index) => (
                            <li key={index}>
                              <span className="donde-votar__route-arrow">→</span>
                              {ruta}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    {resultado.transporte.tiempoAprox && (
                      <p className="donde-votar__transport-time">
                        <strong>Tiempo aprox.:</strong> {resultado.transporte.tiempoAprox}
                      </p>
                    )}
                  </>
                ) : (
                  <ul className="donde-votar__info-card-list">
                    <li><span className="donde-votar__route-arrow">→</span> Transporte público disponible</li>
                    <li><span className="donde-votar__route-arrow">→</span> Servicio de taxi disponible en la zona</li>
                  </ul>
                )}
              </div>
            </div>
          </>
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
