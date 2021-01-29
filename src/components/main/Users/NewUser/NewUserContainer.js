import NewUser from './newUser.tsx';
import {connect} from 'react-redux';
import {followTC as follow, unfollowTC as unfollow} from '../../../../redusers/users_reducer';
import {clearProfilePartially_ac as clearProfilePartially} from '../../../../redusers/post_reducer';

let state_mtp = function (state, props) {
	return {
		key: props.key,
		name: props.name,
		description: props.description,
		location: props.location,
		followed: props.followed,
		id: props.id,
		users_hidden: state.users.users_hidden,
		user_image: props.user_image,
		followLoading: state.users.followLoading,
		loadingButton: state.users.loadingButton,
		followError: props.followError
	}
}


const NewUserContainer = connect(state_mtp, {follow, unfollow, clearProfilePartially})(NewUser);
export default NewUserContainer