import React, { useState, useEffect } from 'react';
import { Sun } from 'lucide-react';

export default function WeatherWidget() {
  const [weather, setWeather] = useState<any>(null);

  const getTempColor = (temp: number) => {
    if (temp < 0) return "text-blue-900 border-blue-900/30 bg-blue-900/10";
    if (temp <= 15) return "text-blue-400 border-blue-400/30 bg-blue-400/10";
    if (temp <= 25) return "text-green-500 border-green-500/30 bg-green-500/10";
    if (temp <= 35) return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10";
    if (temp <= 45) return "text-orange-500 border-orange-500/30 bg-orange-500/10";
    if (temp <= 60) return "text-red-500 border-red-500/30 bg-red-500/10";
    return "text-purple-400 border-white/30 bg-purple-900/20";
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=Africa/Maputo`);
          const weatherData = await weatherRes.json();
          const geoRes = await fetch(`/api/geocode?lat=${latitude}&lng=${longitude}`);
          const geoData = await geoRes.json();
          let province = "Desconhecido", district = "";
          if (geoData.results && geoData.results[0]) {
            const components = geoData.results[0].address_components;
            province = components.find((c: any) => c.types.includes("administrative_area_level_1"))?.long_name || "Desconhecido";
            district = components.find((c: any) => c.types.includes("administrative_area_level_2"))?.long_name || "";
          }
          if (weatherData.current && weatherData.daily) {
            setWeather({
              temp: weatherData.current.temperature_2m,
              max: weatherData.daily.temperature_2m_max[0],
              min: weatherData.daily.temperature_2m_min[0],
              location: `${province}${district ? ` / ${district}` : ""}`
            });
          }
        } catch (e) { console.error("Erro ao buscar dados:", e); }
      }, async (error) => {
        console.warn("Geolocalização negada, usando padrão (Songo):", error);
        try {
          const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=-15.6&longitude=32.7&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=Africa/Maputo`);
          const data = await res.json();
          if (data.current && data.daily) {
            setWeather({
              temp: data.current.temperature_2m,
              max: data.daily.temperature_2m_max[0],
              min: data.daily.temperature_2m_min[0],
              location: "Tete / Cahora-Bassa"
            });
          }
        } catch (e) { console.error("Erro ao buscar clima padrão:", e); }
      });
    } else {
        (async () => {
          try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=-15.6&longitude=32.7&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=Africa/Maputo`);
            const data = await res.json();
            if (data.current && data.daily) {
              setWeather({
                temp: data.current.temperature_2m,
                max: data.daily.temperature_2m_max[0],
                min: data.daily.temperature_2m_min[0],
                location: "Tete / Cahora-Bassa"
              });
            }
          } catch (e) { console.error("Erro ao buscar clima padrão:", e); }
        })();
    }
  }, []);

  return (
    <div className={`flex items-center gap-2 text-[9px] px-2 py-1 rounded-lg border ${weather ? getTempColor(weather.temp) : "border-slate-800 text-slate-500 bg-slate-900"}`}>
      <Sun size={10} />
      <span className="font-bold uppercase">Clima:</span>
      {weather ? (
        <>
          <span className="font-bold">{weather.location}</span>
          <span>{weather.temp.toFixed(0)}°C</span>
          <span className="opacity-70">(Max: {weather.max.toFixed(0)}°C / Min: {weather.min.toFixed(0)}°C)</span>
        </>
      ) : (
        <span>Carregando...</span>
      )}
    </div>
  );
}
