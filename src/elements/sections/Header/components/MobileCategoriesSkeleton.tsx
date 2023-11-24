import React from 'react'

import { Skeleton } from '@chakra-ui/react'

export const MobileCategoriesSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      {
        Array.from({ length: 6 })
          .map(() => Math.floor(Math.random() * (120 - 50 + 1)) + 50)
          .map((width: number, index) => (
            <Skeleton
              key={index}
              width={width + 'px'}
              height="20px"
              className="mb-2"
            />
          ))
      }
    </div>
  )
}
