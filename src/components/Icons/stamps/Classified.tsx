import Image from "next/image";

type ClassifiedProps = {
    className?: string;
};

export default function Classified({ className }: ClassifiedProps) {
    return (
        <Image
            src="/svg/Classified.svg"
            alt="Classified Stamp"
            width={100}
            height={24}
            className={className}
        />
    );
}
