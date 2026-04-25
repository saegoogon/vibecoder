"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import { computeLevel, cursorSkinMap, cursorSkins, defaultStudioData, type CursorProfile } from "@/lib/planmon";

const storageKey = "cursorverse-studio-v1";
const selectedSkinKey = "cursorverse-selected-skin";
const deviceStorageKey = "cursorverse-device-id";

function getInitialProfile(): CursorProfile {
  if (typeof window === "undefined") return defaultStudioData;
  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return defaultStudioData;

  try {
    return JSON.parse(raw) as CursorProfile;
  } catch {
    window.localStorage.removeItem(storageKey);
    return defaultStudioData;
  }
}

function getDeviceId() {
  if (typeof window === "undefined") return "";
  const existing = window.localStorage.getItem(deviceStorageKey);
  if (existing) return existing;

  const created = crypto.randomUUID();
  window.localStorage.setItem(deviceStorageKey, created);
  return created;
}

function applyCursorSkin(code: string) {
  const skin = cursorSkinMap[code];
  if (!skin) return;

  document.documentElement.style.setProperty("--cursor-default", skin.defaultCursor);
  document.documentElement.style.setProperty("--cursor-pointer", skin.pointerCursor);
  window.localStorage.setItem(selectedSkinKey, code);
  window.dispatchEvent(new CustomEvent("cursor-skin-change", { detail: code }));
}

export default function PlanmonStudio() {
  const [profile, setProfile] = useState<CursorProfile>(getInitialProfile);
  const [deviceId] = useState(getDeviceId);
  const [syncLabel, setSyncLabel] = useState("브라우저에만 저장 중");
  const [cloudEnabled, setCloudEnabled] = useState(false);
  const initializedSync = useRef(false);
  const deferredName = useDeferredValue(profile.displayName);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(profile));
    window.localStorage.setItem(selectedSkinKey, profile.selectedSkin);
    applyCursorSkin(profile.selectedSkin);
  }, [profile]);

  useEffect(() => {
    if (!deviceId) return;

    let active = true;

    const loadProfile = async () => {
      try {
        const response = await fetch(`/api/studio?deviceId=${deviceId}`, { cache: "no-store" });

        if (response.status === 503) {
          if (active) {
            setCloudEnabled(false);
            setSyncLabel("브라우저 저장 전용 모드");
          }
          return;
        }

        const payload = (await response.json()) as { profile?: CursorProfile | null };
        if (!active) return;

        setCloudEnabled(true);
        setSyncLabel("클라우드 연결 완료");

        if (payload.profile) {
          setProfile(payload.profile);
          applyCursorSkin(payload.profile.selectedSkin);
        }
      } catch {
        if (active) {
          setCloudEnabled(false);
          setSyncLabel("브라우저 저장 전용 모드");
        }
      } finally {
        initializedSync.current = true;
      }
    };

    void loadProfile();

    return () => {
      active = false;
    };
  }, [deviceId]);

  useEffect(() => {
    if (!deviceId || !initializedSync.current || !cloudEnabled) return;

    const timer = window.setTimeout(async () => {
      setSyncLabel("클라우드에 저장 중");

      try {
        const response = await fetch("/api/studio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deviceId, profile }),
        });

        if (!response.ok) throw new Error("save failed");
        setSyncLabel("클라우드 저장 완료");
      } catch {
        setSyncLabel("브라우저 저장으로 전환됨");
      }
    }, 800);

    return () => window.clearTimeout(timer);
  }, [cloudEnabled, deviceId, profile]);

  const { xp, level } = computeLevel(profile);
  const favoriteCount = profile.favoriteSkins.length;

  const toggleFavorite = (code: string) => {
    setProfile((current) => ({
      ...current,
      favoriteSkins: current.favoriteSkins.includes(code)
        ? current.favoriteSkins.filter((item) => item !== code)
        : [...current.favoriteSkins, code],
    }));
  };

  const selectSkin = (code: string) => {
    setProfile((current) => ({
      ...current,
      selectedSkin: code,
      clicks: current.clicks + 1,
    }));
  };

  return (
    <main className="site-shell mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-20 pt-5 sm:px-7 lg:px-10">
      <header className="poster-card mb-6 px-5 py-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="section-chip">Cursor Workshop</div>
            <h1 className="mt-4 font-display text-5xl leading-none text-[#09111f]">
              {deferredName}의
              <br />
              커서 작업실
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#41556b]">
              카드 하나를 누르면 이 사이트 전체의 커서가 바로 바뀝니다. 취향에 맞는 스킨을
              고르고, 즐겨찾기에 넣고, Supabase가 연결되어 있으면 그 상태를 클라우드에 저장할 수
              있습니다.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="panel-outline px-4 py-3 text-sm font-bold text-[#09111f]">
              저장 상태: {syncLabel}
            </div>
            <Link
              className="sticker-button bg-[#09111f] px-5 py-3 text-center text-sm font-bold text-white"
              href="/checkout"
            >
              프리미엄 팩 보기
            </Link>
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[0.74fr_1.26fr]">
        <article className="hard-card bg-[#fbfeff] p-6">
          <div className="note-label mint">Profile</div>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-[#09111f]">닉네임</span>
              <input
                className="form-field"
                onChange={(event) =>
                  setProfile((current) => ({
                    ...current,
                    displayName: event.target.value,
                  }))
                }
                value={profile.displayName}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-[#09111f]">소개</span>
              <textarea
                className="form-field min-h-28"
                onChange={(event) =>
                  setProfile((current) => ({
                    ...current,
                    bio: event.target.value,
                  }))
                }
                value={profile.bio}
              />
            </label>
          </div>

          <div className="mt-6 rounded-[1.7rem] bg-[#09111f] p-5 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/60">Collection Level</p>
            <p className="mt-3 font-display text-4xl">Lv. {level}</p>
            <p className="mt-2 text-sm text-white/80">누적 컬렉션 점수 {xp}</p>
            <div className="mt-4 h-3 rounded-full bg-white/15">
              <div
                className="h-3 rounded-full bg-[#12d6b1]"
                style={{ width: `${Math.min((xp % 180) / 1.8, 100)}%` }}
              />
            </div>
          </div>
        </article>

        <div className="grid gap-6">
          <section className="grid gap-4 md:grid-cols-3">
            <div className="metric-box bg-[#12d6b1] text-[#09111f]">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#006c58]">보유 스킨</span>
              <strong>{profile.ownedSkins.length}</strong>
            </div>
            <div className="metric-box bg-[#ffbe3b] text-[#09111f]">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#8a4b00]">즐겨찾기</span>
              <strong>{favoriteCount}</strong>
            </div>
            <div className="metric-box bg-[#09111f] text-white">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">현재 적용</span>
              <p className="mt-3 text-lg font-bold leading-7">
                {cursorSkinMap[profile.selectedSkin]?.name || "민트 애로우"}
              </p>
            </div>
          </section>

          <section className="poster-card p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="section-chip">Skin Library</div>
                <h2 className="mt-4 font-display text-4xl leading-none text-[#09111f]">마우스 스킨 보관함</h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-[#41556b]">
                카드를 누르면 바로 적용됩니다. 잠긴 스킨도 미리 볼 수 있지만, 계속 쓰려면 프리미엄
                팩을 열어야 합니다.
              </p>
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-2">
              {cursorSkins.map((skin) => {
                const owned = profile.ownedSkins.includes(skin.code);
                const favorite = profile.favoriteSkins.includes(skin.code);
                const active = profile.selectedSkin === skin.code;

                return (
                  <article
                    key={skin.code}
                    className={`rounded-[1.6rem] border p-5 ${
                      active
                        ? "border-[#09111f] bg-[#eefaff] shadow-[10px_10px_0_rgba(9,17,31,0.9)]"
                        : "border-[#09111f]/8 bg-white/78"
                    }`}
                  >
                    <div
                      className="relative flex h-32 items-center justify-center rounded-[1.4rem]"
                      style={{
                        background: `radial-gradient(circle at top, ${skin.colors[1]}, transparent 56%), linear-gradient(180deg, ${skin.colors[0]}, ${skin.colors[1]})`,
                      }}
                    >
                      <div className="absolute left-4 top-4 rounded-full bg-white/30 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                        {skin.tier}
                      </div>
                      <div className="relative flex h-16 w-16 rotate-[-16deg] items-center justify-center rounded-[1.2rem] border-2 border-white/60 bg-white/88">
                        <div className="h-0 w-0 border-b-[34px] border-l-[14px] border-r-[14px] border-b-[#0a1320] border-l-transparent border-r-transparent" />
                      </div>
                    </div>

                    <div className="mt-4 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-3xl leading-none text-[#09111f]">{skin.name}</h3>
                        <p className="mt-2 text-sm font-semibold text-[#597089]">{skin.tagline}</p>
                      </div>
                      <span className={`note-label ${owned ? "mint" : "gold"}`}>
                        {owned ? "보유중" : "잠금"}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-7 text-[#41556b]">{skin.description}</p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        className="sticker-button bg-[#09111f] px-4 py-3 text-sm font-bold text-white"
                        onClick={() => selectSkin(skin.code)}
                        type="button"
                      >
                        {active ? "적용됨" : "바로 적용"}
                      </button>
                      <button
                        className="ghost-button px-4 py-3 text-sm font-bold text-[#09111f]"
                        onClick={() => toggleFavorite(skin.code)}
                        type="button"
                      >
                        {favorite ? "즐겨찾기 해제" : "즐겨찾기"}
                      </button>
                      {!owned ? (
                        <Link
                          className="ghost-button px-4 py-3 text-sm font-bold text-[#09111f]"
                          href={skin.tier === "Pro+" ? "/checkout?plan=pro_plus" : "/checkout?plan=pro"}
                        >
                          팩 열기
                        </Link>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
