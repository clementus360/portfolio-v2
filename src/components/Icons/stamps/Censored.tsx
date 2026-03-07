import Image from "next/image";

type CensoredProps = {
    className?: string;
};

export default function Censored({ className }: CensoredProps) {
    return (
        <Image
            src="/svg/Censored.svg"
            alt="Censored Stamp"
            width={100}
            height={24}
            className={className}
        />
    );
}
