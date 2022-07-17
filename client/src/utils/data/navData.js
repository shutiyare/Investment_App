export default function NavData(state){
    return { logo: 'Investment App', userphoto: state.auth.userphoto, username: state.auth.username };
}