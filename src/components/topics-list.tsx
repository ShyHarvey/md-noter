import { type Topic } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { api } from "~/utils/api";


export const TopicsList = ({
    selectedTopic,
    setSelectedTopic
}: {
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

    return (
        <>
            <ul className="w-full gap-2 p-2 border menu border-accent rounded-box bg-base-100">
                {topics?.map((topic) => (
                    <li key={topic.id}>
                        <Link
                            href={'#'}
                            onClick={(e) => {
                                e.preventDefault()
                                setSelectedTopic(topic)
                            }}
                        >
                            {topic.title}
                        </Link>
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
                    if (e.key === "Enter") {
                        createTopic.mutate({
                            title: e.currentTarget.value
                        })
                        e.currentTarget.value = ""
                    }
                }}
            />
        </>
    )
}