import React from 'react'
import dayjs from 'dayjs'

export default function QuickReplies(props) {
  const slots = props?.payload?.slots || props?.state?.suggestions || []
  const actions = props.actions || props.actionProvider

  if (!slots.length) return null

  const onPick = (iso) => {
    if (actions?.chooseSlot) actions.chooseSlot(iso)
  }

  return (
    <div className="quick-replies">
      {slots.slice(0, 6).map((iso) => (
        <button key={iso} onClick={() => onPick(iso)}>
          {dayjs(iso).format('ddd HH:mm')}
        </button>
      ))}
    </div>
  )
}