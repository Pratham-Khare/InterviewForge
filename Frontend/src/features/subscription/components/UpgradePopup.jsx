import React from "react"
import { useNavigate } from "react-router"

const UpgradePopup = ({ open, onClose }) => {

    const navigate = useNavigate()

    if (!open) return null

    return (

        <div className="upgrade-popup-overlay">

            <div className="upgrade-popup">

                <h2>No Tokens Left</h2>

                <p>
                    You have used all your tokens.
                    Upgrade your plan to continue generating interview plans.
                </p>

                <div className="upgrade-popup-buttons">

                    <button
                        className="btn btn-outline"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/subscription")}
                    >
                        Upgrade Plan
                    </button>

                </div>

            </div>

        </div>

    )
}

export default UpgradePopup