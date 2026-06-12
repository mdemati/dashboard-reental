'use client'

import { useState } from 'react'
import type { Dictionary } from '@/lib/dictionary'
import { ArrowRightIcon } from './Icons'

type Status = 'idle' | 'sending' | 'success' | 'error'

const field =
  'w-full rounded-lg border border-clay-200 bg-cream px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-clay-400 focus:outline-none focus:ring-2 focus:ring-clay-300'
const label = 'mb-1.5 block text-sm font-medium text-charcoal/80'

export default function B2BForm({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<Status>('idle')
  const f = dict.b2b.form

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const res = await fetch('/api/b2b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('success')
      e.currentTarget.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p role="status" className="rounded-xl2 bg-sage-100 p-6 text-sage-600">
        {f.success}
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="b-business" className={label}>
            {f.business} *
          </label>
          <input id="b-business" name="business" required className={field} />
        </div>
        <div>
          <label htmlFor="b-type" className={label}>
            {f.type} *
          </label>
          <select id="b-type" name="type" required defaultValue="" className={field}>
            <option value="" disabled>
              —
            </option>
            {f.typeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="b-contact" className={label}>
            {f.contact} *
          </label>
          <input id="b-contact" name="contact" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="b-phone" className={label}>
            {f.phone} *
          </label>
          <input id="b-phone" name="phone" type="tel" required autoComplete="tel" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="b-email" className={label}>
            {f.email} *
          </label>
          <input id="b-email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="b-message" className={label}>
          {f.message}
        </label>
        <textarea id="b-message" name="message" rows={4} className={field} />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-terracotta">
          {f.error}
        </p>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full sm:w-auto">
        {status === 'sending' ? f.sending : f.submit}
        {status !== 'sending' && <ArrowRightIcon className="h-4 w-4" />}
      </button>
    </form>
  )
}
