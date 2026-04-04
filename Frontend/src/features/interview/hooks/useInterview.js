import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "../services/interview.api"
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router"


export const useInterview = () => {

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        let response = null
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            setReport(response.interviewReport)
        } catch (error) {
            if (error?.response?.data?.message === "NO_TOKENS") {
                throw new Error("NO_TOKENS")
            }
            console.log(error)
        } finally {
            setLoading(false)
        }

        return response.interviewReport
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        let response = null
        try {
            response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return response.interviewReport
    }

    const getReports = async () => {
        setLoading(true)
        let response = null
        try {
            response = await getAllInterviewReports()
            setReports(response.interviewReports)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

        return response.interviewReports
    }

    const getResumePdf = async (interviewReportId) => {

    setLoading(true)

    try {

        const pdfBlob = await generateResumePdf({ interviewReportId })

        const url = window.URL.createObjectURL(pdfBlob)

        const link = document.createElement("a")

        link.href = url
        link.download = `resume_${interviewReportId}.pdf`

        document.body.appendChild(link)
        link.click()

        link.remove()

    } catch (error) {

        console.error("PDF download failed:", error)

    } finally {

        setLoading(false)

    }
    }

    const shareInterviewReport = async (interviewReportId) => {

    try {

        const pdfBlob = await generateResumePdf({ interviewReportId })

        const file = new File(
            [pdfBlob],
            `interview_report_${interviewReportId}.pdf`,
            { type: "application/pdf" }
        )

        // If browser supports sharing files
        if (navigator.canShare && navigator.canShare({ files: [file] })) {

            navigator.share({
                title: "AI Interview Report",
                text: "Check out my AI-generated interview preparation report.",
                files: [file]
            })

        } else {

            // fallback for desktop
            const url = window.URL.createObjectURL(pdfBlob)

            const link = document.createElement("a")
            link.href = url
            link.download = `interview_report_${interviewReportId}.pdf`
            link.click()

        }

    } catch (error) {

        console.error("Share failed:", error)

    }
}

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [ interviewId ])

return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
    getResumePdf,
    shareInterviewReport
}
}