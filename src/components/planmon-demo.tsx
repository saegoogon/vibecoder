"use client";

import { useEffect, useEffectEvent, useState } from "react";

const initialTasks = [
  { id: 1, label: "수학 유형 문제 8개 풀기", done: true, xp: 24 },
  { id: 2, label: "과학 반응식 암기 20분", done: false, xp: 18 },
  { id: 3, label: "국어 문법 오답 체크", done: false, xp: 15 },
];

export default function PlanmonDemo() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [xp, setXp] = useState(420);
  const [tasks, setTasks] = useState(initialTasks);

  const tick = useEffectEvent(() => {
    setSeconds((current) => {
      if (current <= 1) {
        setRunning(false);
        setXp((value) => Math.min(value + 40, 500));
        return 25 * 60;
      }

      return current - 1;
    });
  });

  useEffect(() => {
    if (!running) {
      return;
    }

    const timer = window.setInterval(() => {
      tick();
    }, 1000);

    return () => window.clearInterval(timer);
  }, [running]);

  const completedCount = tasks.filter((task) => task.done).length;

  const toggleTask = (id: number) => {
    setTasks((current) =>
      current.map((task) => {
        if (task.id !== id) {
          return task;
        }

        const nextDone = !task.done;
        setXp((value) =>
          nextDone ? Math.min(value + task.xp, 500) : Math.max(value - task.xp, 0),
        );

        return { ...task, done: nextDone };
      }),
    );
  };

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainingSeconds = String(seconds % 60).padStart(2, "0");
  const xpPercent = Math.round((xp / 500) * 100);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <section className="glass-card rounded-[2.5rem] p-7">
        <p className="text-sm font-semibold tracking-[0.25em] text-[#5C7C92] uppercase">
          Interactive Demo
        </p>
        <h2 className="mt-3 font-display text-4xl text-[#16324F]">
          실제로 눌러보는 공부 루프
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-[#355070]">
          Render에 올린 뒤 친구들이 바로 체험할 수 있도록 타이머, 할 일, 경험치 상승을
          작은 데모로 넣었습니다.
        </p>

        <div className="mt-6 rounded-[2rem] bg-[#16324F] p-6 text-white shadow-[0_18px_40px_rgba(27,73,101,0.2)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.22em] text-white/70 uppercase">
                Focus Timer
              </p>
              <p className="mt-2 font-display text-5xl">
                {minutes}:{remainingSeconds}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-white/10 px-4 py-3 text-right">
              <p className="text-xs tracking-[0.22em] text-white/70 uppercase">XP</p>
              <p className="text-3xl font-bold">{xp}/500</p>
            </div>
          </div>
          <div className="mt-5 h-3 rounded-full bg-white/15">
            <div
              className="h-3 rounded-full bg-[#FFBF69]"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              className="rounded-full bg-[#FFBF69] px-5 py-3 text-sm font-semibold text-[#16324F] hover:-translate-y-0.5"
              onClick={() => setRunning((value) => !value)}
              type="button"
            >
              {running ? "타이머 멈추기" : "타이머 시작"}
            </button>
            <button
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:-translate-y-0.5"
              onClick={() => {
                setRunning(false);
                setSeconds(25 * 60);
              }}
              type="button"
            >
              25분으로 초기화
            </button>
          </div>
        </div>
      </section>

      <section className="glass-card rounded-[2.5rem] p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.25em] text-[#5C7C92] uppercase">
              Demo Checklist
            </p>
            <h3 className="mt-3 font-display text-4xl text-[#16324F]">
              할 일을 끝내면 바로 성장
            </h3>
          </div>
          <span className="rounded-full bg-[#F0F8F8] px-4 py-2 text-sm font-semibold text-[#1B4965]">
            {completedCount} / {tasks.length} 완료
          </span>
        </div>

        <div className="mt-6 space-y-3">
          {tasks.map((task) => (
            <button
              key={task.id}
              className={`flex w-full items-center justify-between rounded-[1.6rem] border px-4 py-4 text-left ${
                task.done
                  ? "border-[#2EC4B6]/30 bg-[#F0FBF8]"
                  : "border-[#16324F]/10 bg-white/70"
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
                  <p className="text-sm font-semibold text-[#16324F]">{task.label}</p>
                  <p className="text-xs tracking-[0.2em] text-[#7C8FA2] uppercase">
                    reward +{task.xp} xp
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-[#16324F] px-3 py-1 text-xs font-semibold text-white">
                {task.done ? "완료" : "진행 전"}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ["다음 진화", xp >= 500 ? "해금 완료" : "20분 남음"],
            ["연속 공부", "12일"],
            ["오늘 랭크", "상위 9%"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[1.5rem] bg-white/75 p-4">
              <p className="text-xs tracking-[0.2em] text-[#7C8FA2] uppercase">{label}</p>
              <p className="mt-2 text-2xl font-bold text-[#16324F]">{value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
