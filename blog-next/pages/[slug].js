import Link from 'next/link';

export default function Posts({ post }) {
    return (
        <div>
            <h2>{ post.Title }</h2>
            <Link href={'/'}>Back to Home</Link>
        </div>
    );
}

// tell next.js how many pages there are
export async function getStaticPaths() {
    const response = await fetch('http://localhost:1337/posts');
    const posts = await response.json();
    const paths = posts?.map(post => ({ params: { slug: post.Slug } }));
    
    console.log(paths); // static paths to be created
    
    return { paths, fallback: false } // fallback: true -> used for Incremental Static Regeneration (ISR)
}

// for each individual page: get the data for that page
export async function getStaticProps({ params }) {
    const { slug } = params;
    
    const response = await fetch(`http://localhost:1337/posts?Slug=${slug}`);
    const data = await response.json();
    const post = data[0];
    
    return {
        props: { post }
    }
}