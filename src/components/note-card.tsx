import { useState } from 'react'

import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

import { type Note } from '@prisma/client'

export const NoteCard = ({
    note,
    onDelete
}: {
    note: Note,
    onDelete: () => void
}) => {

    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    return (
        <div className='mt-5 border shadow-xl card border-base-300 dg-base-100'>
            <div className='p-3 m-0 card-body'>
                <div className={`collapse-arrow ${isExpanded ? "collapse-open" : ''} collapse`}
                >
                    <div className='text-xl font-bold cursor-pointer collapse-title'
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {note.title}
                    </div>
                    <div className='collapse-content'>
                        <article className='prose lg:prose-xl'>
                            <ReactMarkdown>{note.content}</ReactMarkdown>
                        </article>
                    </div>
                </div>
                <div className='flex justify-end mx-2 card-action'>
                    <button className='px-5 btn-warning btn-xs btn' onClick={onDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}