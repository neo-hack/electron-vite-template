import React from 'react'
import { useSpring, animated } from '@react-spring/web'
import styled from 'styled-components'

const Stats = styled(animated.div)`
  @apply h-full w-full flex justify-center items-center text-white text-4xl font-bold;
`

const StatsPage = () => {
  const styles = useSpring({
    from: {
      count: 0
    },
    to: {
      count: 99
    }
  })
  return <Stats>{styles.count}</Stats>
}

export default StatsPage
