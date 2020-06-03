export default{

    authUser (state) {            
        return state.item || null
      },
      isAuthenticated (state) {
        return !!state.user
      },
      isMeetupOwner: (state) => (meetupCreatorId) => {
        if (!state.user) return false
        return state.user._id === meetupCreatorId
      },
      isMember: (state) => (meetupId) => {
        return state.user &&
               state.user['joinedMeetups'] &&
               state.user['joinedMeetups'].includes(meetupId)
      }

}