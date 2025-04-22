export default function WeOffer() {
  return (
    <div className="flex flex-col gap-4 items-center px-2 md:px-[170px] py-[30px] md:py-[75px] ">
      <h2
        className="font-bold text-3xl"
        style={{ fontFamily: "var(--font-Timmana)" }}
      >
        What We Offer?
      </h2>
      <ul
        style={{ listStyle: "disc", lineHeight: "40px" }}
        className="font-[500]"
      >
        <li className="">
          Global Database: We facilitate access to suppliers and merchants
          across various sectors and industries.
        </li>
        <li className="">
          Smart Deal Management: We provide advanced tools for tracking deals,
          submitting offers, and negotiating directly between parties.
        </li>
        <li className="">
          Professional Support: We provide dedicated support to users to ensure
          a smooth and efficient trading experience.
        </li>
        <li className="">
          Security and Reliability: We ensure a secure environment for
          commercial transactions through an advanced verification system and
          reliable payment options.
        </li>
      </ul>
    </div>
  );
}
