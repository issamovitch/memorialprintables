'use client';

import { useState } from 'react';
import { FAQItem } from '@/lib/funeral-config';

export default function FaqAccordion({ items }: { items: FAQItem[] }) {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <div id="faq">
            {items.map((item, i) => (
                <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
                    <div className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                        {item.q}
                        <span className="arrow">▾</span>
                    </div>
                    <div className="faq-a">{item.a}</div>
                </div>
            ))}
        </div>
    );
}