import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  useBoolean,
  useClickAway,
  useDocumentTitle,
  useEffectOnce,
  useFocus,
  useHover,
  useIsomorphicEffect,
  useRafState,
  useScroll,
  useToggle,
  useUnmount,
} from '@sober/react-use-core';

function DemoFrame({ children }: { children: ReactNode }) {
  return <div className="not-prose my-6 rounded-xl bg-slate-50 p-6">{children}</div>;
}

export function UseBooleanDemo() {
  const [open, { setTrue, setFalse }] = useBoolean(false);

  return (
    <DemoFrame>
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">删除项目</h3>
            <p className="mt-1 text-sm text-slate-500">删除后无法恢复。</p>
          </div>
          <button
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
            onClick={setTrue}
          >
            删除
          </button>
        </div>
        {open && (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-800">确认删除这个项目？</p>
            <div className="mt-3 flex justify-end gap-2">
              <button
                className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-white"
                onClick={setFalse}
              >
                取消
              </button>
              <button className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700">
                确认删除
              </button>
            </div>
          </div>
        )}
      </div>
    </DemoFrame>
  );
}

export function UseToggleDemo() {
  const [cycle, toggleCycle] = useToggle('月付', '年付');
  const isYearly = cycle === '年付';

  return (
    <DemoFrame>
      <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-1">
        <button
          className={`rounded-md px-4 py-2 text-sm font-medium ${!isYearly ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
          onClick={toggleCycle}
        >
          月付
        </button>
        <button
          className={`rounded-md px-4 py-2 text-sm font-medium ${isYearly ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
          onClick={toggleCycle}
        >
          年付
        </button>
      </div>
    </DemoFrame>
  );
}

export function UseFocusDemo() {
  const [ref, focus, blur, isFocused] = useFocus<HTMLInputElement>();

  return (
    <DemoFrame>
      <div className="max-w-md rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <label className="block text-sm font-medium text-slate-700">搜索</label>
        <div className="mt-2 flex gap-2">
          <input
            ref={ref}
            className={`min-w-0 flex-1 rounded-md border px-3 py-2 text-sm outline-none ${
              isFocused ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-300'
            }`}
            placeholder="输入关键词"
          />
          <button
            className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
            onClick={() => focus()}
          >
            聚焦
          </button>
          <button
            className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            onClick={blur}
          >
            失焦
          </button>
        </div>
        <p className="mt-2 text-xs text-slate-500">{isFocused ? '输入框已聚焦' : '输入框未聚焦'}</p>
      </div>
    </DemoFrame>
  );
}

export function UseHoverDemo() {
  const [ref, isHover] = useHover<HTMLDivElement>();

  return (
    <DemoFrame>
      <div
        ref={ref}
        className={`rounded-lg border p-5 transition ${
          isHover ? 'border-blue-300 bg-blue-50 shadow-md' : 'border-slate-200 bg-white shadow-sm'
        }`}
      >
        <h3 className="text-sm font-semibold text-slate-900">客户资料</h3>
        <p className="mt-1 text-sm text-slate-500">悬浮后展示更多操作入口。</p>
        <div
          className={`mt-4 flex gap-2 transition-opacity ${isHover ? 'opacity-100' : 'opacity-0'}`}
        >
          <button className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white">查看</button>
          <button className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700">
            编辑
          </button>
        </div>
      </div>
    </DemoFrame>
  );
}

export function UseClickAwayDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useClickAway(ref, () => setOpen(false));

  return (
    <DemoFrame>
      <div ref={ref} className="relative inline-block">
        <button
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          onClick={() => setOpen((value) => !value)}
        >
          账号
        </button>
        {open && (
          <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
            <button className="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100">
              个人资料
            </button>
            <button className="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100">
              账户设置
            </button>
            <button className="block w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">
              退出登录
            </button>
          </div>
        )}
      </div>
    </DemoFrame>
  );
}

export function UseScrollDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const { y } = useScroll(ref);
  const progress = Math.min(Math.round((y / 480) * 100), 100);

  return (
    <DemoFrame>
      <div className="max-w-lg rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">阅读进度</span>
          <span className="text-sm text-slate-500">{progress}%</span>
        </div>
        <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-blue-600" style={{ width: `${progress}%` }} />
        </div>
        <div
          ref={ref}
          className="h-56 overflow-auto rounded-md border border-slate-200 p-4 text-sm leading-7 text-slate-600"
        >
          <p className="font-medium text-slate-900">滚动这块内容</p>
          {Array.from({ length: 18 }).map((_, index) => (
            <p key={index}>第 {index + 1} 段内容，用于制造滚动区域。</p>
          ))}
        </div>
      </div>
    </DemoFrame>
  );
}

export function UseDocumentTitleDemo() {
  const [title, setTitle] = useState('订单详情');

  useDocumentTitle(title);

  return (
    <DemoFrame>
      <div className="max-w-md rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <label className="block text-sm font-medium text-slate-700">页面标题</label>
        <input
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <p className="mt-3 rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">
          当前 document.title 会同步为：{title}
        </p>
      </div>
    </DemoFrame>
  );
}

export function UseEffectOnceDemo() {
  const [mountedAt, setMountedAt] = useState('');

  useEffectOnce(() => {
    setMountedAt(new Date().toLocaleTimeString());
  });

  return (
    <DemoFrame>
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="text-sm font-medium text-slate-900">组件挂载时间</div>
        <div className="mt-2 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {mountedAt || '等待挂载'}
        </div>
      </div>
    </DemoFrame>
  );
}

export function UseUnmountDemo() {
  const [visible, setVisible] = useState(true);
  const [message, setMessage] = useState('面板还未卸载');

  return (
    <DemoFrame>
      <div className="space-y-3">
        {visible ? (
          <UnmountPanel
            onClose={() => setVisible(false)}
            onUnmount={() => setMessage('临时面板已卸载')}
          />
        ) : null}
        <div className="text-sm text-slate-600">{message}</div>
        {!visible && (
          <button
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-white"
            onClick={() => setVisible(true)}
          >
            重新挂载
          </button>
        )}
      </div>
    </DemoFrame>
  );
}

function UnmountPanel({ onClose, onUnmount }: { onClose: () => void; onUnmount: () => void }) {
  useUnmount(onUnmount);

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-amber-900">临时面板</h3>
          <p className="mt-1 text-sm text-amber-700">关闭组件时会执行卸载清理逻辑。</p>
        </div>
        <button
          className="rounded-md bg-amber-600 px-3 py-1.5 text-sm text-white hover:bg-amber-700"
          onClick={onClose}
        >
          关闭
        </button>
      </div>
    </div>
  );
}

export function UseRafStateDemo() {
  const [position, setPosition] = useRafState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handler);

    return () => {
      window.removeEventListener('mousemove', handler);
    };
  }, [setPosition]);

  return (
    <DemoFrame>
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="text-sm font-medium text-slate-900">鼠标位置</div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-md bg-slate-50 p-3">
            <div className="text-xs text-slate-500">X</div>
            <div className="text-lg font-semibold text-slate-900">{position.x}</div>
          </div>
          <div className="rounded-md bg-slate-50 p-3">
            <div className="text-xs text-slate-500">Y</div>
            <div className="text-lg font-semibold text-slate-900">{position.y}</div>
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}

export function UseIsomorphicEffectDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useIsomorphicEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, []);

  return (
    <DemoFrame>
      <div ref={ref} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="text-sm font-medium text-slate-900">容器宽度</div>
        <div className="mt-3 rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-700">{width}px</div>
      </div>
    </DemoFrame>
  );
}
