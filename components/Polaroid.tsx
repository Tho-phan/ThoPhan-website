import Image from "next/image";

type Props = { src: string; alt: string; caption: string; tilt?: number; priority?: boolean; className?: string };

export default function Polaroid({ src, alt, caption, tilt = 0, priority, className = "" }: Props) {
  return (
    <figure
      className={`bg-white p-3 pb-4 shadow-[0_14px_30px_-12px_rgba(43,33,25,0.45)] ${className}`}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <Image src={src} alt={alt} width={1600} height={1000} sizes="(min-width: 768px) 360px, 80vw" priority={priority} className="aspect-[4/3] w-full object-cover" />
      <figcaption className="mt-3 font-[family-name:var(--font-display)] text-sm">{caption}</figcaption>
    </figure>
  );
}
