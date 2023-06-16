import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect } from "react"
import { themeChange } from "theme-change"

const themes = ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter",]

export const Header = () => {
    const { data: sessionData } = useSession()

    useEffect(() => {
        themeChange(false)
        // 👆 false parameter is required for react project
    }, [])

    return (
        <div className="navbar bg-neutral text-neutral-content">
            <div className="flex-1 pl-5 font-bold">
                <select data-choose-theme defaultValue={"default"} className="hidden w-full mr-5 text-xl max-w-fit select bg-accent text-accent-content lg:block ">
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
                {sessionData?.user?.name ? <h1 className="text-3xl">{`Notes for ${sessionData.user.name}`}</h1> : ''}
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown-end dropdown">
                    {sessionData?.user ? (
                        <label
                            tabIndex={0}
                            className="btn-ghost btn-circle avatar btn"
                            onClick={() => void signOut()}
                        >
                            <div className="w-10 rounded-full">
                                <Image
                                    className="rounded-full"
                                    fill
                                    src={sessionData?.user?.image ?? ""}
                                    alt={sessionData?.user?.name ?? ""}
                                />
                            </div>
                        </label>
                    ) : (
                        <button
                            className="btn-ghost rounded-btn btn"
                            onClick={() => void signIn()}
                        >
                            Sign in
                        </button>
                    )}
                </div>
            </div>
        </div>

    )
}