import React from 'react'
import { Modal } from 'granen'
import { useSelector } from 'react-redux'

import { RootState } from '../../store'

export const SearchModal = () => {
  const visible = useSelector((state: RootState) => state.search.visible)
  return <Modal visible={visible}>modal</Modal>
}
