import { Button } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    id: string
}

export default function EditButton({id}: Props) {
  return (
    <Button>
        <Link href={`/auctions/update/${id}`}>Edit auction</Link>
    </Button>
  )
}
