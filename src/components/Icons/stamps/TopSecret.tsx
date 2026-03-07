import Image from "next/image";

type TopSecretProps = {
    className?: string;
};

export default function TopSecret({ className }: TopSecretProps) {
    return (
        <Image
            src="/svg/Top Secret.svg"
            alt="Top Secret Stamp"
            width={100}
            height={24}
            className={className}
        />
    );
}
