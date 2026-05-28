// ── Spinner ──────────────────────────────────────────────────────────────────
export function Spinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-10 w-10' }
  return (
    <svg
      className={`animate-spin-slow text-brand-400 ${sizes[size]} ${className}`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  )
}

// ── Skeleton card ─────────────────────────────────────────────────────────────
export function SkeletonCard() {
  return (
    <div className="card p-5 space-y-3 animate-fade-in">
      <div className="skeleton h-4 w-3/4" />
      <div className="skeleton h-3 w-full" />
      <div className="skeleton h-3 w-2/3" />
      <div className="flex justify-between items-center pt-2">
        <div className="skeleton h-5 w-20 rounded-full" />
        <div className="skeleton h-7 w-16 rounded-lg" />
      </div>
    </div>
  )
}

// ── Empty state ───────────────────────────────────────────────────────────────
export function EmptyState({ title = 'Sin tareas', description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4 animate-fade-in">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600/10 border border-brand-500/20">
        <svg className="h-8 w-8 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <div>
        <p className="font-semibold text-white">{title}</p>
        {description && <p className="text-sm text-white/40 mt-1">{description}</p>}
      </div>
      {action}
    </div>
  )
}

// ── Select field ──────────────────────────────────────────────────────────────
export function SelectField({ label, id, options, value, onChange, required, className = '' }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-white/70">
          {label} {required && <span className="text-brand-400">*</span>}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="input-field appearance-none cursor-pointer"
      >
        {options.map((opt) =>
          typeof opt === 'string'
            ? <option key={opt} value={opt}>{opt}</option>
            : <option key={opt.value} value={opt.value}>{opt.label}</option>
        )}
      </select>
    </div>
  )
}

// ── Input field ───────────────────────────────────────────────────────────────
export function InputField({ label, id, type = 'text', placeholder, value, onChange, required, min, className = '' }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-white/70">
          {label} {required && <span className="text-brand-400">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
        className="input-field"
      />
    </div>
  )
}

// ── Textarea field ────────────────────────────────────────────────────────────
export function TextareaField({ label, id, placeholder, value, onChange, rows = 3, className = '' }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-white/70">
          {label}
        </label>
      )}
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className="input-field resize-none"
      />
    </div>
  )
}
