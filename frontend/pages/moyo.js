import Link from 'next/link';

const Moyo = () => {
    return (
        <div>
            <p>This is moyo page and can be view by going to /moyo</p>
            <Link href="/">Home</Link>
        </div>
    );
};

export default Moyo;