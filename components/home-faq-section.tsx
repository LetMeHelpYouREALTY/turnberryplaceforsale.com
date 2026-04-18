import React, { useState } from 'react'
import { TURNBERRY_FAQ_ITEMS } from 'lib/schema/faqPage'

/**
 * Visible FAQ — copy must stay aligned with FAQPage JSON-LD (TURNBERRY_FAQ_ITEMS).
 */
export function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="card-content py-5" id="turnberry-faq" aria-labelledby="faq-heading">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <h2 id="faq-heading" className="text-center mb-4">
              Turnberry Place — Frequently Asked Questions
            </h2>
            <div className="list-group list-group-flush border rounded overflow-hidden shadow-sm">
              {TURNBERRY_FAQ_ITEMS.map((item, index) => {
                const isOpen = openIndex === index
                const panelId = `faq-panel-${index}`
                const headingId = `faq-q-${index}`
                return (
                  <div key={item.question} className="list-group-item p-0 border-0 border-bottom">
                    <h3 className="h6 mb-0">
                      <button
                        type="button"
                        id={headingId}
                        className="faq-toggle d-flex w-100 align-items-center justify-content-between text-left px-4 py-3 btn btn-link text-decoration-none"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                      >
                        <span>{item.question}</span>
                        <span className="faq-toggle-icon ml-2 small" aria-hidden>
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={headingId}
                      hidden={!isOpen}
                      className="faq-panel px-4 pb-4"
                    >
                      <p className="faq-answer mb-0">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
