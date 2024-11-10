import { useRef } from "react";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";

function QrCode() {
  const shareUrl = window.location.href;
  const url = shareUrl.replace("qrcode", "");
  const qrRef = useRef(null);

  const downloadQRCode = () => {
    const svg = qrRef.current.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
      downloadLink.download = "qrcode.png";
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div ref={qrRef}>
      <h1 className="mb-5">QR Code</h1>
      <div
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 300,
          width: "100%",
        }}
      >
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={url}
          viewBox={`0 0 256 256`}
        />
      </div>
      <div className="flex flex-row gap-5 items-center mt-7 justify-center">
        <button
          className="text-white bg-[#3B1E54] hover:bg-[#532b78] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          onClick={downloadQRCode}
        >
          Download
        </button>
        <Link to="/notes">
          <button className="text-white bg-[#3B1E54] hover:bg-[#532b78] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default QrCode;
