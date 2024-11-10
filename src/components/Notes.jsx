import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromNotes } from "../redux/slice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import { FormatDate } from "../utlis/formatDate";


function Notes() {
  const notes = useSelector((state) => state.notes.notes);

  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const filteredData = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete (noteId){
    dispatch(removeFromNotes(noteId));
  }

 

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
    <div className="flex flex-col gap-y-3">
      {/* Search */}
      <div className="w-full flex gap-3 px-4 py-2 border-[rgba(7,3,3,1)] rounded-[0.3rem] border border-[rgba(128,121,121,0.3)]  mt-6">
        <input
          type="search"
          placeholder="Search paste here..."
          className="focus:outline-none w-full bg-transparent placeholder:black"
          value={searchTerm} // Bind the input to searchTerm state
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
        />
      </div>

      {/* All Pastes */}
      <div className="flex flex-col border border-[rgba(7,3,3,1)] py-4 rounded-[0.4rem]">
        <h2 className="px-4 text-4xl text-[#3B1E54] font-bold border-b border-[rgba(7,3,3,1)] pb-4">
          All Pastes
        </h2>
        <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
          {filteredData.length > 0 ? (
            filteredData.map((note) => (
              <div
                key={note?._id}
                className="border border-[rgba(7,3,3,1)] w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.3rem]"
              >
                {/* heading and Description */}
                <div className="w-[50%] flex flex-col space-y-3">
                  <p className="text-4xl font-semibold text-left text-[#3B1E54]">{note?.title}</p>
                  <p className="text-sm text-[#5f2887] font-normal line-clamp-3 max-w-[80%] text-left text-[#707070]">
                    {note?.content}
                  </p>
                </div>

                {/* icons */}
                <div className="flex flex-col gap-y-4 sm:items-end">
                  <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                    <button
                      className="p-2 rounded-[0.2rem] bg-[#5f2887] border border-[#c7c7c7]  hover:bg-transparent group hover:border-blue-500"
                      // onClick={() => toast.error("Not working")}
                    >
                      <Link to={`/?notesId=${note?._id}`}>
                        <PencilLine
                          className="text-white group-hover:text-blue-500"
                          size={20}
                        />
                      </Link>
                    </button>
                    <button
                      className="p-2 rounded-[0.2rem] bg-[#5f2887] border border-[#c7c7c7]  hover:bg-transparent group hover:border-pink-500"
                      onClick={() => handleDelete(note?._id)}
                    >
                      <Trash2
                        className="text-white group-hover:text-pink-500"
                        size={20}
                      />
                    </button>

                    <button className="p-2 rounded-[0.2rem] bg-[#5f2887] border border-[#c7c7c7]  hover:bg-transparent group hover:border-orange-500">
                      <a href={`/notes/${note?._id}`} target="_blank">
                        <Eye
                          className="text-white group-hover:text-orange-500"
                          size={20}
                        />
                      </a>
                    </button>
                    <button
                      className="p-2 rounded-[0.2rem] bg-[#5f2887] border border-[#c7c7c7]  hover:bg-transparent group hover:border-green-500"
                      onClick={() => {
                        navigator.clipboard.writeText(note?.content);
                        toast.success("Copied to Clipboard");
                      }}
                    >
                      <Copy
                        className="text-white group-hover:text-green-500"
                        size={20}
                      />
                    </button>
                    
                  </div>

                  <div className="gap-x-2 flex ">
                    <Calendar className="text-black" size={20} />
                    {FormatDate(note?.createdAt)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-2xl text-center w-full text-chileanFire-500">
              No Data Found
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
}

export default Notes;