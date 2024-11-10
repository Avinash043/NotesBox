import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { addToNotes, resetToNotes, updateToNotes } from "../redux/slice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Copy, PlusCircle } from "lucide-react";

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const notesId = searchParams.get("notesId");
  const dispatch = useDispatch();
  const allNotes = useSelector((state) => state.notes.notes);

  function createNotes() {
    const notes = {
      title: title,
      content: value,
      _id: notesId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (notesId) {
      //update
      dispatch(updateToNotes(notes));
    } else {
      //create
      dispatch(addToNotes(notes));
    }
    setTitle("");
    setSearchParams({});
    setValue("");
  }

  useEffect(() => {
    if (notesId) {
      const note = allNotes.find((p) => p._id === notesId);
      if (note) {
        setTitle(note.title);
        setValue(note.content);
      }
    }
  }, [notesId, allNotes]);

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-row gap-x-6 items-start">
        <input
          className={`${
            notesId ? "w-[80%]" : "w-[85%]"
          } text-black border-[rgba(7,3,3,1)] bg-[#9B7EBD] border-input rounded-md p-2`}
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createNotes}
          className="text-white bg-[#3B1E54] hover:bg-[#532b78] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
        >
          {notesId ? " Update Notes" : "Create Notes"}
        </button>
        {notesId && (
          <button
            className="text-white bg-[#3B1E54] hover:bg-[#532b78] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            onClick={resetToNotes}
          >
            <PlusCircle size={20} />
          </button>
        )}
      </div>

      <div
        className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(7,3,3,1)] backdrop-blur-2xl`}
      >
        <div
          className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(7,3,3,1)]`}
        >
          <div className="w-full flex gap-x-[6px] items-center select-none group">
            <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />

            <div
              className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}
            />

            <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
          </div>
         
          <div
            className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}
          >
            {/*Copy  button */}
            <button
              className={`flex justify-center items-center  transition-all duration-300 ease-in-out group`}
              onClick={() => {
                navigator.clipboard.writeText(value);
                toast.success("Copied to Clipboard", {
                  position: "top-right",
                });
              }}
            >
              <Copy className="group-hover:text-success-500" size={20} />
            </button>
          </div>
        </div>

        {/* TextArea */}
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write Your Content Here...."
          className="w-full p-3  focus-visible:ring-0 bg-[#9B7EBD] text-[#000]"
          style={{
            caretColor: "#000",
          }}
          rows={20}
        />
      </div>
    </div>
  );
}

export default Home;
