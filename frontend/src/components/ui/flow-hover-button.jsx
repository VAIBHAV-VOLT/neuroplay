import { cn } from '../../lib/utils';

export function FlowHoverButton({ icon, children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        `relative cursor-pointer z-0 flex items-center justify-center gap-2 overflow-hidden rounded-full
        border border-zinc-300 bg-zinc-100
        px-6 py-2.5 font-semibold text-zinc-800 transition-all duration-500
        before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5]
        before:rounded-[100%] before:bg-zinc-800 before:transition-transform before:duration-1000 before:content-['']
        hover:scale-105 hover:text-zinc-100 hover:before:translate-x-[0%] hover:before:translate-y-[0%] active:scale-95`,
        className
      )}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
