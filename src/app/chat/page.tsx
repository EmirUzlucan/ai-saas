'use client'
import { useState } from 'react'

export default function ChatPage() {
    const [prompt, setPrompt] = useState('')
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
        })

        const data = await res.json()
        setResponse(data.message || 'Bir cevap alınamadı.')
        setLoading(false)
    }

    return (
        <main className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl mb-4">GPT-4 Chat</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <textarea
                    rows={4}
                    className="p-2 border rounded"
                    placeholder="Bir şeyler yaz..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                    {loading ? 'Gönderiliyor...' : 'Gönder'}
                </button>
            </form>

            {response && (
                <div className="mt-6 p-4 border rounded bg-gray-100 text-black">
                    <strong>Cevap:</strong>
                    <p>{response}</p>
                </div>
            )}
        </main>
    )
}
