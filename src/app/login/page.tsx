'use client'
import { supabase } from '@/lib/supabaseClient'

export default function SocialLogin() {
    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
        if (error) {
            alert('Google ile giriş hatası: ' + error.message)
        }
    }

    return (
        <button
            onClick={handleGoogleLogin}
            className="bg-red-600 text-white px-4 py-2 rounded"
        >
            Google ile Giriş Yap
        </button>
    )
}
