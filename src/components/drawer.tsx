import { type FC, type PropsWithChildren } from 'react'
import { useSelectedTopic } from '~/store/topicStore'
import { TopicsList } from './topics-list'
import { signIn, useSession } from 'next-auth/react'

const themes = ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter",]


export const Drawer: FC<PropsWithChildren<unknown>> = ({ children }) => {

    const { data: sessionData } = useSession()

    const [selectedTopic, setSelectedTopic] = useSelectedTopic((state) => [state.selectedTopic, state.setSelectedTopic])

    return (
        <div className='z-50 drawer bg-neutral text-neutral-content'>
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="flex items-center justify-center pl-4 lg:hidden">
                <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </label>
            </div>

            <div className='flex flex-col drawer-content'>
                {children}
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <div className="h-full p-4 menu w-80 bg-base-200">
                    <div className='flex justify-between'>
                        <select data-choose-theme defaultValue={"default"} className="w-full mr-5 text-xl max-w-fit select bg-accent text-accent-content ">
                            {themes.map(theme => (
                                <option
                                    data-theme={theme}
                                    key={theme}
                                    value={theme}
                                >
                                    {theme}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="my-drawer" className="mb-2 btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </label>
                    </div>
                    {
                        sessionData?.user ?
                            <TopicsList className='mt-8' selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />
                            :
                            <button
                                className="mt-8 btn-primary btn-lg rounded-btn btn"
                                onClick={() => void signIn()}
                            >
                                Sign in
                            </button>
                    }
                </div>


            </div>
        </div>
    )
}