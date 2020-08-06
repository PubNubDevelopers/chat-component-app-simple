import React from 'react'
import {ActiveUserWrapper, ActiveUserAvatarWrapper, ActiveUserNameWrapper} from './ActiveUser.styles'
import {useAppState} from '../../AppStateContext'

interface ActiveUserProps {
  activeUser: string
}

export const ActiveUser: React.SFC<ActiveUserProps> = (props: ActiveUserProps) => {
  	const { state } = useAppState();
	let ActiveAvatarURL = "https://ui-avatars.com/api/?name="+props.activeUser+"?size=100&rounded=true&uppercase=true&bold=true&background=5EB977&color=FFF";
   	let ActiveUserDisplay = props.activeUser; // Append " (You)" to the name displayed in the list to help a user identify themself while demoing.
   	if (ActiveUserDisplay == state.selfName) {
   		ActiveUserDisplay = ActiveUserDisplay + " (You)";
   		ActiveAvatarURL = "https://ui-avatars.com/api/?name="+props.activeUser+"?size=100&rounded=true&uppercase=true&bold=true&background=edab63&color=FFF";
   	}
	
  	return (
		<ActiveUserWrapper>
			<ActiveUserAvatarWrapper src={ActiveAvatarURL} />
			<ActiveUserNameWrapper>{ActiveUserDisplay}</ActiveUserNameWrapper>
		</ActiveUserWrapper>
	)
    
}
