import React, { useState, useEffect } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'
import { useAuth } from "../../auth/hooks/useAuth"
import UserNavbar from "../../auth/components/UserNavbar"

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>) },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className={`question-card ${open ? 'question-card--open' : ''}`}>
            <div className='question-card__header' onClick={() => setOpen(o => !o)}>
                <div className='question-card__top'>
                    <span className='question-number'>0{index + 1}</span>
                    <h3 className='question-text'>{item.question}</h3>
                </div>
                <button className='expand-button'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>
            </div>
            {open && (
                <div className='question-card__body'>
                    <div className='answer-section'>
                        <div className='answer-quote'>
                            <svg className='quote-icon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                            </svg>
                            <p className='answer-text'>{item.answer}</p>
                        </div>
                        <div className='answer-label'>
                            <span className='label-badge'>STRONG ANSWER</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='roadmap-card'>
        <div className='roadmap-card__header'>
            <div className='roadmap-card__icon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
            </div>
            <div className='roadmap-card__title'>
                <span className='roadmap-day-label'>Day {day.day}</span>
                <h3 className='roadmap-focus'>{day.focus}</h3>
            </div>
        </div>
        <ul className='roadmap-card__tasks'>
            {day.tasks.map((task, i) => (
                <li key={i} className='roadmap-task'>
                    <span className='task-bullet'></span>
                    <span className='task-text'>{task}</span>
                </li>
            ))}
        </ul>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { report, getReportById, loading, getResumePdf, shareInterviewReport } = useInterview()    
    const { interviewId } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()


    const handleShare = async () => {
        try {

            const pdfUrl = await getResumePdf(interviewId)

            if (navigator.share) {

                await navigator.share({
                    title: "My AI Interview Report",
                    text: "Check out my AI-generated interview preparation report.",
                    url: pdfUrl
                })

            } else {

                await navigator.clipboard.writeText(pdfUrl)
                alert("Report link copied to clipboard!")

            }

        } catch (error) {
            console.error("Share failed:", error)
        }
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [interviewId])

    if (loading || !report) {
        return (
            <main className='interview-loading'>
                <div className='loading-spinner'></div>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    const scoreColor =
        report.matchScore >= 80 ? 'score--high' :
            report.matchScore >= 60 ? 'score--mid' : 'score--low'

    return (
        <div className='interview-page'>
            <UserNavbar />
            {/* Top Header */}
            <header className='interview-header'>
                <div className='interview-header__left'>
                    <button className='back-button' onClick={() => navigate('/')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                    </button>
                    <div className='interview-title-group'>
                        <h1 className='interview-title'>Technical Assessment</h1>
                        <div className='interview-meta'>
                            <div className='candidate-badge'>
                                <div className='candidate-avatar'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </div>
                                <span className='candidate-name'>{user?.username || "Candidate"}</span>
                                <span className='candidate-role'>{user?.email || "Logged in user"}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='interview-header__right'>
                <button className="share-button" onClick={() => shareInterviewReport(interviewId)} title="Share this report">                        
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                        </svg>
                    </button>
                </div>
            </header>

            <div className='interview-container'>
                {/* Left Sidebar */}
                <aside className='interview-sidebar interview-sidebar--left'>
                    <div className='sidebar-section'>
                        <h3 className='sidebar-heading'>INTERVIEW PLAN</h3>
                        <nav className='sidebar-nav'>
                            {NAV_ITEMS.map(item => (
                                <button
                                    key={item.id}
                                    className={`nav-item ${activeNav === item.id ? 'nav-item--active' : ''}`}
                                    onClick={() => setActiveNav(item.id)}
                                >
                                    <span className='nav-item__icon'>{item.icon}</span>
                                    <span className='nav-item__label'>{item.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className='sidebar-divider'></div>

                    <button
                        onClick={() => { getResumePdf(interviewId) }}
                        className='download-button'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download Resume
                    </button>
                </aside>

                {/* Main Content */}
                <main className='interview-main'>
                    {activeNav === 'technical' && (
                        <div className='content-section'>
                            <div className='section-header'>
                                <div className='section-header__left'>
                                    <h2 className='section-title'>Core Engineering Concepts</h2>
                                    <p className='section-description'>Deep dive into the candidate's understanding of system architecture and frontend state management.</p>
                                </div>
                            </div>
                            <div className='questions-list'>
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </div>
                    )}

                    {activeNav === 'behavioral' && (
                        <div className='content-section'>
                            <div className='section-header'>
                                <div className='section-header__left'>
                                    <h2 className='section-title'>Behavioral Questions</h2>
                                    <p className='section-description'>Assess communication skills, teamwork, and problem-solving approach.</p>
                                </div>
                            </div>
                            <div className='questions-list'>
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </div>
                    )}

                    {activeNav === 'roadmap' && (
                        <div className='content-section'>
                            <div className='section-header'>
                                <div className='section-header__left'>
                                    <h2 className='section-title'>Preparation Road Map</h2>
                                    <p className='section-description'>{report.preparationPlan.length}-day strategic preparation plan.</p>
                                </div>
                            </div>
                            <div className='roadmap-list'>
                                {report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </div>
                    )}
                </main>

                {/* Right Sidebar */}
                <aside className='interview-sidebar interview-sidebar--right'>
                    <div className='sidebar-section'>
                        <h3 className='sidebar-heading'>OVERALL MATCH</h3>

                        {/* Match Score Circle */}
                        <div className='match-circle'>
                            <svg className='match-circle__svg' viewBox="0 0 120 120">
                                <circle
                                    className='match-circle__bg'
                                    cx="60"
                                    cy="60"
                                    r="54"
                                    fill="none"
                                    strokeWidth="8"
                                />
                                <circle
                                    className={`match-circle__progress ${scoreColor}`}
                                    cx="60"
                                    cy="60"
                                    r="54"
                                    fill="none"
                                    strokeWidth="8"
                                    strokeDasharray={`${(report.matchScore / 100) * 339.292} 339.292`}
                                    transform="rotate(-90 60 60)"
                                />
                            </svg>
                            <div className='match-circle__content'>
                                <span className='match-score-value'>{report.matchScore}</span>
                                <span className='match-score-unit'>%</span>
                            </div>
                        </div>

                        <div className='match-trend'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                <polyline points="17 6 23 6 23 12" />
                            </svg>
                            <span className='match-trend__text'>+5.2%</span>
                        </div>
                    </div>

                    <div className='sidebar-divider'></div>

                    {/* Skill Proficiency */}
                    <div className='sidebar-section'>
                        <h3 className='sidebar-heading'>Skill Proficiency</h3>
                        <div className='skill-badges'>
                            <span className='skill-badge skill-badge--high'>System Design</span>
                            <span className='skill-badge skill-badge--high'>React.js</span>
                            <span className='skill-badge skill-badge--high'>Node.js</span>
                            <span className='skill-badge skill-badge--mid'>Cloud Arch</span>
                            <span className='skill-badge skill-badge--mid'>GraphQL</span>
                        </div>
                    </div>

                    <div className='sidebar-divider'></div>

                    {/* Skill Gap Analysis */}
                    <div className='sidebar-section'>
                        <h3 className='sidebar-heading'>Skill Gap Analysis</h3>
                        <div className='gap-list'>
                            {report.skillGaps.map((gap, i) => (
                                <div key={i} className='gap-item'>
                                    <span className='gap-skill'>{gap.skill}</span>
                                    <span className={`gap-priority gap-priority--${gap.severity}`}>
                                        {gap.severity === 'high' ? 'Priority' : gap.severity === 'medium' ? 'Optional' : 'Low'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='sidebar-divider'></div>

                    {/* Next Steps */}
                    <div className='sidebar-section'>
                        <h3 className='sidebar-heading'>NEXT STEPS</h3>
                        <div className='next-steps'>
                            <p className='next-steps-text'>
                                Candidate has strong fundamentals. Suggest a final architecture round focused on database sharding and scalability.
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Interview