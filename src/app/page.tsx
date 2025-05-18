'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Home() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Mevcut kullanıcıyı al
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Oturum değişikliklerini dinle
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <main className="p-6">
      {user ? (
        <div>
          <h1>Hoşgeldin, {user.email}</h1>
          <button
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
            onClick={() => supabase.auth.signOut()}
          >
            Çıkış Yap
          </button>
        </div>
      ) : (
        <div>
          <h1>Giriş yapılmadı</h1>
          <a href="/login" className="text-blue-600 underline">
            Giriş Yap
          </a>
        </div>
      )}
    </main>
  )
}
