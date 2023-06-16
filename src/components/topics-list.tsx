import { type Topic } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { api } from "~/utils/api";


export const TopicsList = ({
    selectedTopic,
    setSelectedTopic,
    className
}: {
    className?: string,
    selectedTopic: Topic | null,
    setSelectedTopic: (selectedTopic: Topic | null) => void
}) => {

    const { data: sessionData } = useSession()


    const { data: topics, refetch: refetchTopics, isFetching: isTopicsFetching } = api.topic.getAll.useQuery(
        undefined,
        {
            enabled: sessionData?.user !== undefined,
        }
    );

    useEffect(() => {
        if (topics !== undefined) {
            setSelectedTopic(selectedTopic ?? topics[0] ?? null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topics])

    const createTopic = api.topic.create.useMutation({
        onSuccess: () => {
            void refetchTopics()
        }
    })

    const deleteTopic = api.topic.delete.useMutation({
        onSuccess: () => {
            void refetchTopics()
        }
    })

    return (
        <div className={className}>
            <ul className="w-full gap-2 p-2 border menu border-accent rounded-box bg-base-100">
                {topics?.map((topic) => (
                    <li className="flex flex-row items-center justify-between flex-nowrap" key={topic.id}>
                        <Link
                            className="w-full"
                            href={'#'}
                            onClick={(e) => {
                                e.preventDefault()
                                setSelectedTopic(topic)
                            }}
                        >
                            {topic.title}
                        </Link>
                        <button
                            disabled={deleteTopic.isLoading}
                            className="btn btn-xs btn-square btn-warning"
                            onClick={() => {
                                deleteTopic.mutate({ id: topic.id })
                                setSelectedTopic(null)
                            }}
                        >
                            {
                                deleteTopic.isLoading ?
                                    <span className="mt-1 loading loading-xs" />
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                            }

                        </button>
                    </li>
                ))}
                {isTopicsFetching && <div className="flex justify-center w-full"><div className="m-3 loading loading-bars loading-lg" /></div>}
                {topics === undefined || topics.length == 0 && <p>Create new topic &#128071;</p>}
            </ul>
            <div className="divider"></div>
            <input
                type="text"
                placeholder="New topic"
                className="w-full input-bordered input input-accent input-sm"
                onKeyDown={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value.length > 0) {
                        createTopic.mutate({
                            title: e.currentTarget.value
                        })
                        e.currentTarget.value = ""
                    }
                }}
            />
        </div>
    )
}