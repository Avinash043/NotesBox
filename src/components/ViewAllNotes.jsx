import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { QrCodeIcon } from "lucide-react";

import { Link } from "react-router-dom";
import {
  EmailShareButton,
  EmailIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  FacebookShareButton,
  FacebookIcon,
} from "react-share";
import { useSelector } from "react-redux";

function ViewAllNotes() {
  const { id } = useParams();
  const allNotes = useSelector((state) => state.notes.notes);

  const note = allNotes.filter((p) => p._id === id)[0];

  const shareUrl = window.location.href;

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <input
          type="text"
          placeholder="Title"
          value={note.title}
          disabled
          className="w-full text-black border border-input rounded-md p-2"
        />
        <div
          className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
        >
          <div
            className={`w-full rounded-t flex items-center justify-between gap-x-4  py-2 border-b border-[rgba(128,121,121,0.3)]`}
          >
            <div className="w-full flex items-center select-none group overflow-hidden">
              {/* Circle and copy btn */}
              <div
                className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}
              >
                <div className="flex flex-row gap-3">
                  <FacebookShareButton url={shareUrl}>
                    <FacebookIcon round={true} size={28}></FacebookIcon>
                  </FacebookShareButton>
                  <EmailShareButton url={shareUrl}>
                    <EmailIcon round={true} size={28}></EmailIcon>
                  </EmailShareButton>
                  <LinkedinShareButton url={shareUrl}>
                    <LinkedinIcon round={true} size={28}></LinkedinIcon>
                  </LinkedinShareButton>
                  <WhatsappShareButton url={shareUrl}>
                    <WhatsappIcon round={true} size={28}></WhatsappIcon>
                  </WhatsappShareButton>
                  <TelegramShareButton url={shareUrl}>
                    <TelegramIcon round={true} size={28}></TelegramIcon>
                  </TelegramShareButton>
                  <Link to={"qrcode"}>
                    <QrCodeIcon></QrCodeIcon>
                  </Link>
                  <button
                    className={`flex justify-center items-center  transition-all duration-300 ease-in-out group`}
                    onClick={() => {
                      navigator.clipboard.writeText(note.content);
                      toast.success("Copied to Clipboard");
                    }}
                  >
                    <Copy className="group-hover:text-success-500" size={20} />
                  </button>
                </div>
              </div>
              {/*Copy  button */}
            </div>
          </div>

          {/* TextArea */}
          <textarea
            value={note.content}
            disabled
            placeholder="Write Your Content Here...."
            className="w-full p-3  focus-visible:ring-0"
            style={{
              caretColor: "#000",
            }}
            rows={20}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewAllNotes;
