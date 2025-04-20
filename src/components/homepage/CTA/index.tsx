export default function CTA() {
  return (
    <div className="py-10 px-2 md:px-20">
      <div className="cta py-5 px-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <p className="font-bold text-[18px] text-white">
          🎯 Are you a supplier or merchant?
          <br /> Join us today and start growing your business globally!
        </p>
        <button
          type="button"
          className="bg-white hover:bg-gray-300 py-2 px-4 rounded-xl w-1/4 cursor-pointer"
        >
          Contact us{" "}
        </button>
      </div>
    </div>
  );
}
