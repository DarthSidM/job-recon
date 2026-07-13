import { getResumeById } from "../../repos/resume.repo.js";
import redis from "../../lib/redis.js";

export async function getResumeStatusController(req, res) {
	const { id: userId } = req.user;
	const resumeId = Number(req.params.resumeId);

	if (!resumeId) {
		return res.status(400).json({
			status: "failed",
			message: "valid resumeId is required",
		});
	}

	try {
		const resume = await getResumeById(resumeId, userId);

		if (!resume) {
			return res.status(404).json({
				status: "failed",
				message: "resume not found",
			});
		}

		const statusKey = `resume:status:${resumeId}`;
		const statusValue = await redis.get(statusKey);

		if (!statusValue) {
			return res.status(404).json({
				status: "failed",
				message: "resume status not found",
			});
		}

		return res.status(200).json({
			status: "success",
			resumeId,
			resumeStatus: JSON.parse(statusValue),
		});
	} catch (error) {
		console.error("error occurred while fetching resume status", error);
		return res.status(500).json({
			status: "failed",
			message: "failure",
		});
	}
}
