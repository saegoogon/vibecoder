"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import { computeLevel, defaultStudioData, type StudioData } from "@/lib/planmon";

const storageKey = "planmon-studio-v2";
const deviceStorageKey = "planmon-device-id";

function getInitialStudioData(): StudioData {
  if (typeof window === "undefined") return defaultStudioData;
  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return defaultStudioData;

  try {
    return JSON.parse(raw) as StudioData;
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

export default function PlanmonStudio() {
  const [studioData, setStudioData] = useState<StudioData>(getInitialStudioData);
  const [newSubject, setNewSubject] = useState("");
  const [newTask, setNewTask] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(
    () => getInitialStudioData().subjects[0]?.name || defaultStudioData.subjects[0].name,
  );
  const [deviceId] = useState(getDeviceId);
  const [syncLabel, setSyncLabel] = useState("브라우저에만 저장 중");
  const [cloudEnabled, setCloudEnabled] = useState(false);
  const initializedSync = useRef(false);
  const deferredName = useDeferredValue(studioData.studentName);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(studioData));
  }, [studioData]);

  useEffect(() => {
    if (!deviceId) return;

    let active = true;

    const loadProfile = async () => {
      try {
        const response = await fetch(`/api/studio?deviceId=${deviceId}`, {
          cache: "no-store",
        });

        if (response.status === 503) {
          if (active) {
            setCloudEnabled(false);
            setSyncLabel("브라우저 저장 전용 모드");
          }
          return;
        }

        const payload = (await response.json()) as { profile?: StudioData | null };
        if (!active) return;

        setCloudEnabled(true);
        setSyncLabel("클라우드 연결 완료");

        if (payload.profile) {
          setStudioData(payload.profile);
          setSelectedSubject(
            payload.profile.subjects[0]?.name || defaultStudioData.subjects[0].name,
          );
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
          body: JSON.stringify({ deviceId, profile: studioData }),
        });

        if (!response.ok) throw new Error("save failed");
        setSyncLabel("클라우드 저장 완료");
      } catch {
        setSyncLabel("브라우저 저장으로 전환됨");
      }
    }, 800);

    return () => window.clearTimeout(timer);
  }, [cloudEnabled, deviceId, studioData]);

  const { xp, level, completedCount } = computeLevel(studioData);

  const addSubject = () => {
    const name = newSubject.trim();
    if (!name) return;

    setStudioData((current) => ({
      ...current,
      subjects: [
        ...current.subjects,
        { id: Date.now(), name, examDate: "2026-05-20", progress: 10 },
      ],
    }));
    setSelectedSubject(name);
    setNewSubject("");
  };

  const addTask = () => {
    const text = newTask.trim();
    if (!text) return;

    setStudioData((current) => ({
      ...current,
      tasks: [
        ...current.tasks,
        { id: Date.now(), text, subject: selectedSubject, done: false },
      ],
    }));
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    setStudioData((current) => ({
      ...current,
      tasks: current.tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    }));
  };

  const updateProgress = (id: number, value: number) => {
    setStudioData((current) => ({
      ...current,
      subjects: current.subjects.map((subject) =>
        subject.id === id ? { ...subject, progress: value } : subject,
      ),
    }));
  };

  return (
    <main className="site-shell mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-20 pt-5 sm:px-7 lg:px-10">
      <header className="poster-card mb-6 px-5 py-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="section-chip">Planmon Studio</div>
            <h1 className="mt-4 font-display text-5xl leading-none text-[#17273a]">
              {deferredName}의
              <br />
              공부 스테이션
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#41556b]">
              친구에게 보여줘도 촌스럽지 않게, 하지만 바로 이해되는 구조로 정리했습니다.
              브라우저 저장은 기본으로 되고, Supabase가 연결되면 같은 화면이 클라우드에도
              저장됩니다.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="panel-outline px-4 py-3 text-sm font-bold text-[#17273a]">
              저장 상태: {syncLabel}
            </div>
            <Link
              className="sticker-button bg-[#17273a] px-5 py-3 text-center text-sm font-bold text-white"
              href="/checkout"
            >
              플랜 업그레이드
            </Link>
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
        <article className="hard-card bg-[#fffdf8] p-6">
          <div className="note-label mint">Profile</div>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-[#17273a]">이름</span>
              <input
                className="form-field"
                onChange={(event) =>
                  setStudioData((current) => ({
                    ...current,
                    studentName: event.target.value,
                  }))
                }
                value={studioData.studentName}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-[#17273a]">이번 목표</span>
              <textarea
                className="form-field min-h-28"
                onChange={(event) =>
                  setStudioData((current) => ({
                    ...current,
                    goal: event.target.value,
                  }))
                }
                value={studioData.goal}
              />
            </label>
          </div>

          <div className="mt-6 rounded-[1.6rem] bg-[#17273a] p-5 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/60">
              Character Status
            </p>
            <p className="mt-3 font-display text-4xl">플래니 Lv. {level}</p>
            <p className="mt-2 text-sm text-white/80">누적 XP {xp}</p>
            <div className="mt-4 h-3 rounded-full bg-white/15">
              <div
                className="h-3 rounded-full bg-[#ffb24b]"
                style={{ width: `${Math.min((xp % 90) / 0.9, 100)}%` }}
              />
            </div>
          </div>
        </article>

        <div className="grid gap-6">
          <section className="grid gap-4 md:grid-cols-3">
            <div className="metric-box bg-[#26c3a7] text-[#17273a]">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0d5f53]">완료한 할 일</span>
              <strong>{completedCount}</strong>
            </div>
            <div className="metric-box bg-[#ffb24b] text-[#17273a]">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#8a4b00]">등록 과목</span>
              <strong>{studioData.subjects.length}</strong>
            </div>
            <div className="metric-box bg-[#17273a] text-white">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">이번 목표</span>
              <p className="mt-3 text-lg font-bold leading-7">{studioData.goal}</p>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
            <article className="poster-card p-6">
              <div className="section-chip">Subjects</div>
              <h2 className="mt-4 font-display text-4xl leading-none text-[#17273a]">과목 관리</h2>
              <div className="mt-5 flex gap-3">
                <input
                  className="form-field flex-1"
                  onChange={(event) => setNewSubject(event.target.value)}
                  placeholder="새 과목 이름"
                  value={newSubject}
                />
                <button
                  className="sticker-button bg-[#ffb24b] px-4 py-3 text-sm font-bold text-[#17273a]"
                  onClick={addSubject}
                  type="button"
                >
                  추가
                </button>
              </div>
              <div className="mt-5 space-y-4">
                {studioData.subjects.map((subject) => (
                  <div key={subject.id} className="panel-outline p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-[#17273a]">{subject.name}</p>
                        <p className="text-sm text-[#5C7C92]">시험일 {subject.examDate}</p>
                      </div>
                      <span className="note-label mint">{subject.progress}%</span>
                    </div>
                    <input
                      className="mt-4 w-full accent-[#26c3a7]"
                      max={100}
                      min={0}
                      onChange={(event) => updateProgress(subject.id, Number(event.target.value))}
                      type="range"
                      value={subject.progress}
                    />
                  </div>
                ))}
              </div>
            </article>

            <article className="poster-card p-6">
              <div className="section-chip">Tasks</div>
              <h2 className="mt-4 font-display text-4xl leading-none text-[#17273a]">오늘의 공부</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_140px_auto]">
                <input
                  className="form-field"
                  onChange={(event) => setNewTask(event.target.value)}
                  placeholder="새 공부 할 일"
                  value={newTask}
                />
                <select
                  className="form-field"
                  onChange={(event) => setSelectedSubject(event.target.value)}
                  value={selectedSubject}
                >
                  {studioData.subjects.map((subject) => (
                    <option key={subject.id} value={subject.name}>
                      {subject.name}
                    </option>
                  ))}
                </select>
                <button
                  className="sticker-button bg-[#17273a] px-4 py-3 text-sm font-bold text-white"
                  onClick={addTask}
                  type="button"
                >
                  추가
                </button>
              </div>
              <div className="mt-5 space-y-3">
                {studioData.tasks.map((task) => (
                  <button
                    key={task.id}
                    className={`flex w-full items-center justify-between rounded-[1.5rem] border-2 px-4 py-4 text-left ${
                      task.done
                        ? "border-[#26c3a7]/30 bg-[#effcf7]"
                        : "border-[#17273a]/8 bg-white/70"
                    }`}
                    onClick={() => toggleTask(task.id)}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                          task.done ? "bg-[#26c3a7] text-white" : "bg-[#EEF3F6] text-[#7C8FA2]"
                        }`}
                      >
                        {task.done ? "완" : ""}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#17273a]">{task.text}</p>
                        <p className="text-xs uppercase tracking-[0.2em] text-[#7C8FA2]">
                          {task.subject}
                        </p>
                      </div>
                    </div>
                    <span className="note-label navy">{task.done ? "완료" : "진행 중"}</span>
                  </button>
                ))}
              </div>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
}
