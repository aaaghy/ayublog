"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/siteConfig";

type WeatherNow = {
  province?: string;
  city?: string;
  district?: string;
  weather?: string;
  temperature?: number;
  temp_max?: number;
  temp_min?: number;
};

export default function SiteDashboard() {
  const [timeStr, setTimeStr] = useState("");
  const [weatherText, setWeatherText] = useState("正在获取当地天气...");

  useEffect(() => {
    const updateTime = () => {
      setTimeStr(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch("https://uapis.cn/api/v1/misc/weather?lang=zh&forecast=true", {
      signal: ctrl.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((data: WeatherNow) => {
        const place = [data.city, data.district].filter(Boolean).join("");
        const now = data.temperature != null ? `${data.temperature}°C` : "";
        const range =
          data.temp_min != null && data.temp_max != null
            ? `今日 ${data.temp_min}~${data.temp_max}°C`
            : "";
        const text = [place || data.province, data.weather, now, range]
          .filter(Boolean)
          .join("  ");
        setWeatherText(text || "天气暂不可用");
      })
      .catch(() => {
        if (!ctrl.signal.aborted) setWeatherText("天气暂不可用");
      });
    return () => ctrl.abort();
  }, []);

  return (
    <div className="md:col-span-12 rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl overflow-hidden flex flex-col md:flex-row items-stretch transition-colors duration-700 h-auto md:h-20 group">
      <div className="bg-slate-900 dark:bg-black text-white px-8 py-4 md:py-0 flex items-center justify-center font-mono text-2xl md:text-3xl font-black tracking-widest shadow-inner relative overflow-hidden group-hover:text-indigo-400 transition-colors">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        {timeStr || "00:00:00"}
        <div className="absolute left-0 right-0 top-1/2 h-px bg-black/50" />
      </div>

      <div className="flex-1 px-6 py-4 md:py-0 flex flex-wrap items-center justify-between gap-4 text-xs md:text-sm font-bold text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-start">
          <span className="text-indigo-600 dark:text-indigo-400 font-black">
            {weatherText}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-center md:justify-end">
          {siteConfig.icpConfig?.name && (
            <a
              href={siteConfig.icpConfig.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-500 transition-colors border-b border-dashed border-slate-400 dark:border-slate-500 pb-0.5"
            >
              {siteConfig.icpConfig.name}
            </a>
          )}
          {siteConfig.moeIcpConfig?.name && (
            <a
              href={siteConfig.moeIcpConfig.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-500 transition-colors border-b border-dashed border-slate-400 dark:border-slate-500 pb-0.5"
            >
              {siteConfig.moeIcpConfig.name}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
