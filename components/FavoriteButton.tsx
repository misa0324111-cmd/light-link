'use client'

import { useEffect, useState } from 'react'
import { isFavorite, toggleFavorite } from '@/lib/preferences'

export function FavoriteButton({ talentId }: { talentId: string }) {
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    setFavorite(isFavorite(talentId))
  }, [talentId])

  return (
    <button
      className="btn btn2"
      onClick={() => setFavorite(toggleFavorite(talentId))}
    >
      {favorite ? 'お気に入り済み' : 'お気に入りに追加'}
    </button>
  )
}
