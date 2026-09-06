"use client";

import MediaFrame from "@/components/MediaFrame";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./KakaoMap.module.css";

type KakaoMapProps = {
  latitude: number;
  longitude: number;
  placeName: string;
  fallbackImage: string;
  className?: string;
};

type KakaoLatLng = object;

type KakaoMapInstance = {
  addControl: (control: object, position: object) => void;
  relayout: () => void;
  setCenter: (position: KakaoLatLng) => void;
};

type KakaoMarker = object;

type KakaoMaps = {
  load: (callback: () => void) => void;
  LatLng: new (latitude: number, longitude: number) => KakaoLatLng;
  Map: new (
    container: HTMLElement,
    options: {
      center: KakaoLatLng;
      level: number;
      draggable: boolean;
      scrollwheel: boolean;
    },
  ) => KakaoMapInstance;
  Marker: new (options: { map: KakaoMapInstance; position: KakaoLatLng; title: string }) => KakaoMarker;
  InfoWindow: new (options: { content: HTMLElement; removable: boolean }) => {
    open: (map: KakaoMapInstance, marker: KakaoMarker) => void;
  };
  ZoomControl: new () => object;
  ControlPosition: { RIGHT: object };
};

declare global {
  interface Window {
    kakao?: { maps: KakaoMaps };
  }
}

const KAKAO_MAP_SCRIPT_ID = "kakao-map-sdk";
let kakaoMapsPromise: Promise<KakaoMaps> | null = null;

export default function KakaoMap({ latitude, longitude, placeName, fallbackImage, className }: KakaoMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const appKey = process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY;
  const mapLinks = useMemo(() => {
    const destination = `${encodeURIComponent(placeName)},${latitude},${longitude}`;

    return {
      map: `https://map.kakao.com/link/map/${destination}`,
      directions: `https://map.kakao.com/link/to/${destination}`,
    };
  }, [latitude, longitude, placeName]);

  useEffect(() => {
    if (!appKey || !containerRef.current) return;

    let cancelled = false;
    let resizeObserver: ResizeObserver | undefined;

    loadKakaoMaps(appKey)
      .then((maps) => {
        if (cancelled || !containerRef.current) return;

        const position = new maps.LatLng(latitude, longitude);
        const map = new maps.Map(containerRef.current, {
          center: position,
          level: 3,
          draggable: true,
          scrollwheel: false,
        });
        const marker = new maps.Marker({ map, position, title: placeName });
        const label = document.createElement("strong");

        label.className = styles.placeLabel;
        label.textContent = placeName;

        const infoWindow = new maps.InfoWindow({ content: label, removable: false });
        infoWindow.open(map, marker);
        map.addControl(new maps.ZoomControl(), maps.ControlPosition.RIGHT);

        resizeObserver = new ResizeObserver(() => {
          map.relayout();
          map.setCenter(position);
        });
        resizeObserver.observe(containerRef.current);
        setIsReady(true);
      })
      .catch((error: unknown) => {
        console.error("카카오맵을 불러오지 못했습니다.", error);
      });

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
    };
  }, [appKey, latitude, longitude, placeName]);

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-kakao-map
      data-map-status={!appKey ? "missing-key" : isReady ? "ready" : "loading"}
    >
      <div
        ref={containerRef}
        className={styles.canvas}
        role="region"
        aria-label={`${placeName} 위치 카카오맵`}
      />

      {!isReady && (
        <div className={styles.fallback} aria-hidden="true">
          <MediaFrame
            className={styles.fallbackFrame}
            aspectRatio="1200 / 626"
            desktop={{ scale: 1.19, positionX: 0, positionY: 46.5 }}
            mobile={{ scale: 1.33, positionX: -23, positionY: 35.5 }}
          >
            <img src={fallbackImage} alt="" width={1247} height={777} />
          </MediaFrame>
        </div>
      )}

      {isReady && (
        <nav className={styles.actions} aria-label="카카오맵 바로가기">
          <a href={mapLinks.map} target="_blank" rel="noreferrer">
            카카오맵에서 보기
          </a>
          <a href={mapLinks.directions} target="_blank" rel="noreferrer">
            길찾기
          </a>
        </nav>
      )}
    </div>
  );
}

function loadKakaoMaps(appKey: string) {
  if (window.kakao?.maps?.Map) return Promise.resolve(window.kakao.maps);
  if (kakaoMapsPromise) return kakaoMapsPromise;

  kakaoMapsPromise = new Promise<KakaoMaps>((resolve, reject) => {
    const finishLoading = () => {
      const maps = window.kakao?.maps;

      if (!maps) {
        reject(new Error("Kakao Maps SDK namespace is unavailable."));
        return;
      }

      maps.load(() => resolve(maps));
    };

    const existingScript = document.getElementById(KAKAO_MAP_SCRIPT_ID) as HTMLScriptElement | null;
    if (existingScript) {
      if (window.kakao?.maps) {
        finishLoading();
      } else {
        existingScript.addEventListener("load", finishLoading, { once: true });
        existingScript.addEventListener("error", () => reject(new Error("Kakao Maps SDK request failed.")), {
          once: true,
        });
      }
      return;
    }

    const script = document.createElement("script");
    script.id = KAKAO_MAP_SCRIPT_ID;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(appKey)}&autoload=false`;
    script.async = true;
    script.addEventListener("load", finishLoading, { once: true });
    script.addEventListener("error", () => reject(new Error("Kakao Maps SDK request failed.")), { once: true });
    document.head.appendChild(script);
  }).catch((error: unknown) => {
    kakaoMapsPromise = null;
    throw error;
  });

  return kakaoMapsPromise;
}
