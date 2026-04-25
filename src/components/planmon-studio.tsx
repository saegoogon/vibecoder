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
  const [syncLabel, setSyncLabel] = useState("브라우저 저장 중");
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
            setSyncLabel("브라우저 단독 모드");
          }
          return;
        }

        const payload = (await response.json()) as { profile?: CursorProfile | null };
        if (!active) return;

        setCloudEnabled(true);
        setSyncLabel("클라우드 연결됨");

        if (payload.profile) {
          setProfile(payload.profile);
          applyCursorSkin(payload.profile.selectedSkin);
        }
      } catch {
        if (active) {
          setCloudEnabled(false);
          setSyncLabel("브라우저 단독 모드");
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
      setSyncLabel("클라우드 저장 중");

      try {
        const response = await fetch("/api/studio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deviceId, profile }),
        });

        if (!response.ok) throw new Error("save failed");
        setSyncLabel("클라우드 저장 완료");
      } catch {
        setSyncLabel("브라우저 저장으로 전환");
      }
    }, 800);

    return () => window.clearTimeout(timer);
  }, [cloudEnabled, deviceId, profile]);

  const { xp, level } = computeLevel(profile);

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
            <div className="section-chip">pointer workshop</div>
            <h1 className="mt-4 font-display text-5xl leading-none text-white">
              {deferredName}의
              <br />
              포인터룸 작업실
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#9eadc1]">
              이 화면은 스킨 보관함이자 실시간 프리뷰 공간입니다. 카드를 누르는 순간 포인터가
              바뀌고, 마음에 들면 즐겨찾기에 넣고, 연결되어 있다면 클라우드에도 저장할 수 있습니다.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="panel-outline px-4 py-3 text-sm font-bold text-white">
              저장 상태: {syncLabel}
            </div>
            <Link
              className="sticker-button bg-[#a9ff2f] px-5 py-3 text-center text-sm font-bold text-[#081018]"
              href="/checkout"
            >
              팩 업그레이드
            </Link>
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[0.74fr_1.26fr]">
        <article className="hard-card p-6">
          <div className="note-label mint">profile</div>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-white">닉네임</span>
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
              <span className="mb-2 block text-sm font-bold text-white">소개</span>
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

          <div className="mt-6 rounded-[1.7rem] border border-white/8 bg-black/25 p-5 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/55">collection level</p>
            <p className="mt-3 font-display text-4xl">Lv. {level}</p>
            <p className="mt-2 text-sm text-white/75">누적 포인터 점수 {xp}</p>
            <div className="mt-4 h-3 rounded-full bg-white/10">
              <div
                className="h-3 rounded-full bg-[#a9ff2f]"
                style={{ width: `${Math.min((xp % 180) / 1.8, 100)}%` }}
              />
            </div>
          </div>
        </article>

        <div className="grid gap-6">
          <section className="grid gap-4 md:grid-cols-3">
            <div className="metric-box border border-white/8 bg-[#a9ff2f] text-[#081018]">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#304500]">owned</span>
              <strong>{profile.ownedSkins.length}</strong>
            </div>
            <div className="metric-box border border-white/8 bg-[#111723] text-white">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">favorite</span>
              <strong>{profile.favoriteSkins.length}</strong>
            </div>
            <div className="metric-box border border-white/8 bg-[#73d7ff] text-[#081018]">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#003648]">active</span>
              <p className="mt-3 text-lg font-bold leading-7">
                {cursorSkinMap[profile.selectedSkin]?.name || "스파크 민트"}
              </p>
            </div>
          </section>

          <section className="poster-card p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="section-chip">skin library</div>
                <h2 className="mt-4 font-display text-4xl leading-none text-white">포인터 스킨 보관함</h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-[#9eadc1]">
                좋아 보인다고 끝내지 않고 실제로 눌러보게 만드는 게 핵심입니다. 마음에 들면 바로
                적용하고, 아닌 건 넘기고, 아끼는 건 즐겨찾기에 넣으면 됩니다.
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
                        ? "border-[#a9ff2f]/55 bg-[#131a11] shadow-[0_0_0_1px_rgba(169,255,47,0.12)]"
                        : "border-white/8 bg-white/[0.02]"
                    }`}
                  >
                    <div
                      className="relative flex h-32 items-center justify-center rounded-[1.4rem]"
                      style={{
                        background: `linear-gradient(135deg, ${skin.colors[0]}22, ${skin.colors[1]}10 58%, rgba(8,13,18,0.95) 100%)`,
                      }}
                    >
                      <div className="absolute left-4 top-4 rounded-full bg-white/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                        {skin.tier}
                      </div>
                      <div className="relative flex h-16 w-16 rotate-[-16deg] items-center justify-center rounded-[1.2rem] border border-white/16 bg-white/90">
                        <div className="h-0 w-0 border-b-[34px] border-l-[14px] border-r-[14px] border-b-[#081018] border-l-transparent border-r-transparent" />
                      </div>
                    </div>

                    <div className="mt-4 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-3xl leading-none text-white">{skin.name}</h3>
                        <p className="mt-2 text-sm font-semibold text-[#9badc1]">{skin.tagline}</p>
                      </div>
                      <span className={`note-label ${owned ? "mint" : "gold"}`}>
                        {owned ? "owned" : "locked"}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-7 text-[#9eadc1]">{skin.description}</p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        className="sticker-button bg-[#a9ff2f] px-4 py-3 text-sm font-bold text-[#081018]"
                        onClick={() => selectSkin(skin.code)}
                        type="button"
                      >
                        {active ? "지금 적용 중" : "바로 적용"}
                      </button>
                      <button
                        className="ghost-button px-4 py-3 text-sm font-bold text-white"
                        onClick={() => toggleFavorite(skin.code)}
                        type="button"
                      >
                        {favorite ? "즐겨찾기 해제" : "즐겨찾기"}
                      </button>
                      {!owned ? (
                        <Link
                          className="ghost-button px-4 py-3 text-sm font-bold text-white"
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
