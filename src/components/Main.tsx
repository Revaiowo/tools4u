import Service from "./Service";
import Tools4u from "./Tools4u";
import FileUpload from "./FileUpload";

function Main() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-20 w-full boder border-amber-300">
      {/* Taglines */}

      <div className="flex flex-col items-center gap-4  border-red-300">
        <p className="font-bold text-5xl text-center">
          All necessary <span className="text-amber-200">tools</span> for your
          files at one place.
        </p>
        <p className="text-center font- text-2xl max-w-2xl  border-pink-300">
          Convert any file format in seconds with our fast, free, and reliable
          online <span className="text-amber-200">tools</span> designed for
          everyone.
        </p>
      </div>

      <FileUpload />
      <Tools4u />
      <Service />
    </div>
  );
}

export default Main;
