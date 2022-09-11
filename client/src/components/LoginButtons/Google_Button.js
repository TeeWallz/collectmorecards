import './Firebase-UI.css';


export function Google_Button(props) {
    return (
        <button className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button snipcss-nvchO" data-provider-id="google.com" style={{backgroundColor:'#ffffff'}} data-upgraded=",MaterialButton">
            <span className="firebaseui-idp-icon-wrapper">
                <img className="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" />
            </span>
            <span className="firebaseui-idp-text firebaseui-idp-text-dark firebaseui-idp-text-long">
                {props.text} Google
            </span>
            <span className="firebaseui-idp-text firebaseui-idp-text-short">
                Google
            </span>
        </button>
    )
}