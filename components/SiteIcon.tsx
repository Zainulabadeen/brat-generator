import type { ReactNode, SVGProps } from 'react';

export type SiteIconName =
  | 'eye' | 'palette' | 'type' | 'crop' | 'download' | 'unlock' | 'smile' | 'image'
  | 'pen' | 'phone' | 'bolt' | 'upload' | 'message' | 'rainbow' | 'layers' | 'sparkles'
  | 'clipboard' | 'folder' | 'disc' | 'music' | 'camera' | 'sliders' | 'headphones'
  | 'repeat' | 'user' | 'desktop' | 'megaphone' | 'lock' | 'puzzle' | 'mail' | 'tools'
  | 'scale' | 'video' | 'globe' | 'menu' | 'close' | 'arrowRight' | 'chevronDown'
  | 'check' | 'book' | 'grid' | 'warning' | 'play' | 'clock' | 'calendar' | 'file'
  | 'link' | 'help' | 'ratio' | 'compare' | 'audio' | 'heart' | 'contrast' | 'layout';

type Props = SVGProps<SVGSVGElement> & { name: SiteIconName; size?: number };

const common = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export default function SiteIcon({ name, size = 24, ...props }: Props) {
  const paths: Record<SiteIconName, ReactNode> = {
    eye: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.6"/></>,
    palette: <><path d="M12 3a9 9 0 1 0 0 18h1.4a2.1 2.1 0 0 0 0-4.2h-1.1a1.7 1.7 0 0 1 0-3.4H16a5 5 0 0 0 5-5C21 5.4 17 3 12 3Z"/><circle cx="7.5" cy="9" r=".8"/><circle cx="10.4" cy="6.7" r=".8"/><circle cx="14.2" cy="6.8" r=".8"/></>,
    type: <><path d="M5 5h14"/><path d="M12 5v14"/><path d="M8.5 19h7"/></>,
    crop: <><path d="M7 3v14a2 2 0 0 0 2 2h12"/><path d="M3 7h14a2 2 0 0 1 2 2v12"/></>,
    download: <><path d="M12 3v11"/><path d="m8 10 4 4 4-4"/><path d="M5 20h14"/></>,
    unlock: <><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 7.5-2"/></>,
    smile: <><circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0"/><path d="M9 9h.01M15 9h.01"/></>,
    image: <><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="9" r="1.5"/><path d="m4.5 18 5-5 3.5 3 2.5-2 4 4"/></>,
    pen: <><path d="m4 20 4.3-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z"/><path d="m13.8 7.5 3 3"/></>,
    phone: <><rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M10.5 5h3M11.5 18.5h1"/></>,
    bolt: <path d="m13 2-8 12h6l-1 8 9-13h-6l0-7Z"/>,
    upload: <><path d="M12 21V10"/><path d="m8 14 4-4 4 4"/><path d="M5 4h14"/></>,
    message: <><path d="M4 5h16v11H9l-5 4V5Z"/><path d="M8 9h8M8 12h5"/></>,
    rainbow: <><path d="M4 17a8 8 0 0 1 16 0"/><path d="M7 17a5 5 0 0 1 10 0"/><path d="M10 17a2 2 0 0 1 4 0"/></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/></>,
    sparkles: <><path d="m12 2 1.2 3.8L17 7l-3.8 1.2L12 12l-1.2-3.8L7 7l3.8-1.2L12 2Z"/><path d="m19 13 .7 2.3L22 16l-2.3.7L19 19l-.7-2.3L16 16l2.3-.7L19 13Z"/><path d="m5 14 .8 2.7L8.5 18l-2.7.8L5 21.5l-.8-2.7L1.5 18l2.7-.8L5 14Z"/></>,
    clipboard: <><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4.5V3h6v1.5M8 9h8M8 13h8M8 17h5"/></>,
    folder: <><path d="M3 6h7l2 2h9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z"/></>,
    disc: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.4"/><path d="M12 3v6"/></>,
    music: <><path d="M9 18V6l10-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/></>,
    camera: <><path d="M4 7h4l1.5-2h5L16 7h4v12H4V7Z"/><circle cx="12" cy="13" r="4"/></>,
    sliders: <><path d="M4 7h10M18 7h2M4 17h4M12 17h8M4 12h6M14 12h6"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/><circle cx="12" cy="12" r="2"/></>,
    headphones: <><path d="M4 14v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="13" width="4" height="7" rx="2"/><rect x="17" y="13" width="4" height="7" rx="2"/></>,
    repeat: <><path d="M17 2l3 3-3 3"/><path d="M4 11V9a4 4 0 0 1 4-4h12"/><path d="m7 22-3-3 3-3"/><path d="M20 13v2a4 4 0 0 1-4 4H4"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    desktop: <><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></>,
    megaphone: <><path d="m3 11 13-5v12L3 13v-2Z"/><path d="M8 15v5h4l-1.5-4"/><path d="M19 9c1 1 1 5 0 6"/></>,
    lock: <><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    puzzle: <><path d="M9 3h4v3a2 2 0 1 0 4 0V3h4v7h-3a2 2 0 1 0 0 4h3v7h-7v-3a2 2 0 1 0-4 0v3H3v-7h3a2 2 0 1 0 0-4H3V3h6Z"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
    tools: <><path d="M14.5 6.5a4 4 0 0 0 4.7 5L12 18.7a2.5 2.5 0 1 1-3.5-3.5l7.2-7.2a4 4 0 0 0-1.2-1.5Z"/><path d="m5 5 4 4"/></>,
    scale: <><path d="M12 3v18M5 6h14M7 6l-4 7h8L7 6ZM17 6l-4 7h8l-4-7ZM8 21h8"/></>,
    video: <><rect x="3" y="5" width="13" height="14" rx="2"/><path d="m16 10 5-3v10l-5-3"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="M6 6l12 12M18 6 6 18"/></>,
    arrowRight: <><path d="M5 12h14"/><path d="m14 7 5 5-5 5"/></>,
    chevronDown: <path d="m6 9 6 6 6-6"/>,
    check: <path d="m5 12 4 4 10-10"/>,
    book: <><path d="M4 4h7a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H4V4Z"/><path d="M20 4h-6v16a3 3 0 0 1 3-3h3V4Z"/></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    warning: <><path d="M12 3 2.8 20h18.4L12 3Z"/><path d="M12 9v5M12 17h.01"/></>,
    play: <><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4V8Z"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></>,
    file: <><path d="M6 2h8l4 4v16H6V2Z"/><path d="M14 2v5h5M9 12h6M9 16h6"/></>,
    link: <><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"/></>,
    help: <><circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.5 2.5 0 1 1 4.2 1.8c-1.2.8-2 1.4-2 3.2M12 17.2h.01"/></>,
    ratio: <><rect x="3" y="5" width="8" height="8" rx="1"/><rect x="14" y="9" width="7" height="10" rx="1"/></>,
    compare: <><path d="M8 4v16M16 4v16"/><path d="m5 7 3-3 3 3M13 17l3 3 3-3"/></>,
    audio: <><path d="M5 10v4h4l5 4V6l-5 4H5Z"/><path d="M17 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/></>,
    heart: <path d="M20.8 4.9a5.4 5.4 0 0 0-7.6 0L12 6.1l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.5a5.4 5.4 0 0 0 0-7.6Z"/>,
    contrast: <><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18V3Z" fill="currentColor" stroke="none"/></>,
    layout: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/></>,
  };

  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false" {...common} {...props}>
      {paths[name]}
    </svg>
  );
}
