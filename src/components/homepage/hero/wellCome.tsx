export default function WellCome() {
  return (
    <div className="w-full flex flex-col gap-1 items-center px-2  py-10 md:px-[60px] justify-center">
      <h2
        className=" font-normal text-3xl tracking-wider "
        style={{ fontFamily: "var(--font-Timmana)" }}
      >
        Welcome to <span className="primary-color">MVC</span>{" "}
      </h2>
      <p className="text-center text-lg leading-relaxed">
        the leading platform that brings together suppliers and merchants from
        around the world in one place. Whether you re looking for reliable
        suppliers, new business opportunities, or want to expand your business
        globally, we provide you with the tools you need to connect, negotiate,
        and close deals easily and securely.
      </p>
    </div>
  );
}
