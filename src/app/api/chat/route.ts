import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
    const { prompt } = await req.json()

    if (!prompt) {
        return NextResponse.json({ error: 'Prompt eksik' }, { status: 400 })
    }

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        })

        const message = completion.choices[0].message.content
        return NextResponse.json({ message })
    } catch (err) {
        console.error('OpenAI API hatası:', err)
        return NextResponse.json({ error: 'GPT isteği başarısız oldu' }, { status: 500 })
    }
}
