import React from 'react'

import { Skeleton } from '@chakra-ui/react'

export const CategoriesSkeleton = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {
        Array.from({ length: 6 })
          .map(() => Math.floor(Math.random() * (120 - 50 + 1)) + 50)
          .map((width: number, index) => (
            <Skeleton
              key={index}
              width={width + 'px'}
              height="20px"
              className="mb-3 mr-6 last:mr-0"
            />
          ))
      }
    </div>
  )
}
