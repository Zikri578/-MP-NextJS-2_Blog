import React from 'react'

// menambahkan css
import styles from "../../styles/Home.module.css"

// menambahkan image
import Image from 'next/image'

// menambahkan router
import { useRouter } from 'next/router'

//merupakan component yang bernama Home dengan menangkap properti data
export default function Detail({ data }) {

    // membuat state router
    const router = useRouter()


    return (
        <main className={styles.main}>
            <h1>Halaman Detail</h1>

            {/* menampilkan halaman detail post */}
            <h3>{data.title}</h3>
            <Image src={`https://picsum.photos/seed/${data.id}/600/600`} width={600} height={600} alt={data.title}></Image>
            <p>{data.body}</p>

            <button onClick={() => {
                router.back()
            }}>Back
            </button>
        </main >
    )
}

export async function getServerSideProps(context) {

    const result = await fetch("https://jsonplaceholder.typicode.com/posts/" + context.params.id)
    const data = await result.json()
    return {
        props: {
            data: data
        }
    }
}
