import { useState } from "react"

import CodeMirror from "@uiw/react-codemirror"
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { languages } from "@codemirror/language-data"
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

export const NoteEditor = ({
    onSave,
    isSaveLoading,
}: {
    onSave: (note: { title: string, content: string }) => void,
    isSaveLoading: boolean,
}) => {

    const [code, setCode] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    return (
        <div className="mt-5 border shadow-xl border-neutral card bg-base-100">
            <div className="p-1 lg:p-7 card-body">
                <h2 className="card-title">
                    <input
                        type="text"
                        placeholder="Note title"
                        className="w-full font-bold input-primary input input-lg"
                        value={title}
                        onChange={(e) => setTitle(e.currentTarget.value)}
                    />
                </h2>
                <CodeMirror
                    value={code}
                    theme={vscodeDark}
                    width="100%"
                    height="30vh"
                    minWidth="100%"
                    minHeight="30vh"
                    extensions={[
                        markdown({ base: markdownLanguage, codeLanguages: languages }),
                    ]}
                    onChange={(value) => setCode(value)}
                    className="border border-base-100"
                />
            </div>
            <div className="justify-end p-3 card-actions">
                <button
                    onClick={() => {
                        onSave({
                            title,
                            content: code
                        })
                        setCode('')
                        setTitle('')
                    }}
                    className="btn-primary btn"
                    disabled={title.trim().length === 0 || code.trim().length === 0 || isSaveLoading}
                >
                    {isSaveLoading && <span className='loading loading-xs' />}
                    Save
                </button>

            </div>
        </div>
    )
}