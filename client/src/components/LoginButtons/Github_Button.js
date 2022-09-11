import './Firebase-UI.css';


export function Github_Button(props) {
    return (
        <button class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-github firebaseui-id-idp-button snipcss-VxoDM" data-provider-id="github.com" style={{"backgroundColor":"#333333"}} data-upgraded=",MaterialButton">
            <span class="firebaseui-idp-icon-wrapper">
                <img class="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/github.svg"/>
            </span>
            <span class="firebaseui-idp-text firebaseui-idp-text-long">
                {props.text} GitHub
            </span>
            <span class="firebaseui-idp-text firebaseui-idp-text-short">
                GitHub
            </span>
        </button>

    )
}