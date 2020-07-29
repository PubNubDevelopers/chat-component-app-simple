import React from 'react'
import {useAppState} from '../../AppStateContext'
import {ActiveUsersList} from '../ActiveUsersList/ActiveUsersList'
import {ActiveUsersListPanelWrapper} from './ActiveUsersListPanel.styles'

interface ActiveUsersListPanelProps {}

export const ActiveUsersListPanel: React.SFC<ActiveUsersListPanelProps> = (props: ActiveUsersListPanelProps) => {
  const {state} = useAppState()
  return (
    <div>
      <ActiveUsersList />
    </div>
  )
}
