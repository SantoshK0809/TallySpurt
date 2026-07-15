import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "../../data/landingData";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-[#FAF9F7] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E97D1A]">
            FAQ
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            Questions before getting started?
          </h2>

          <p className="mt-4 max-w-md leading-7 text-zinc-600">
            Here are answers to some of the most common questions about access,
            onboarding and everyday use.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-6"
                >
                  <span className="font-semibold text-zinc-900">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`size-5 shrink-0 text-zinc-400 transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6">
                    <p className="max-w-2xl text-sm leading-6 text-zinc-500">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}