import React from 'react'

//menambahkan css
import styles from "../styles/Home.module.css"

//menambahkan head
import Head from 'next/head'

//menambahkan images
import Image from 'next/image'

// menambahkan router
import { useRouter } from 'next/router'

// menambahkan link
import Link from 'next/link'

//merupakan component yang bernama Home dengan menangkap properti data dan page
export default function Home({ data, page }) {

  // membuat state router
  const router = useRouter()

  // membuat function untuk pagination
  const nextPage = () => {
    router.push(`/?page=${page + 1}`)
  }

  const prevPage = () => {
    if (page == 1) {
      return
    }
    router.push(`/?page=${page - 1}`)
  }

  return (
    <main className={styles.main}>

      <Head>
        <title>Halaman Home</title>
        <meta name='deskripsi' content='ini merupakan halaman home' />
      </Head>

      <h1>Halaman My Home {page}</h1>

      <div className={styles.cardWrapper}>

        {/* menampilkan di browser */}
        {data.map((e) => (
          <div key={e.id} className={styles.blogCard}>

            <Image src={`https://picsum.photos/seed/${e.id}/200/200`} width={200} height={200} alt={e.title} />

            {/* <img src={`https://picsum.photos/seed/${e.id}/300/300`} alt={e.title} /> */}

            <div>

              <h1>{e.id} - {e.title}</h1>
              <p>{e.body}</p>
              <Link href={`/detail/${e.id}`}>Detail</Link>

            </div>

          </div>
        ))
        }
        {/* akhir dari menampilkan di browser */}

        <div className={styles.btnPagination}>
          <button onClick={prevPage}>Prev</button>
          <button onClick={nextPage}>Next</button>
        </div>

      </div >
    </main >
  )
}

export async function getServerSideProps(ctx) {

  // menampilkan output ctx di server
  // console.info(ctx)

  // membuat variabel result untuk mengambil api, ?_limit=5& digunakan untuk menampilkan maksimal 5, page= + ctx.query.page digunakan untuk pindah halaman
  const result = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5&_page=" + ctx.query.page)

  // mengambil json dari variabel result
  const data = await result.json()

  // mereturn sebuah object
  return {
    //properti
    props: {
      // mengambil variabel data
      data: data,

      // mengambil query json dengan default nya 1
      // page: ctx.query.page || 1
      page: parseInt(ctx.query.page) || 1
    }
  }

}
