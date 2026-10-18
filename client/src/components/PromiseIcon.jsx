const marks=[
<><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 15h8"/><path d="m11 17 2-2"/></>,
<><path d="M9 3h6v4H9zM8 7h8l2 3v10a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V10zM9 12h6v5H9z"/></>,
<><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></>,
<><path d="M8 12C5 2 9 1 11 11M13 11c1-10 5-10 4 1M7 13c-4 5-1 8 5 8s9-4 5-8M9 15h.1M15 15h.1M11 18h2"/></>,
<><path d="M3 5q9 3 18 0M5 8h14M7 8v13M17 8v13M5 13h14M10 8v5M14 8v5"/></>,
<><path d="M20 3C9 2 3 7 5 14c2 7 14 6 15-11Z"/><path d="M4 21 16 8M10 14v-4M10 14h5"/></>,
<><path d="M9 3h6M10 3v5L5 19a1.5 1.5 0 0 0 1.5 2h11a1.5 1.5 0 0 0 1.5-2L14 8V3M3 3l18 18"/></>,
<><path d="M12 3C9 8 5 11 5 15a7 7 0 0 0 14 0c0-4-4-7-7-12ZM4 4l16 16"/></>,
<><path d="m12 3 8 3v6c0 5-8 9-8 9S4 17 4 12V6z"/><path d="m8 12 3 3 5-6"/></>,
<><path d="M12 21v-9M12 15C3 16 2 8 3 5c7 0 10 5 9 10ZM12 12c-1-7 3-10 9-9 0 6-3 10-9 9Z"/></>
];
export default function PromiseIcon({index}){return <svg className="hq-promise-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{marks[index]}</svg>}
