'use client';

import { usePathname } from 'next/navigation';

export default function WhatsAppFloat() {
  const pathname = usePathname() || '';

  // Do not show floating WhatsApp button inside the Admin Panel
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const isKarachiEnclave = pathname.includes('karachi-enclave');
  const text = encodeURIComponent(
    isKarachiEnclave
      ? 'Hello Propkads, I would like to get details about Karachi Enclave.'
      : 'Hello Propkads, I would like to discuss a real estate project.'
  );
  const whatsappUrl = `https://wa.me/923333401101?text=${text}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float-wrap"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="wa-float-tooltip">Chat with us</span>
      <span className="wa-float-btn">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.359 4.984L2 22l5.188-1.359c1.453.797 3.109 1.219 4.843 1.219 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.828 14.125c-.25.703-1.453 1.344-2 1.422-.516.078-1.172.109-1.906-.125-.453-.141-1.031-.328-1.766-.641-3.094-1.344-5.109-4.469-5.266-4.672-.156-.203-1.266-1.688-1.266-3.219s.797-2.281 1.078-2.594c.281-.312.609-.391.812-.391.203 0 .406.016.578.016.188 0 .438-.078.688.516.25.609.859 2.094.938 2.25.078.156.125.344.031.547-.094.203-.141.328-.297.5-.156.172-.312.391-.453.516-.141.141-.297.297-.125.594.172.297.766 1.266 1.641 2.047 1.125 1 2.078 1.312 2.375 1.453.297.141.469.125.641-.078.172-.203.734-.859.938-1.156.203-.297.406-.25.672-.156.266.094 1.703.812 1.984.953.281.141.469.219.547.344.078.125.078.719-.172 1.422z" />
        </svg>
      </span>
    </a>
  );
}
