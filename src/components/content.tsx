
import { useSession } from "next-auth/react";

import { NoteCard } from "~/components/note-card";
import { NoteEditor } from "~/components/note-editor";
import { api } from "~/utils/api";
import { TopicsList } from "./topics-list";
import { useSelectedTopic } from "~/store/topicStore";


export const Content = () => {

    const [selectedTopic, setSelectedTopic] = useSelectedTopic((state) => [state.selectedTopic, state.setSelectedTopic])
    const { data: sessionData } = useSession()


    const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
        {
            topicId: selectedTopic?.id ?? ""
        },
        {
            enabled: sessionData?.user !== undefined && selectedTopic !== null
        }
    )

    const createNote = api.note.create.useMutation({
        onSuccess: () => {
            void refetchNotes();
        }
    })

    return (
        <div className="gap-2 px-5 lg:grid lg:grid-cols-4">
            <div className="hidden px-2 lg:block">
                <TopicsList selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />
            </div>
            <div className="col-span-3">
                <p>{selectedTopic?.title}</p>
                <div>
                    {notes?.map((note) => (
                        <div key={note.id} className="mt-5">
                            <NoteCard
                                note={note}
                                onSuccessDelete={() => void refetchNotes()}
                            />
                        </div>
                    ))}
                    {notes === undefined || notes.length == 0 && <p className="block text-2xl text-center">Create new note &#128071;</p>}
                </div>
                <NoteEditor
                    onSave={({ title, content }) => {
                        void createNote.mutate({
                            title,
                            content,
                            topicId: selectedTopic?.id ?? ""
                        })
                    }}
                    isSaveLoading={createNote.isLoading}
                />
            </div>
        </div>
    )
}