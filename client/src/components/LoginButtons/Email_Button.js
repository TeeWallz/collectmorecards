import './Firebase-UI.css';


export function Email_Button(props) {
    return (
        <button class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-password firebaseui-id-idp-button snipcss-zog8l" data-provider-id="password" style={{"background-color":"#db4437"}} data-upgraded=",MaterialButton">
            <span class="firebaseui-idp-icon-wrapper">
                <img class="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/mail.svg"/>
            </span>
            <span class="firebaseui-idp-text firebaseui-idp-text-long">
                {props.text} email
            </span>
            <span class="firebaseui-idp-text firebaseui-idp-text-short">
                Email
            </span>
        </button>


    )
}