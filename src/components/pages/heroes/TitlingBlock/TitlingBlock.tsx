import Link from "next/link";
import Image from "next/image";
import "./styles.css";
import {Title} from "@/components/ui/Title/Title";

export const TitlingBlock = () => {

    return (
        <div className="title-block">
            <Link href="/" className='title-block__link'>
                <Image src="/arrow-left.png" alt='arrow-left' width={16} height={16}/>
                <span>Back to Home</span>
            </Link>
            <Title>Heroes List</Title>
        </div>
    )
}