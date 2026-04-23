"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import { computeLevel, defaultStudioData, type StudioData } from "@/lib/planmon";

const storageKey = "planmon-studio-v2";
const deviceStorageKey = "planmon-device-id";

function getInitialStudioData(): StudioData {
  if (typeof window === "undefined") {
    return defaultStudioData;
  }

  const raw = window.localStorage.getItem(storageKey);

  if (!raw) {
    return defaultStudioData;
  }

  try {
    return JSON.parse(raw) as StudioData;
  } catch {
    window.localStorage.removeItem(storageKey);
    return defaultStudioData;
  }
}

function getDeviceId() {
  if (typeof window === "undefined") {
    return "";
  }

  const existing = window.localStorage.getItem(deviceStorageKey);

  if (existing) {
    return existing;
  }

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
  const [syncLabel, setSyncLabel] = useState("브라우저에 저장 중");
  const [cloudEnabled, setCloudEnabled] = useState(false);
  const initializedSync = useRef(false);
  const deferredName = useDeferredValue(studioData.studentName);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(studioData));
  }, [studioData]);

  useEffect(() => {
    if (!deviceId) {
      return;
    }

    let active = true;

    const loadProfile = async () => {
      try {
        const response = await fetch(`/api/studio?deviceId=${deviceId}`, { cache: "no-store" });

        if (response.status === 503) {
          if (active) {
            setCloudEnabled(false);
            setSyncLabel("브라우저 전용 저장");
          }
          return;
        }

        const payload = (await response.json()) as { profile?: StudioData | null };

        if (!active) {
          return;
        }

        setCloudEnabled(true);
        setSyncLabel("수파베이스 연결됨");

        if (payload.profile) {
          setStudioData(payload.profile);
          setSelectedSubject(payload.profile.subjects[0]?.name || defaultStudioData.subjects[0].name);
        }
      } catch {
        if (active) {
          setCloudEnabled(false);
          setSyncLabel("브라우저 전용 저장");
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
    if (!deviceId || !initializedSync.current || !cloudEnabled) {
      return;
    }

    const timer = window.setTimeout(async () => {
      setSyncLabel("수파베이스 저장 중");

      try {
        const response = await fetch("/api/studio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deviceId, profile: studioData }),
        });

        if (!response.ok) {
          throw new Error("save failed");
        }

        setSyncLabel("수파베이스에 저장됨");
      } catch {
        setSyncLabel("브라우저 저장으로 유지됨");
      }
    }, 800);

    return () => window.clearTimeout(timer);
  }, [cloudEnabled, deviceId, studioData]);

  const { xp, level, completedCount } = computeLevel(studioData);

  const addSubject = () => {
    const name = newSubject.trim();

    if (!name) {
      return;
    }

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

    if (!text) {
      return;
    }

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
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pb-16 pt-6 sm:px-8 lg:px-10">
      <header className="glass-card mb-8 rounded-[2rem] px-5 py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.25em] text-[#5C7C92] uppercase">
              Planmon Studio
            </p>
            <h1 className="mt-3 font-display text-4xl text-[#16324F] sm:text-5xl">
              {deferredName}의 공부 대시보드
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#355070]">
              지금 입력하는 내용은 브라우저에 즉시 저장되고, 수파베이스 환경변수가 연결되어 있으면 클라우드에도 함께 저장됩니다.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="rounded-full bg-white/70 px-4 py-3 text-sm font-semibold text-[#16324F]">
              저장 상태: {syncLabel}
            </div>
            <Link
              className="rounded-full bg-[#16324F] px-5 py-3 text-center text-sm font-semibold text-white hover:-translate-y-0.5"
              href="/checkout"
            >
              플랜 업그레이드
            </Link>
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <article className="glass-card rounded-[2rem] p-6">
          <p className="text-sm font-semibold tracking-[0.25em] text-[#5C7C92] uppercase">
            Profile
          </p>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#16324F]">이름</span>
              <input
                className="w-full rounded-[1.2rem] border border-[#16324F]/10 bg-white/80 px-4 py-3 outline-none"
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
              <span className="mb-2 block text-sm font-semibold text-[#16324F]">이번 목표</span>
              <textarea
                className="min-h-28 w-full rounded-[1.2rem] border border-[#16324F]/10 bg-white/80 px-4 py-3 outline-none"
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

          <div className="mt-6 rounded-[1.6rem] bg-[#16324F] p-5 text-white">
            <p className="text-sm font-semibold tracking-[0.25em] text-white/65 uppercase">
              Character Status
            </p>
            <p className="mt-3 font-display text-4xl">플래니 Lv. {level}</p>
            <p className="mt-2 text-sm text-white/80">누적 XP {xp}점</p>
            <div className="mt-4 h-3 rounded-full bg-white/15">
              <div
                className="h-3 rounded-full bg-[#FFBF69]"
                style={{ width: `${Math.min((xp % 90) / 0.9, 100)}%` }}
              />
            </div>
          </div>
        </article>

        <div className="grid gap-6">
          <section className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.8rem] bg-gradient-to-br from-[#2EC4B6] to-[#81E6D9] p-5 text-white shadow-lg">
              <p className="text-xs tracking-[0.2em] uppercase text-white/80">완료한 할 일</p>
              <p className="mt-3 text-4xl font-bold">{completedCount}</p>
            </div>
            <div className="rounded-[1.8rem] bg-gradient-to-br from-[#FFBF69] to-[#FFD9A0] p-5 text-[#16324F] shadow-lg">
              <p className="text-xs tracking-[0.2em] uppercase text-[#16324F]/70">등록 과목</p>
              <p className="mt-3 text-4xl font-bold">{studioData.subjects.length}</p>
            </div>
            <div className="rounded-[1.8rem] bg-gradient-to-br from-[#1B4965] to-[#4F86A6] p-5 text-white shadow-lg">
              <p className="text-xs tracking-[0.2em] uppercase text-white/80">이번 목표</p>
              <p className="mt-3 text-lg font-semibold leading-7">{studioData.goal}</p>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
            <article className="glass-card rounded-[2rem] p-6">
              <p className="text-sm font-semibold tracking-[0.25em] text-[#5C7C92] uppercase">
                Subjects
              </p>
              <h2 className="mt-2 font-display text-3xl text-[#16324F]">과목 관리</h2>
              <div className="mt-5 flex gap-3">
                <input
                  className="flex-1 rounded-[1.2rem] border border-[#16324F]/10 bg-white/80 px-4 py-3 outline-none"
                  onChange={(event) => setNewSubject(event.target.value)}
                  placeholder="새 과목 이름"
                  value={newSubject}
                />
                <button
                  className="rounded-[1.2rem] bg-[#16324F] px-4 py-3 text-sm font-semibold text-white"
                  onClick={addSubject}
                  type="button"
                >
                  추가
                </button>
              </div>
              <div className="mt-5 space-y-4">
                {studioData.subjects.map((subject) => (
                  <div key={subject.id} className="rounded-[1.5rem] border border-[#16324F]/8 bg-white/70 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold text-[#16324F]">{subject.name}</p>
                        <p className="text-sm text-[#5C7C92]">시험일 {subject.examDate}</p>
                      </div>
                      <span className="rounded-full bg-[#F0F8F8] px-3 py-1 text-sm font-semibold text-[#1B4965]">
                        {subject.progress}%
                      </span>
                    </div>
                    <input
                      className="mt-4 w-full accent-[#2EC4B6]"
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

            <article className="glass-card rounded-[2rem] p-6">
              <p className="text-sm font-semibold tracking-[0.25em] text-[#5C7C92] uppercase">
                Tasks
              </p>
              <h2 className="mt-2 font-display text-3xl text-[#16324F]">오늘의 공부</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_140px_auto]">
                <input
                  className="rounded-[1.2rem] border border-[#16324F]/10 bg-white/80 px-4 py-3 outline-none"
                  onChange={(event) => setNewTask(event.target.value)}
                  placeholder="새 공부 할 일"
                  value={newTask}
                />
                <select
                  className="rounded-[1.2rem] border border-[#16324F]/10 bg-white/80 px-4 py-3 outline-none"
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
                  className="rounded-[1.2rem] bg-[#16324F] px-4 py-3 text-sm font-semibold text-white"
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
                    className={`flex w-full items-center justify-between rounded-[1.5rem] border px-4 py-4 text-left ${
                      task.done
                        ? "border-[#2EC4B6]/30 bg-[#F0FBF8]"
                        : "border-[#16324F]/8 bg-white/70"
                    }`}
                    onClick={() => toggleTask(task.id)}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                          task.done ? "bg-[#2EC4B6] text-white" : "bg-[#EEF3F6] text-[#7C8FA2]"
                        }`}
                      >
                        {task.done ? "✓" : ""}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#16324F]">{task.text}</p>
                        <p className="text-xs tracking-[0.2em] text-[#7C8FA2] uppercase">
                          {task.subject}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#16324F] px-3 py-1 text-xs font-semibold text-white">
                      {task.done ? "완료" : "진행 전"}
                    </span>
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
