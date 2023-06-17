import { useState } from 'react'

import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import remarkGfm from 'remark-gfm'

import { type Note } from '@prisma/client'
import { api } from '~/utils/api'

export const NoteCard = ({
    note,
    onSuccessDelete
}: {
    note: Note,
    onSuccessDelete: () => void
}) => {

    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [isWrap, setIsWrap] = useState<boolean>(false)

    const deleteNote = api.note.delete.useMutation({
        onSuccess: onSuccessDelete
    })

    return (
        <div className='mt-5 border shadow-xl card border-base-300 dg-base-100'>
            <div className='p-1 m-0 lg:p-3 card-body'>
                <div className={`collapse-arrow ${isExpanded ? "collapse-open" : ''} collapse`}
                >
                    <div className='text-xl font-bold cursor-pointer collapse-title'
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {note.title}
                    </div>
                    <div className='collapse-content'>
                        <article className='prose lg:prose-xl'>
                            <label className="flex justify-start gap-4 cursor-pointer label">
                                <span className="label-text">Wrap long code lines</span>
                                <input type="checkbox"
                                    checked={isWrap}
                                    onChange={() => setIsWrap(!isWrap)}
                                    className="checkbox" />
                            </label>
                            <ReactMarkdown
                                className='max-w-[80vw]'
                                remarkPlugins={[remarkGfm]}
                                // eslint-disable-next-line react/no-children-prop
                                children={note.content}
                                components={{
                                    code({ inline, className, children, ...props }) {
                                        const match = /language-(\w+)/.exec(className || '')
                                        return !inline && match ? (
                                            <SyntaxHighlighter
                                                {...props}
                                                // eslint-disable-next-line react/no-children-prop
                                                children={String(children).replace(/\n$/, '')}
                                                wrapLongLines={isWrap}
                                                style={dracula}
                                                language={match[1]}
                                                PreTag="div"
                                            />
                                        ) : (
                                            <code {...props} className={className}>
                                                {children}
                                            </code>
                                        )
                                    }
                                }}
                            />
                        </article>
                    </div>
                </div>
                <div className='flex justify-end mx-2 card-action'>
                    <button disabled={deleteNote.isLoading || deleteNote.isSuccess} className='px-5 btn-warning btn-xs btn' onClick={() => deleteNote.mutate({ id: note.id })}>
                        {(deleteNote.isLoading || deleteNote.isSuccess) && <span className='loading loading-xs' />}
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}