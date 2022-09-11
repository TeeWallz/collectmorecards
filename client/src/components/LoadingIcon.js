
export function LoadingIcon() {
    return (
        <svg
            style={{
                margin: "auto",
                background: "#fff",
                display: "block",
            }}
            width={200}
            height={200}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
        >
            <circle cx={50} cy={50} r={0} fill="none" stroke="#e90c59" strokeWidth={17}>
                <animate
                    attributeName="r"
                    repeatCount="indefinite"
                    dur="1.8518518518518516s"
                    values="0;23"
                    keyTimes="0;1"
                    keySplines="0 0.2 0.8 1"
                    calcMode="spline"
                    begin="0s"
                />
                <animate
                    attributeName="opacity"
                    repeatCount="indefinite"
                    dur="1.8518518518518516s"
                    values="1;0"
                    keyTimes="0;1"
                    keySplines="0.2 0 0.8 1"
                    calcMode="spline"
                    begin="0s"
                />
            </circle>
            <circle cx={50} cy={50} r={0} fill="none" stroke="#46dff0" strokeWidth={17}>
                <animate
                    attributeName="r"
                    repeatCount="indefinite"
                    dur="1.8518518518518516s"
                    values="0;23"
                    keyTimes="0;1"
                    keySplines="0 0.2 0.8 1"
                    calcMode="spline"
                    begin="-0.9259259259259258s"
                />
                <animate
                    attributeName="opacity"
                    repeatCount="indefinite"
                    dur="1.8518518518518516s"
                    values="1;0"
                    keyTimes="0;1"
                    keySplines="0.2 0 0.8 1"
                    calcMode="spline"
                    begin="-0.9259259259259258s"
                />
            </circle>
        </svg>
    )
}