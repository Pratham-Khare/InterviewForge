import React from "react"

const PlanCard = ({ planKey, plan, onBuy }) => {

    const features = {
        STARTER: [
            "10 AI Interview Reports",
            "Basic skill gap analysis",
            "Technical interview questions",
            "Preparation roadmap"
        ],
        PRO: [
            "30 AI Interview Reports",
            "Advanced skill gap analysis",
            "Technical + Behavioral questions",
            "Smart preparation roadmap",
            "Priority AI processing"
        ],
        ULTIMATE: [
            "100 AI Interview Reports",
            "Deep skill gap analysis",
            "Technical + Behavioral questions",
            "Personalized preparation roadmap",
            "Priority AI processing",
            "Unlimited resume generation"
        ]
    }

    return (
        <div className={`plan-card ${planKey === "PRO" ? "plan-popular" : ""}`}>

            {planKey === "PRO" && (
                <div className="plan-badge">
                    Most Popular
                </div>
            )}

            <h2 className="plan-title">{plan.name}</h2>

            <div className="plan-price">₹{plan.price}</div>

            <div className="plan-tokens">{plan.tokens} Tokens</div>

            <ul className="plan-features">

                {features[planKey].map((feature, i) => (
                    <li key={i}>
                        <span className="check">✓</span>
                        {feature}
                    </li>
                ))}

            </ul>

            <button
                className="plan-buy-btn"
                onClick={() => onBuy(planKey)}
            >
                Buy Plan
            </button>

        </div>
    )
}

export default PlanCard