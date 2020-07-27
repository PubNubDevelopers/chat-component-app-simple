import React from 'react'
import {ActiveUserWrapper, ActiveUserAvatarWrapper, ActiveUserNameWrapper} from './ActiveUser.styles'

interface ActiveUserProps {
  activeUser: string
}

export const ActiveUser: React.SFC<ActiveUserProps> = (props: ActiveUserProps) => {

	const ActiveAvatarURL = "https://ui-avatars.com/api/?name="+props.activeUser+"?size=100&rounded=true&uppercase=true&bold=true&background=fff&color=000"
  
	return (
		<ActiveUserWrapper>
			<ActiveUserAvatarWrapper src={ActiveAvatarURL} />
			<ActiveUserNameWrapper>{props.activeUser}</ActiveUserNameWrapper>
		</ActiveUserWrapper>
	)
}
