import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styles from '../../style'
import TvGeneralCard from '../Cards/TvGeneralCard'
import { Oval } from 'react-loader-spinner'

const General = (props) => {
  const apiKey = process.env.REACT_APP_API_KEY
  const [tvDetail, setTvDetail] = useState([])
  const [initialLoading, setInitialLoading] = useState(true)

  const upload = async () => {
    setInitialLoading(true)
    await axios
      .get(
        `https://api.themoviedb.org/3/tv/${props.id}/season/1?api_key=${apiKey}&language=en-US`
      )
      .then((res) => {
        if (res.data) {
          setTvDetail(res.data.episodes)
          setInitialLoading(false)
        }
      })
      .catch((e) => {
        console.log(e.message)
      })
  }

  useEffect(() => {
    upload()
  }, [])

  return (
    <div className={`${styles.boxWidth} my-8`}>
      <div className='flex justify-between items-center px-4'>
        <h2 className={`${styles.heading3}`}>Episodes</h2>
      </div>
      <Splide
        options={{
          type: 'loop',
          perPage: '6',
          pagination: false,
          breakpoints: {
            400: {
              perPage: 2,
            },
            764: {
              perPage: 3,
            },
            1024: {
              perPage: 4,
            },
            1280: {
              perPage: 5,
            },
            1400: {
              perPage: 6,
            },
          },
        }}
        aria-label='My Favorite Images'
        className='justify-center'
      >
        {!initialLoading ? (
          tvDetail.map((tv) => {
            return (
              <SplideSlide>
                <TvGeneralCard detail={tv} key={tv.id} />
              </SplideSlide>
            )
          })
        ) : (
          <div className='flex justify-center my-8'>
            <Oval
              height='50'
              width='50'
              color='grey'
              secondaryColor='grey'
              ariaLabel='loading'
            />
          </div>
        )}
      </Splide>
    </div>
  )
}

export default General
