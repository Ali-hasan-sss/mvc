export default function SearchSupliers() {
  return (
    <div className="flex flex-col gap-3 min-w-[300px] max-w-[400px] w-1/3">
      <div className="title flex flex-col">
        <h2
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-Timmana)" }}
        >
          Find Suppliers
        </h2>
        <p className="text-sm text-gray-700">
          Use the advanced search system to find the right supplier quickly and
          efficiently.
        </p>
      </div>
      <div className="form-group flex flex-col">
        <label className="text-sm text-[rgba(0,109,119,1)]">Country</label>
        <input
          type="text"
          className="p-1 w-full rounded-lg border-[2px] outline-none border-[rgba(0,109,119,1)]"
        />
      </div>
      <div className="form-group flex flex-col">
        <label className="text-sm text-[rgba(0,109,119,1)]">
          Industrial Sector
        </label>
        <input
          type="text"
          className="p-1 w-full rounded-lg border-[2px] outline-none border-[rgba(0,109,119,1)]"
        />
      </div>
      <div className="form-group flex flex-col">
        <label className="text-sm text-[rgba(0,109,119,1)]">
          Product Type{" "}
        </label>
        <input
          type="text"
          className="p-1 w-full rounded-lg border-[2px] outline-none border-[rgba(0,109,119,1)]"
        />
      </div>
      <div className="form-group flex items-center mt-5 justify-center w-full">
        <button
          type="submit"
          className="py-1 px-3 search_btn w-full rounded-full cursor-pointer text-white font-bold"
        >
          Search Now
        </button>
      </div>
    </div>
  );
}
